<template>
  <div class="app-container d-flex flex-column min-vh-100">
    <AppHeader />
    
    <main class="flex-grow-1 py-4">
      <!-- Global Loading indicator -->
      <div v-if="isLoading" class="position-fixed top-0 start-0 end-0" style="z-index: 1050;">
        <div class="progress" style="height: 3px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" style="width: 100%"></div>
        </div>
      </div>
      
      <div class="container py-3">
        <router-view />
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const isLoading = ref(false)
provide('isLoading', isLoading)

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    isLoading.value = true
    await authStore.fetchUserDetails()
    isLoading.value = false
  }
})
</script>

<style>
/* Global styles */
:root {
  --primary-color: #0066cc;
  --secondary-color: #ffc107;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --gray-color: #6c757d;
}

body {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

.app-container {
  background-color: #f5f7fa;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004494;
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color) !important;
}

.section-heading {
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 25px;
  font-weight: 700;
}

.section-heading::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 3px;
  background-color: var(--primary-color);
}

.section-heading.text-center::after {
  left: 50%;
  transform: translateX(-50%);
}

.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Custom form styling */
.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 102, 204, 0.25);
}
</style>