<template>
  <header>
    <!-- Top bar with contact info -->
    <div class="bg-dark text-white py-2">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-none d-md-flex">
            <span class="me-3">
              <i class="bi bi-telephone me-1"></i> +1 (123) 456-7890
            </span>
            <span>
              <i class="bi bi-envelope me-1"></i> support@airlinereservation.com
            </span>
          </div>
          <div>
            <span>{{ currentDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <!-- Logo and Brand -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-airplane text-primary me-2" viewBox="0 0 16 16">
            <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"/>
          </svg>
          <span class="fw-bold">SkyWay Airlines</span>
        </router-link>
        
        <!-- Navbar Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Navigation Menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-3">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/flights" class="nav-link px-3">Flights</router-link>
            </li>
            <template v-if="isAuthenticated">
              <li class="nav-item">
                <router-link to="/bookings" class="nav-link px-3">My Bookings</router-link>
              </li>
              <li class="nav-item" v-if="isAdmin">
                <router-link to="/admin" class="nav-link px-3">Admin</router-link>
              </li>
            </template>
          </ul>
          
          <!-- Auth Buttons -->
          <div class="d-flex">
            <template v-if="isAuthenticated">
              <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-person-circle me-1"></i>
                  {{ username }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><router-link class="dropdown-item" to="/profile">My Profile</router-link></li>
                  <li><router-link class="dropdown-item" to="/bookings">My Bookings</router-link></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Sign Out</a></li>
                </ul>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-primary me-2">Login</router-link>
              <router-link to="/register" class="btn btn-outline-primary d-none d-md-block">Register</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const username = computed(() => authStore.user?.username || '')
const currentDate = computed(() => {
  const date = new Date('2025-04-20T11:13:43');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar-nav .nav-link {
  font-weight: 500;
  position: relative;
}

.navbar-nav .nav-link.router-link-active {
  color: var(--primary-color);
}

.navbar-nav .nav-link.router-link-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background-color: var(--primary-color);
}
</style>