<template>
    <footer class="bg-gray-800 text-white py-6 mt-10">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="mb-4 md:mb-0">
            <h3 class="text-lg font-semibold mb-2">Airline Reservation System</h3>
            <p class="text-gray-400 text-sm">A college project demonstration.</p>
          </div>
          
          <div>
            <h4 class="text-md font-medium mb-2">Quick Links</h4>
            <div class="flex flex-col space-y-1">
              <router-link to="/" class="text-gray-400 hover:text-white text-sm">Home</router-link>
              <router-link to="/flights" class="text-gray-400 hover:text-white text-sm">Flights</router-link>
              <router-link to="/login" class="text-gray-400 hover:text-white text-sm">Login</router-link>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          © {{ currentYear }} Airline Reservation System. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const currentYear = computed(() => new Date().getFullYear());
  </script>