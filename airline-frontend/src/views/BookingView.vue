<template>
  <div>
    <div v-if="flightStore.isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading flight details...</p>
    </div>
    
    <template v-else-if="flight">
      <h1 class="mb-4">Book Your Flight</h1>
      
      <!-- Flight Details Card -->
      <div class="card mb-4">
        <div class="card-body">
          <h2 class="card-title mb-4">Flight Details</h2>
          
          <div class="row">
            <div class="col-md-7">
              <div class="fs-5">{{ flight.flight_number }}</div>
              <div class="fs-3 fw-bold mb-2">{{ flight.source }} → {{ flight.destination }}</div>
              <div class="text-muted">{{ formatDate(flight.departure_date) }}</div>
              <div class="text-muted">Departure: {{ formatTime(flight.departure_time) }}</div>
              <div class="text-muted">Arrival: {{ formatTime(flight.arrival_time) }}</div>
            </div>
            
            <div class="col-md-5 text-md-end">
              <div class="fs-2 fw-bold text-primary mb-2">${{ flight.price }}</div>
              <div class="text-muted">{{ flight.available_seats }} seats available</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Booking Form -->
      <div v-if="flight.available_seats > 0">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title mb-4">Passenger Information</h2>
            
            <div v-if="bookingError" class="alert alert-danger mb-4" role="alert">
              {{ bookingError }}
            </div>
            
            <div v-if="bookingSuccess" class="alert alert-success mb-4" role="alert">
              <p class="fw-bold mb-2">Booking Confirmed!</p>
              <p>Your booking has been successfully confirmed. You can view your booking details in the My Bookings section.</p>
              <div class="mt-3">
                <router-link to="/bookings" class="btn btn-primary me-2">View My Bookings</router-link>
                <router-link to="/flights" class="btn btn-outline-primary">Book Another Flight</router-link>
              </div>
            </div>
            
            <form v-else @submit.prevent="handleBooking">
              <!-- Select Seat -->
              <div class="mb-4">
                <label class="form-label">Select Your Seat</label>
                <input 
                  v-model="bookingForm.seat_number" 
                  type="text" 
                  class="form-control" 
                  placeholder="e.g., 12A" 
                  required
                >
                <div class="form-text">Enter a seat number (e.g., 12A, 15C)</div>
              </div>
              
              <!-- Payment Information (simulated) -->
              <div class="mb-4">
                <h3 class="h5 mb-3">Payment Information</h3>
                <p class="text-muted mb-3">This is a simulated payment - no actual charge will be made.</p>
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Card Number</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      placeholder="1234 5678 9012 3456" 
                      value="4111 1111 1111 1111"
                      disabled
                    >
                  </div>
                  
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Cardholder Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      placeholder="John Doe" 
                      value="Demo User"
                      disabled
                    >
                  </div>
                </div>
              </div>
              
              <div class="border-top pt-4 mt-4">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                  <div class="mb-3 mb-md-0">
                    <div class="fs-5">Price</div>
                    <div class="fs-3 fw-bold">${{ flight.price }}</div>
                  </div>
                  
                  <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ isLoading ? 'Processing...' : 'Confirm Booking' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- No seats available -->
      <div v-else class="card bg-light">
        <div class="card-body text-center py-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-exclamation-triangle text-warning mb-3" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
          </svg>
          <h2 class="h4 mb-2">No Seats Available</h2>
          <p class="text-muted mb-4">This flight is fully booked. Please check other flights.</p>
          <router-link to="/flights" class="btn btn-primary">Find Other Flights</router-link>
        </div>
      </div>
    </template>
    
    <!-- Error state -->
    <div v-else-if="flightStore.error" class="card bg-light">
      <div class="card-body text-center py-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-exclamation-circle text-danger mb-3" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        <h2 class="h4 mb-2">Error Loading Flight</h2>
        <p class="text-muted mb-4">{{ flightStore.error }}</p>
        <router-link to="/flights" class="btn btn-primary">Back to Flight Search</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFlightStore } from '../stores/flights'
import { useBookingStore } from '../stores/bookings'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const flightStore = useFlightStore()
const bookingStore = useBookingStore()
const authStore = useAuthStore()

const flightId = Number(route.params.flightId)
const isLoading = ref(false)
const bookingError = ref('')
const bookingSuccess = ref(false)

const bookingForm = ref({
  flight: flightId,
  seat_number: ''
})

// Get the flight from store
const flight = computed(() => flightStore.currentFlight)

// Format date
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Format time
const formatTime = (timeString) => {
  if (!timeString) return '';
  const timeParts = timeString.split(':')
  return `${timeParts[0]}:${timeParts[1]}`
}

// Handle booking submission
const handleBooking = async () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }
  
  bookingError.value = ''
  isLoading.value = true
  
  try {
    const result = await bookingStore.createBooking(bookingForm.value)
    
    if (result.success) {
      bookingSuccess.value = true
    } else {
      bookingError.value = result.error || 'Failed to create booking. Please try again.'
    }
  } catch (error) {
    console.error('Booking error:', error)
    bookingError.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// On component mount, fetch flight details
onMounted(async () => {
  if (!isNaN(flightId)) {
    await flightStore.fetchFlightById(flightId)
  }
})
</script>