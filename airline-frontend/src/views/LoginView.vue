<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title text-center mb-4">Login to Your Account</h1>
          
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input 
                id="username" 
                v-model="formData.username" 
                type="text" 
                class="form-control" 
                required 
                autocomplete="username"
              >
            </div>
            
            <div class="mb-4">
              <label for="password" class="form-label">Password</label>
              <input 
                id="password" 
                v-model="formData.password" 
                type="password" 
                class="form-control" 
                required 
                autocomplete="current-password"
              >
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary w-100" 
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </form>
          
          <div class="mt-4 text-center">
            <p>Don't have an account? 
              <router-link to="/register" class="text-decoration-none">Register here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true
  
  try {
    const result = await authStore.login(formData.value.username, formData.value.password)
    
    if (result.success) {
      // Redirect to the intended page or home
      const redirectPath = route.query.redirect || '/'
      router.push(redirectPath)
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Login failed. Please try again.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>