import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Import views directly instead of using lazy loading
// for simplicity in this initial setup
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FlightSearchView from '../views/FlightSearchView.vue'
import BookingView from '../views/BookingView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/flights',
      name: 'flights',
      component: FlightSearchView
    },
    {
      path: '/booking/:flightId',
      name: 'booking',
      component: BookingView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bookings',
      name: 'my-bookings',
      component: MyBookingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

// Navigation guard to check auth
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // If the user is not loaded but there's a token, try to fetch user details
  if (!authStore.user && authStore.token) {
    await authStore.fetchUserDetails()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // Check if route requires admin role
  if (to.meta.requiresAdmin && authStore.userRole !== 'admin') {
    next({ name: 'home' })
    return
  }
  
  next()
})

export default router