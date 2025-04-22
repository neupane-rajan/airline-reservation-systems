import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { API_URL } from '../config'

export const useBookingStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
    isLoading: false,
    error: null
  }),
  
  actions: {
    async fetchUserBookings() {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return []
      
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.get(`${API_URL}/bookings/`, {
          headers: { Authorization: `Token ${authStore.token}` }
        })
        
        this.bookings = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching bookings:', error)
        this.error = 'Failed to load bookings. Please try again.'
        return []
      } finally {
        this.isLoading = false
      }
    },
    
    async createBooking(bookingData) {
      const authStore = useAuthStore()
      
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.post(
          `${API_URL}/bookings/`,
          bookingData,
          {
            headers: { Authorization: `Token ${authStore.token}` }
          }
        )
        
        // Add the new booking to the list
        this.bookings.push(response.data)
        return { success: true, booking: response.data }
      } catch (error) {
        console.error('Error creating booking:', error)
        this.error = error.response?.data || 'Failed to create booking. Please try again.'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },
    
    async cancelBooking(bookingId) {
      const authStore = useAuthStore()
      
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.patch(
          `${API_URL}/bookings/${bookingId}/`,
          { status: 'cancelled' },
          {
            headers: { Authorization: `Token ${authStore.token}` }
          }
        )
        
        // Update the booking in the local state
        const index = this.bookings.findIndex(b => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = response.data
        }
        
        return { success: true, booking: response.data }
      } catch (error) {
        console.error('Error cancelling booking:', error)
        this.error = 'Failed to cancel booking. Please try again.'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    }
  }
})