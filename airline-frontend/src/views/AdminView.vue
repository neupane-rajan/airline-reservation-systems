<template>
  <div>
    <h1 class="mb-4">Admin Dashboard</h1>
    
    <!-- Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a @click.prevent="activeTab = 'flights'" 
           :class="['nav-link', activeTab === 'flights' ? 'active' : '']" 
           href="#" 
           role="tab">Manage Flights</a>
      </li>
      <li class="nav-item">
        <a @click.prevent="activeTab = 'bookings'" 
           :class="['nav-link', activeTab === 'bookings' ? 'active' : '']" 
           href="#" 
           role="tab">View Bookings</a>
      </li>
    </ul>
    
    <!-- Flights Tab -->
    <div v-if="activeTab === 'flights'">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>All Flights</h2>
        <button @click="showAddFlightModal = true" class="btn btn-primary">Add New Flight</button>
      </div>
      
      <!-- Flight Search -->
      <div class="mb-4">
        <input 
          v-model="flightSearchQuery" 
          type="text" 
          class="form-control" 
          placeholder="Search flights by number, source, or destination"
        >
      </div>
      
      <!-- Flights List -->
      <div class="card mb-4">
        <div class="card-body">
          <div v-if="flightStore.isLoading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Loading flights...</p>
          </div>
          
          <template v-else>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Flight</th>
                    <th>Route</th>
                    <th>Date & Time</th>
                    <th>Seats</th>
                    <th>Price</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="flight in filteredFlights" :key="flight.id">
                    <td>
                      <span class="fw-medium">{{ flight.flight_number }}</span>
                    </td>
                    <td>{{ flight.source }} → {{ flight.destination }}</td>
                    <td>
                      <div>{{ formatDate(flight.departure_date) }}</div>
                      <small class="text-muted">{{ formatTime(flight.departure_time) }} - {{ formatTime(flight.arrival_time) }}</small>
                    </td>
                    <td>{{ flight.available_seats }} / {{ flight.total_seats }}</td>
                    <td>${{ flight.price }}</td>
                    <td class="text-end">
                      <button @click="editFlight(flight)" class="btn btn-sm btn-outline-primary me-2">Edit</button>
                      <button @click="confirmDeleteFlight(flight.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div v-if="filteredFlights.length === 0" class="py-4 text-center text-muted">
              No flights found matching your search criteria.
            </div>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Bookings Tab -->
    <div v-if="activeTab === 'bookings'">
      <h2 class="mb-4">All Bookings</h2>
      
      <!-- Booking Search -->
      <div class="mb-4">
        <input 
          v-model="bookingSearchQuery" 
          type="text" 
          class="form-control" 
          placeholder="Search bookings by username, flight number, or status"
        >
      </div>
      
      <!-- Bookings List -->
      <div class="card">
        <div class="card-body">
          <div v-if="bookingStore.isLoading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Loading bookings...</p>
          </div>
          
          <template v-else>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Passenger</th>
                    <th>Flight</th>
                    <th>Seat</th>
                    <th>Status</th>
                    <th>Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in filteredBookings" :key="booking.id">
                    <td>{{ booking.id }}</td>
                    <td>User ID: {{ booking.user }}</td>
                    <td>
                      <div>{{ booking.flight_details.flight_number }}</div>
                      <small class="text-muted">{{ booking.flight_details.source }} → {{ booking.flight_details.destination }}</small>
                    </td>
                    <td>{{ booking.seat_number }}</td>
                    <td>
                      <span 
                        :class="[
                          'badge',
                          booking.status === 'confirmed' ? 'bg-success' : 'bg-danger'
                        ]"
                      >
                        {{ booking.status }}
                      </span>
                    </td>
                    <td>{{ formatDate(booking.booking_date) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div v-if="filteredBookings.length === 0" class="py-4 text-center text-muted">
              No bookings found matching your search criteria.
            </div>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Add/Edit Flight Modal -->
    <div v-if="showFlightModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingFlight ? 'Edit Flight' : 'Add New Flight' }}</h5>
            <button type="button" class="btn-close" @click="showFlightModal = false" aria-label="Close"></button>
          </div>
          
          <div class="modal-body">
            <div v-if="flightFormError" class="alert alert-danger" role="alert">
              {{ flightFormError }}
            </div>
            
            <form @submit.prevent="saveFlight">
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Flight Number</label>
                  <input v-model="flightForm.flight_number" type="text" class="form-control" required>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label class="form-label">Price ($)</label>
                  <input v-model="flightForm.price" type="number" min="0" step="0.01" class="form-control" required>
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label">From</label>
                  <input v-model="flightForm.source" type="text" class="form-control" required>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label class="form-label">To</label>
                  <input v-model="flightForm.destination" type="text" class="form-control" required>
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Departure Date</label>
                  <input v-model="flightForm.departure_date" type="date" class="form-control" required>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label class="form-label">Departure Time</label>
                  <input v-model="flightForm.departure_time" type="time" class="form-control" required>
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Arrival Date</label>
                  <input v-model="flightForm.arrival_date" type="date" class="form-control" required>
                </div>
                
                <div class="col-md-6 mb-3">
                  <label class="form-label">Arrival Time</label>
                  <input v-model="flightForm.arrival_time" type="time" class="form-control" required>
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Total Seats</label>
                  <input v-model="flightForm.total_seats" type="number" min="1" class="form-control" required>
                </div>
                
                <div v-if="editingFlight" class="col-md-6 mb-3">
                  <label class="form-label">Available Seats</label>
                  <input v-model="flightForm.available_seats" type="number" min="0" class="form-control" required>
                </div>
              </div>
              
              <div class="d-flex justify-content-end">
                <button type="button" @click="showFlightModal = false" class="btn btn-secondary me-2">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isLoading ? 'Saving...' : 'Save Flight' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Flight Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Flight</h5>
            <button type="button" class="btn-close" @click="showDeleteModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete this flight? This action cannot be undone and may affect existing bookings.</p>
          </div>
          <div class="modal-footer">
            <button @click="showDeleteModal = false" class="btn btn-secondary">
              Cancel
            </button>
            <button @click="deleteFlight" class="btn btn-danger" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Deleting...' : 'Delete Flight' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useFlightStore } from '../stores/flights'
import { useBookingStore } from '../stores/bookings'

const flightStore = useFlightStore()
const bookingStore = useBookingStore()

const activeTab = ref('flights')
const flightSearchQuery = ref('')
const bookingSearchQuery = ref('')
const isLoading = ref(false)

// Flight modal state
const showFlightModal = ref(false)
const editingFlight = ref(null)
const flightForm = ref({
  flight_number: '',
  source: '',
  destination: '',
  departure_date: '',
  departure_time: '',
  arrival_date: '',
  arrival_time: '',
  total_seats: 100,
  available_seats: 100,
  price: 0
})
const flightFormError = ref('')

// Delete flight modal state
const showDeleteModal = ref(false)
const flightToDelete = ref(null)

// Add flight modal trigger
const showAddFlightModal = ref(false)

// Filtered flights based on search
const filteredFlights = computed(() => {
  if (!flightSearchQuery.value.trim()) {
    return flightStore.flights
  }
  
  const query = flightSearchQuery.value.toLowerCase().trim()
  return flightStore.flights.filter(flight => 
    flight.flight_number.toLowerCase().includes(query) ||
    flight.source.toLowerCase().includes(query) ||
    flight.destination.toLowerCase().includes(query)
  )
})

// Filtered bookings based on search
const filteredBookings = computed(() => {
  if (!bookingSearchQuery.value.trim()) {
    return bookingStore.bookings
  }
  
  const query = bookingSearchQuery.value.toLowerCase().trim()
  return bookingStore.bookings.filter(booking => 
    booking.flight_details.flight_number.toLowerCase().includes(query) ||
    booking.status.toLowerCase().includes(query)
  )
})

// Format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Format time
const formatTime = (timeString) => {
  if (!timeString) return '';
  const timeParts = timeString.split(':')
  return `${timeParts[0]}:${timeParts[1]}`
}

// Edit flight
const editFlight = (flight) => {
  editingFlight.value = flight
  flightForm.value = { ...flight }
  showFlightModal.value = true
}

// Confirm delete flight
const confirmDeleteFlight = (id) => {
  flightToDelete.value = id
  showDeleteModal.value = true
}

// Delete flight
const deleteFlight = async () => {
  if (!flightToDelete.value) return
  
  isLoading.value = true
  
  try {
    const result = await flightStore.deleteFlight(flightToDelete.value)
    
    if (result.success) {
      // Refresh flights list
      await flightStore.fetchFlights()
    } else {
      alert(result.message || 'Failed to delete flight')
    }
  } catch (error) {
    console.error('Error deleting flight:', error)
    alert('An error occurred while deleting the flight')
  } finally {
    isLoading.value = false
    showDeleteModal.value = false
    flightToDelete.value = null
  }
}

// Watch for changes to showAddFlightModal
watch(showAddFlightModal, (newVal) => {
  if (newVal) {
    editingFlight.value = null
    flightForm.value = {
      flight_number: '',
      source: '',
      destination: '',
      departure_date: new Date().toISOString().split('T')[0],
      departure_time: '08:00',
      arrival_date: new Date().toISOString().split('T')[0],
      arrival_time: '10:00',
      total_seats: 100,
      available_seats: 100,
      price: 299.99
    }
    showFlightModal.value = true
    showAddFlightModal.value = false
  }
})

// Save flight (create or update)
const saveFlight = async () => {
  flightFormError.value = ''
  isLoading.value = true
  
  try {
    let result
    
    if (editingFlight.value) {
      // Update existing flight
      result = await flightStore.updateFlight(editingFlight.value.id, flightForm.value)
    } else {
      // Create new flight
      result = await flightStore.createFlight(flightForm.value)
    }
    
    if (result.success) {
      // Refresh flights list
      await flightStore.fetchFlights()
      showFlightModal.value = false
    } else {
      flightFormError.value = 'Failed to save flight. Please check your input and try again.'
      console.error('Errors:', result.errors)
    }
  } catch (error) {
    console.error('Error saving flight:', error)
    flightFormError.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Load data on component mount
onMounted(async () => {
  await flightStore.fetchFlights()
  await bookingStore.fetchUserBookings()
})
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}
</style>