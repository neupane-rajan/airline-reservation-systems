<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title text-center mb-4">Create an Account</h1>
          
          <div v-if="Object.keys(formErrors).length > 0" class="alert alert-danger" role="alert">
            <p v-for="(errors, field) in formErrors" :key="field" class="mb-1">
              <strong>{{ field }}:</strong> {{ Array.isArray(errors) ? errors.join(', ') : errors }}
            </p>
          </div>
          
          <form @submit.prevent="handleRegister">
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
            
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input 
                id="email" 
                v-model="formData.email" 
                type="email" 
                class="form-control" 
                required 
                autocomplete="email"
              >
            </div>
            
            <div class="row mb-3">
              <div class="col-md-6 mb-3 mb-md-0">
                <label for="first_name" class="form-label">First Name</label>
                <input 
                  id="first_name" 
                  v-model="formData.first_name" 
                  type="text" 
                  class="form-control" 
                  required 
                  autocomplete="given-name"
                >
              </div>
              
              <div class="col-md-6">
                <label for="last_name" class="form-label">Last Name</label>
                <input 
                  id="last_name" 
                  v-model="formData.last_name" 
                  type="text" 
                  class="form-control" 
                  required 
                  autocomplete="family-name"
                >
              </div>
            </div>
            
            <div class="mb-4">
              <label for="password" class="form-label">Password</label>
              <input 
                id="password" 
                v-model="formData.password" 
                type="password" 
                class="form-control" 
                required 
                autocomplete="new-password"
              >
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary w-100" 
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Creating account...' : 'Register' }}
            </button>
          </form>
          
          <div class="mt-4 text-center">
            <p>Already have an account? 
              <router-link to="/login" class="text-decoration-none">Login here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  role: 'passenger'
})

const isLoading = ref(false)
const formErrors = ref({})

const handleRegister = async () => {
  formErrors.value = {}
  isLoading.value = true
  
  try {
    const result = await authStore.register(formData.value)
    
    if (result.success) {
      router.push('/')
    } else {
      formErrors.value = result.errors || { error: 'Registration failed' }
    }
  } catch (error) {
    formErrors.value = { error: 'Registration failed. Please try again.' }
    console.error('Registration error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>