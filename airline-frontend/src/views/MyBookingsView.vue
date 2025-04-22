<template>
  <div>
    <h1 class="mb-4">My Bookings</h1>
    
    <!-- Loading State -->
    <div v-if="bookingStore.isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading your bookings...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="bookingStore.error" class="alert alert-danger mb-4" role="alert">
      {{ bookingStore.error }}
    </div>
    
    <!-- Bookings List -->
    <template v-else>
      <div v-if="bookings.length > 0">
        <div class="list-group mb-4">
          <div v-for="booking in bookings" :key="booking.id" class="list-group-item p-4">
            <div class="row">
              <!-- Flight Details -->
              <div class="col-md-8 mb-3 mb-md-0">
                <div class="d-flex mb-2">
                  <span 
                    :class="[
                      'badge me-2',
                      booking.status === 'confirmed' ? 'bg-success' : 'bg-danger'
                    ]"
                  >
                    {{ booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled' }}
                  </span>
                  <span class="text-muted small">
                    Booked on {{ formatDate(booking.booking_date) }}
                  </span>
                </div>
                
                <div class="fs-5 fw-bold">
                  {{ booking.flight_details.flight_number }}: {{ booking.flight_details.source }} → {{ booking.flight_details.destination }}
                </div>
                
                <div class="text-muted">
                  {{ formatDate(booking.flight_details.departure_date) }} · 
                  {{ formatTime(booking.flight_details.departure_time) }} - {{ formatTime(booking.flight_details.arrival_time) }}
                </div>
                
                <div class="text-primary mt-2">
                  Seat: {{ booking.seat_number }}
                </div>
              </div>
              
              <!-- Actions -->
              <div class="col-md-4 text-md-end">
                <div class="fs-4 fw-bold mb-3">${{ booking.flight_details.price }}</div>
                
                <button
                  v-if="booking.status === 'confirmed'"
                  @click="confirmCancel(booking.id)"
                  class="btn btn-danger"
                  :disabled="isLoading"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No Bookings -->
      <div v-else class="card bg-light">
        <div class="card-body text-center py-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-calendar-x text-muted mb-3" viewBox="0 0 16 16">
            <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z"/>
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
          </svg>
          <h2 class="h4 mb-2">No Bookings Found</h2>
          <p class="text-muted mb-4">You don't have any flight bookings yet.</p>
          <router-link to="/flights" class="btn btn-primary">Search Flights</router-link>
        </div>
      </div>
    </template>
    
    <!-- Confirmation Modal -->
    <div v-if="showCancelModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cancel Booking</h5>
            <button type="button" class="btn-close" @click="showCancelModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button @click="showCancelModal = false" class="btn btn-secondary">
              No, Keep Booking
            </button>
            <button @click="cancelBooking" class="btn btn-danger" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Cancelling...' : 'Yes, Cancel Booking' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useBookingStore } from '../stores/bookings'

const bookingStore = useBookingStore()

const isLoading = ref(false)
const showCancelModal = ref(false)
const bookingToCancel = ref(null)

// Get bookings from store
const bookings = computed(() => bookingStore.bookings)

// Format date
const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Format time
const formatTime = (timeString) => {
  if (!timeString) return '';
  const timeParts = timeString.split(':')
  return `${timeParts[0]}:${timeParts[1]}`
}

// Confirm cancellation
const confirmCancel = (bookingId) => {
  bookingToCancel.value = bookingId
  showCancelModal.value = true
}

// Cancel booking
const cancelBooking = async () => {
  if (!bookingToCancel.value) return
  
  isLoading.value = true
  
  try {
    const result = await bookingStore.cancelBooking(bookingToCancel.value)
    
    if (!result.success) {
      alert(result.error || 'Failed to cancel booking')
    }
  } catch (error) {
    console.error('Error cancelling booking:', error)
    alert('An error occurred while cancelling your booking')
  } finally {
    isLoading.value = false
    showCancelModal.value = false
    bookingToCancel.value = null
  }
}

// On component mount, fetch user's bookings
onMounted(async () => {
  await bookingStore.fetchUserBookings()
})
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}
</style>