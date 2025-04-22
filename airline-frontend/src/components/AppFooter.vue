<template>
  <footer>
    <!-- Main Footer -->
    <div class="bg-dark text-white pt-5 pb-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4">
            <h5 class="mb-4 footer-title">SkyWay Airlines</h5>
            <p class="text-muted mb-4">Experience the comfort and convenience of flying with SkyWay Airlines. Our commitment to excellence ensures a seamless travel experience.</p>
            <div class="d-flex social-links">
              <a href="#" class="me-3 social-icon"><i class="bi bi-facebook"></i></a>
              <a href="#" class="me-3 social-icon"><i class="bi bi-twitter"></i></a>
              <a href="#" class="me-3 social-icon"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-icon"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
          
          <div class="col-lg-2 col-md-6 mb-4">
            <h5 class="mb-4 footer-title">Quick Links</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><router-link to="/" class="footer-link">Home</router-link></li>
              <li class="mb-2"><router-link to="/flights" class="footer-link">Search Flights</router-link></li>
              <li class="mb-2"><router-link to="/login" class="footer-link">Login</router-link></li>
              <li class="mb-2"><router-link to="/register" class="footer-link">Register</router-link></li>
            </ul>
          </div>
          
          <div class="col-lg-3 col-md-6 mb-4">
            <h5 class="mb-4 footer-title">Support</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="footer-link">FAQ</a></li>
              <li class="mb-2"><a href="#" class="footer-link">Terms & Conditions</a></li>
              <li class="mb-2"><a href="#" class="footer-link">Privacy Policy</a></li>
              <li class="mb-2"><a href="#" class="footer-link">Contact Us</a></li>
            </ul>
          </div>
          
          <div class="col-lg-3 mb-4">
            <h5 class="mb-4 footer-title">Contact</h5>
            <ul class="list-unstyled contact-list">
              <li class="mb-3">
                <i class="bi bi-geo-alt-fill me-2"></i>
                <span>123 Aviation Street, New York, NY 10001</span>
              </li>
              <li class="mb-3">
                <i class="bi bi-telephone-fill me-2"></i>
                <span>+1 (123) 456-7890</span>
              </li>
              <li class="mb-3">
                <i class="bi bi-envelope-fill me-2"></i>
                <span>support@airlinereservation.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Copyright -->
    <div class="bg-dark text-center py-3 border-top border-secondary">
      <div class="container">
        <p class="text-muted mb-0">© {{ new Date().getFullYear() }} SkyWay Airlines - All Rights Reserved</p>
        <p class="text-muted small mb-0">{{ currentDate }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

// Format the current date and time for display
const currentDate = computed(() => {
  const date = new Date('2025-04-20T11:13:43');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});
</script>

<style scoped>
.footer-title {
  position: relative;
  padding-bottom: 12px;
}

.footer-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: var(--primary-color);
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: white;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.social-icon:hover {
  background-color: var(--primary-color);
  color: white;
}

.contact-list i {
  color: var(--primary-color);
}
</style>