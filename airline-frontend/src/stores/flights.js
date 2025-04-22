import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { API_URL } from '../config'

export const useFlightStore = defineStore('flights', {
  state: () => ({
    flights: [],
    isLoading: false,
    error: null,
    currentFlight: null
  }),
  
  actions: {
    async fetchFlights(searchParams = {}) {
      this.isLoading = true
      this.error = null
      
      try {
        let url = `${API_URL}/flights/`
        
        // Add search params if provided
        if (Object.keys(searchParams).length > 0) {
          const searchQuery = new URLSearchParams()
          
          if (searchParams.source) searchQuery.append('search', searchParams.source)
          if (searchParams.destination) searchQuery.append('search', searchParams.destination)
          if (searchParams.date) searchQuery.append('search', searchParams.date)
          
          url += `?${searchQuery.toString()}`
        }
        
        const response = await axios.get(url)
        this.flights = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching flights:', error)
        this.error = 'Failed to load flights. Please try again.'
        return []
      } finally {
        this.isLoading = false
      }
    },
    
    async fetchFlightById(id) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.get(`${API_URL}/flights/${id}/`)
        this.currentFlight = response.data
        return response.data
      } catch (error) {
        console.error('Error fetching flight details:', error)
        this.error = 'Failed to load flight details. Please try again.'
        return null
      } finally {
        this.isLoading = false
      }
    },
    
    // Admin methods
    async createFlight(flightData) {
      const authStore = useAuthStore()
      
      try {
        const response = await axios.post(
          `${API_URL}/flights/`,
          flightData,
          {
            headers: { Authorization: `Token ${authStore.token}` }
          }
        )
        return { success: true, flight: response.data }
      } catch (error) {
        console.error('Error creating flight:', error)
        return { 
          success: false, 
          errors: error.response?.data || { error: 'Failed to create flight' }
        }
      }
    },
    
    async updateFlight(id, flightData) {
      const authStore = useAuthStore()
      
      try {
        const response = await axios.put(
          `${API_URL}/flights/${id}/`,
          flightData,
          {
            headers: { Authorization: `Token ${authStore.token}` }
          }
        )
        return { success: true, flight: response.data }
      } catch (error) {
        console.error('Error updating flight:', error)
        return { 
          success: false, 
          errors: error.response?.data || { error: 'Failed to update flight' }
        }
      }
    },
    
    async deleteFlight(id) {
      const authStore = useAuthStore()
      
      try {
        await axios.delete(
          `${API_URL}/flights/${id}/`,
          {
            headers: { Authorization: `Token ${authStore.token}` }
          }
        )
        return { success: true }
      } catch (error) {
        console.error('Error deleting flight:', error)
        return { 
          success: false, 
          message: 'Failed to delete flight' 
        }
      }
    }
  }
})