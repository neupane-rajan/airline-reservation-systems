import { defineStore } from 'pinia'
import axios from 'axios'
import { API_URL } from '../config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.profile?.role || null,
    isAdmin: (state) => state.user?.profile?.role === 'admin',
  },
  
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`${API_URL}/users/login/`, {
          username,
          password
        })
        
        const { token, user_id, username: userName, email, role } = response.data
        
        this.token = token
        localStorage.setItem('token', token)
        
        // Fetch more user details
        await this.fetchUserDetails()
        
        return { success: true }
      } catch (error) {
        console.error('Login error:', error)
        return { 
          success: false, 
          message: error.response?.data?.non_field_errors?.[0] || 'Login failed. Please check your credentials.'
        }
      }
    },
    
    async register(userData) {
      try {
        const response = await axios.post(`${API_URL}/users/register/`, userData)
        
        const { token } = response.data
        this.token = token
        localStorage.setItem('token', token)
        
        await this.fetchUserDetails()
        
        return { success: true }
      } catch (error) {
        console.error('Registration error:', error)
        return { 
          success: false, 
          errors: error.response?.data || { error: 'Registration failed' }
        }
      }
    },
    
    async fetchUserDetails() {
      if (!this.token) return
      
      try {
        const response = await axios.get(`${API_URL}/users/me/`, {
          headers: { Authorization: `Token ${this.token}` }
        })
        
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user details:', error)
        this.logout()
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})