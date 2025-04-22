<template>
    <nav class="bg-primary text-white">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-2xl font-bold">
            Airline Booking
          </router-link>
          
          <div class="hidden md:flex space-x-6">
            <router-link to="/" class="hover:text-accent">Home</router-link>
            <router-link to="/flights" class="hover:text-accent">Flights</router-link>
            <template v-if="isAuthenticated">
              <router-link to="/bookings" class="hover:text-accent">My Bookings</router-link>
              <router-link to="/admin" v-if="isAdmin" class="hover:text-accent">Admin</router-link>
              <button @click="handleLogout" class="hover:text-accent">Logout</button>
            </template>
            <template v-else>
              <router-link to="/login" class="hover:text-accent">Login</router-link>
              <router-link to="/register" class="hover:text-accent">Register</router-link>
            </template>
          </div>
          
          <!-- Mobile menu button -->
          <button @click="toggleMobileMenu" class="md:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile menu -->
        <div v-show="mobileMenuOpen" class="md:hidden pt-4 pb-2">
          <div class="flex flex-col space-y-2">
            <router-link to="/" class="py-2 hover:bg-blue-700 px-2 rounded" @click="mobileMenuOpen = false">Home</router-link>
            <router-link to="/flights" class="py-2 hover:bg-blue-700 px-2 rounded" @click="mobileMenuOpen = false">Flights</router-link>
            <template v-if="isAuthenticated">
              <router-link to="/bookings" class="py-2 hover:bg-blue-700 px-2 rounded" @click="mobileMenuOpen = false">My Bookings</router-link>
              <router-link to="/admin" v-if="isAdmin" class="py-2 hover:bg-blue-700 px-2 rounded" @click="mobileMenuOpen = false">Admin</router-link>
              <button @click="handleMobileLogout" class="text-left py-2 hover:bg-blue-700 px-2 rounded w-full">Logout</button>
            </template>
            <template v-else>
              <router-link to="/login" class="py-2 hover:bg-blue-700 px-2 rounded" @click="mobileMenuOpen = false">Login</router-link>
              <router-link to="/register" class="py-2 hover:bg-blue-700 px-2 rounded" @click="mobileMenuOpen = false">Register</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const mobileMenuOpen = ref(false);
  
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const isAdmin = computed(() => authStore.userRole === 'admin');
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
  
  const handleLogout = () => {
    authStore.logout();
    router.push('/');
  };
  
  const handleMobileLogout = () => {
    mobileMenuOpen.value = false;
    handleLogout();
  };
  </script>