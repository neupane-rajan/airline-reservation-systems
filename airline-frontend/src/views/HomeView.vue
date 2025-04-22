<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section mb-5">
      <div class="hero-content text-center py-5">
        <div class="container">
          <h1 class="display-4 fw-bold mb-3 text-white">Your Journey Begins with SkyWay</h1>
          <p class="lead mb-4 mx-auto text-white" style="max-width: 700px;">
            Experience world-class service and comfort as you travel to destinations around the globe.
          </p>
          <div class="mt-4">
            <router-link to="/flights" class="btn btn-primary btn-lg px-4 me-2">Search Flights</router-link>
            <a href="#destinations" class="btn btn-outline-light btn-lg px-4">Explore Destinations</a>
          </div>
          <div class="mt-3 text-white">
            <small>Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): {{ currentDateTime }}</small>
            <div>Current User's Login: neupane-rajan</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Search Form Card -->
    <section class="container mb-5">
      <div class="card search-card">
        <div class="card-body p-4">
          <h2 class="h4 mb-4 text-center">Find Your Flight</h2>
          
          <form @submit.prevent="handleSearch">
            <div class="row g-3">
              <div class="col-md-5 mb-2">
                <label class="form-label">From</label>
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-geo-alt"></i></span>
                  <input v-model="searchForm.source" type="text" class="form-control" placeholder="Departure City or Airport">
                </div>
              </div>
              
              <div class="col-md-5 mb-2">
                <label class="form-label">To</label>
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-geo-alt-fill"></i></span>
                  <input v-model="searchForm.destination" type="text" class="form-control" placeholder="Arrival City or Airport">
                </div>
              </div>
              
              <div class="col-md-2 mb-2">
                <label class="form-label">Date</label>
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-calendar3"></i></span>
                  <input v-model="searchForm.date" type="date" class="form-control">
                </div>
              </div>
              
              <div class="col-12 text-center mt-3">
                <button type="submit" class="btn btn-primary px-5">
                  <i class="bi bi-search me-2"></i> Search Flights
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    
    <!-- Featured Indian Destinations -->
    <section id="destinations" class="container mb-5">
      <h2 class="section-heading text-center mb-5">Discover India</h2>
      
      <div class="row g-4 mb-5">
        <div v-for="(destination, index) in indianDestinations.slice(0, 4)" :key="index" class="col-lg-3 col-md-6">
          <div class="card destination-card h-100 border-0 shadow-sm">
            <div class="position-relative">
              <img :src="destination.imageUrl" class="card-img-top" alt="destination.city" style="height: 200px; object-fit: cover;">
              <div class="destination-overlay">
                <span class="btn btn-sm btn-primary price-tag">From ${{ destination.price }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="card-title h5 text-primary">{{ destination.city }}</h3>
              <p class="small text-muted mb-2">{{ destination.airport }}</p>
              <p class="card-text">{{ destination.description }}</p>
              <router-link :to="{ name: 'flights', query: { destination: destination.city } }" class="btn btn-outline-primary btn-sm mt-2">
                <i class="bi bi-airplane me-1"></i> Find Flights
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row g-4 mb-5">
        <div v-for="(destination, index) in indianDestinations.slice(4)" :key="index + 4" class="col-lg-3 col-md-6">
          <div class="card destination-card h-100 border-0 shadow-sm">
            <div class="position-relative">
              <img :src="destination.imageUrl" class="card-img-top" alt="destination.city" style="height: 200px; object-fit: cover;">
              <div class="destination-overlay">
                <span class="btn btn-sm btn-primary price-tag">From ${{ destination.price }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="card-title h5 text-primary">{{ destination.city }}</h3>
              <p class="small text-muted mb-2">{{ destination.airport }}</p>
              <p class="card-text">{{ destination.description }}</p>
              <router-link :to="{ name: 'flights', query: { destination: destination.city } }" class="btn btn-outline-primary btn-sm mt-2">
                <i class="bi bi-airplane me-1"></i> Find Flights
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- International Destinations -->
      <h2 class="section-heading text-center mb-5">International Destinations</h2>
      
      <div class="row g-4">
        <div v-for="(destination, index) in internationalDestinations" :key="index" class="col-lg-3 col-md-6">
          <div class="card destination-card h-100 border-0 shadow-sm">
            <div class="position-relative">
              <img :src="destination.imageUrl" class="card-img-top" alt="destination.city" style="height: 200px; object-fit: cover;">
              <div class="destination-overlay">
                <span class="btn btn-sm btn-primary price-tag">From ${{ destination.price }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="card-title h5 text-primary">{{ destination.city }}</h3>
              <p class="small text-muted mb-2">{{ destination.airport }}</p>
              <p class="card-text">{{ destination.description }}</p>
              <router-link :to="{ name: 'flights', query: { destination: destination.city } }" class="btn btn-outline-primary btn-sm mt-2">
                <i class="bi bi-airplane me-1"></i> Find Flights
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features -->
    <section class="bg-light py-5 mb-5">
      <div class="container">
        <h2 class="section-heading text-center mb-5">Why Fly With Us</h2>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-box text-center p-4">
              <div class="feature-icon mb-3">
                <i class="bi bi-shield-check"></i>
              </div>
              <h3 class="h5 mb-2">Safe & Secure</h3>
              <p class="text-muted">Your safety is our top priority. Our fleet is regularly maintained to the highest standards.</p>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-box text-center p-4">
              <div class="feature-icon mb-3">
                <i class="bi bi-clock-history"></i>
              </div>
              <h3 class="h5 mb-2">On-Time Performance</h3>
              <p class="text-muted">We pride ourselves on punctuality. Get to your destination on time, every time.</p>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="feature-box text-center p-4">
              <div class="feature-icon mb-3">
                <i class="bi bi-cash-coin"></i>
              </div>
              <h3 class="h5 mb-2">Best Price Guarantee</h3>
              <p class="text-muted">We offer competitive prices and special deals to ensure you get the best value.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="container mb-5">
      <h2 class="section-heading text-center mb-5">What Our Customers Say</h2>
      
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="card testimonial-card h-100">
            <div class="card-body">
              <div class="d-flex mb-3">
                <div class="text-warning me-2">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </div>
              <p class="testimonial-text mb-4">"The booking process was incredibly simple and the flight was comfortable. SkyWay has become my go-to airline for all my travel needs."</p>
              <div class="d-flex align-items-center">
                <div class="avatar me-3">
                  <div class="avatar-placeholder bg-primary text-white">JD</div>
                </div>
                <div>
                  <h6 class="mb-0">John Doe</h6>
                  <small class="text-muted">Frequent Flyer</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4 col-md-6">
          <div class="card testimonial-card h-100">
            <div class="card-body">
              <div class="d-flex mb-3">
                <div class="text-warning me-2">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </div>
              <p class="testimonial-text mb-4">"I appreciate the cleanliness of the aircraft and the professionalism of the cabin crew. My recent flight to Mumbai was exceptional."</p>
              <div class="d-flex align-items-center">
                <div class="avatar me-3">
                  <div class="avatar-placeholder bg-primary text-white">AS</div>
                </div>
                <div>
                  <h6 class="mb-0">Amit Sharma</h6>
                  <small class="text-muted">Business Traveler</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4 col-md-6">
          <div class="card testimonial-card h-100">
            <div class="card-body">
              <div class="d-flex mb-3">
                <div class="text-warning me-2">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-half"></i>
                </div>
              </div>
              <p class="testimonial-text mb-4">"The customer service was outstanding when I needed to reschedule my flight. SkyWay really goes above and beyond for their customers."</p>
              <div class="d-flex align-items-center">
                <div class="avatar me-3">
                  <div class="avatar-placeholder bg-primary text-white">RP</div>
                </div>
                <div>
                  <h6 class="mb-0">Priya Patel</h6>
                  <small class="text-muted">Family Traveler</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="bg-primary text-white py-5 mb-0">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <h2 class="mb-2">Subscribe to Our Newsletter</h2>
            <p class="mb-0">Get the latest news, travel inspiration and special offers delivered directly to your inbox.</p>
          </div>
          <div class="col-lg-6">
            <form @submit.prevent class="newsletter-form">
              <div class="input-group">
                <input type="email" class="form-control form-control-lg" placeholder="Your Email Address" aria-label="Your Email Address">
                <button class="btn btn-light btn-lg" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Add current date and time with exact format
const currentDateTime = computed(() => {
  return '2025-04-20 12:15:41';  // Hard-coded exact date format as specified
})

const indianDestinations = [
  {
    city: 'Mumbai',
    airport: 'Chhatrapati Shivaji Maharaj International Airport (BOM)',
    description: 'Experience the bustling metropolis, Bollywood glamour, and vibrant street life.',
    imageUrl: 'images/destination/mumbai.jpg',
    price: 199
  },
  {
    city: 'Delhi',
    airport: 'Indira Gandhi International Airport (DEL)',
    description: 'Visit majestic temples, vibrant markets, and enjoy rich cultural experiences.',
    imageUrl: 'images/destination/delhi.jpg',
    price: 189
  },
  {
    city: 'Bangalore',
    airport: 'Kempegowda International Airport (BLR)',
    description: 'Explore the garden city with its tech hubs, craft breweries, and pleasant climate.',
    imageUrl: 'images/destination/bangalore.jpg',
    price: 179
  },
  {
    city: 'Jaipur',
    airport: 'Jaipur International Airport (JAI)',
    description: 'Discover the Pink City with its stunning palaces, forts, and vibrant culture.',
    imageUrl: 'images/destination/jaipur.jpg',
    price: 169
  },
  {
    city: 'Kochi, Kerala',
    airport: 'Cochin International Airport (COK)',
    description: 'Experience the serene backwaters, lush greenery, and rich cultural heritage.',
    imageUrl: 'images/destination/kerala.jpg',
    price: 159
  },
  {
    city: 'Chennai, Tamil Nadu',
    airport: 'Chennai International Airport (MAA)',
    description: 'Explore historic temples, sandy beaches, and traditional South Indian culture.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 169
  },
  {
    city: 'Dehradun, Uttarakhand',
    airport: 'Jolly Grant Airport (DED)',
    description: 'Discover beautiful mountain landscapes, spiritual retreats, and adventure activities.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 149
  },
  {
    city: 'Leh, Ladakh',
    airport: 'Kushok Bakula Rimpochee Airport (IXL)',
    description: 'Explore breathtaking high-altitude landscapes, monasteries, and unique culture.',
    imageUrl: 'images/destination/ladhak.jpg',
    price: 199
  },
  {
    city: 'Jammu',
    airport: 'Jammu Airport (IXJ)',
    description: 'Visit ancient temples, picturesque valleys, and experience the gateway to Kashmir.',
    imageUrl: 'images/destination/jammu.jpg',
    price: 179
  }
]

const internationalDestinations = [
  {
    city: 'Tokyo, Japan',
    airport: 'Narita International Airport (NRT)',
    description: 'Discover the perfect blend of traditional culture and modern technology.',
    imageUrl: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    price: 599
  },
  {
    city: 'Dubai, UAE',
    airport: 'Dubai International Airport (DXB)',
    description: 'Visit futuristic architecture, luxury shopping, and beautiful desert landscapes.',
    imageUrl: 'https://images.unsplash.com/photo-1550595704-a608b8a5dc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    price: 349
  },
  {
    city: 'London, UK',
    airport: 'Heathrow Airport (LHR)',
    description: 'Explore historic sites, world-class museums, and diverse neighborhoods.',
    imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    price: 449
  },
  {
    city: 'Singapore',
    airport: 'Singapore Changi Airport (SIN)',
    description: 'Experience ultra-modern architecture, diverse cuisine, and immaculate gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    price: 399
  }
]

const searchForm = ref({
  source: '',
  destination: '',
  date: ''
})

const handleSearch = () => {
  const query = {}
  
  if (searchForm.value.source) query.source = searchForm.value.source
  if (searchForm.value.destination) query.destination = searchForm.value.destination
  if (searchForm.value.date) query.date = searchForm.value.date
  
  router.push({
    name: 'flights',
    query
  })
}
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
}

.hero-content {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.search-card {
  margin-top: -80px;
  z-index: 10;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.destination-card {
  overflow: hidden;
  transition: transform 0.3s ease;
}

.destination-card:hover {
  transform: translateY(-10px);
}

.destination-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
}

.price-tag {
  font-weight: 600;
}

.feature-box {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.testimonial-card {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.testimonial-text {
  position: relative;
  font-style: italic;
}

.testimonial-text::before {
  content: '"';
  font-size: 4rem;
  font-family: Georgia, serif;
  color: #e0e0e0;
  position: absolute;
  top: -20px;
  left: -10px;
  z-index: -1;
  opacity: 0.3;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.newsletter-form .form-control {
  border: none;
}

.newsletter-form .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>