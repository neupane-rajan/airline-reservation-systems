<template>
    <div>
      <div class="page-header bg-light p-4 rounded mb-4">
        <h1 class="h3 mb-0">Find Your Perfect Flight</h1>
      </div>
      
      <!-- Search Form -->
      <div class="card mb-4 shadow-sm">
        <div class="card-body p-4">
          <form @submit.prevent="handleSearch">
            <div class="row g-3">
              <div class="col-md-4 mb-3">
                <label class="form-label">From</label>
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-geo-alt"></i></span>
                  <input v-model="searchParams.source" type="text" class="form-control" placeholder="Departure City">
                </div>
              </div>
              
              <div class="col-md-4 mb-3">
                <label class="form-label">To</label>
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-geo-alt-fill"></i></span>
                  <input v-model="searchParams.destination" type="text" class="form-control" placeholder="Arrival City">
                </div>
              </div>
              
              <div class="col-md-2 mb-3">
                <label class="form-label">Date</label>
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-calendar3"></i></span>
                  <input v-model="searchParams.date" type="date" class="form-control">
                </div>
              </div>
              
              <div class="col-md-2 d-flex align-items-end">
                <button type="submit" class="btn btn-primary w-100" :disabled="flightStore.isLoading">
                  <span v-if="flightStore.isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <i v-else class="bi bi-search me-2"></i>
                  {{ flightStore.isLoading ? 'Searching...' : 'Search' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="flightStore.error" class="alert alert-danger mb-4" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {{ flightStore.error }}
      </div>
      
      <!-- Results -->
      <div v-if="flights.length > 0" class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h4 mb-0">Available Flights</h2>
          <div class="text-muted">{{ flights.length }} flights found</div>
        </div>
        
        <div class="flight-list">
          <div v-for="flight in flights" :key="flight.id" class="card flight-card mb-3">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-lg-8">
                  <div class="d-flex align-items-start mb-3">
                    <div class="flight-badge me-3">
                      <i class="bi bi-airplane"></i>
                    </div>
                    <div>
                      <div class="text-primary fw-bold mb-1">{{ flight.flight_number }}</div>
                      <div class="d-flex align-items-center flight-route">
                        <div class="text-center">
                          <div class="fw-bold">{{ flight.source }}</div>
                          <div class="text-muted small">{{ formatTime(flight.departure_time) }}</div>
                        </div>
                        
                        <div class="flight-path mx-3">
                          <div class="flight-line"></div>
                          <div class="flight-icon">
                            <i class="bi bi-airplane-fill"></i>
                          </div>
                        </div>
                        
                        <div class="text-center">
                          <div class="fw-bold">{{ flight.destination }}</div>
                          <div class="text-muted small">{{ formatTime(flight.arrival_time) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flight-details mb-3 mb-lg-0">
                    <div class="badge bg-light text-dark me-2">
                      <i class="bi bi-calendar3 me-1"></i> 
                      {{ formatDate(flight.departure_date) }}
                    </div>
                    <div class="badge bg-light text-dark me-2">
                      <i class="bi bi-clock me-1"></i>
                      2h 15m
                    </div>
                    <div class="badge bg-light text-dark">
                      <i class="bi bi-person me-1"></i>
                      {{ flight.available_seats }} seats
                    </div>
                  </div>
                </div>
                
                <div class="col-lg-4 text-lg-end">
                  <div class="d-flex flex-column align-items-lg-end">
                    <div class="price-tag mb-3">
                      <div class="small text-muted">Price per person</div>
                      <div class="fs-3 fw-bold text-primary">${{ flight.price }}</div>
                    </div>
                    
                    <router-link :to="`/booking/${flight.id}`" class="btn btn-primary px-4">
                      <i class="bi bi-ticket-detailed me-2"></i> Select
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No Results Message -->
      <div v-else-if="searchPerformed && !flightStore.isLoading" class="card shadow-sm">
        <div class="card-body py-5 text-center">
          <i class="bi bi-exclamation-circle text-muted" style="font-size: 3rem;"></i>
          <h3 class="h4 mt-3">No Flights Found</h3>
          <p class="text-muted">We couldn't find any flights matching your search criteria.</p>
          <p class="mb-4">Please try different dates or destinations.</p>
          <button @click="resetSearch" class="btn btn-outline-primary px-4">Reset Search</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useFlightStore } from '../stores/flights';
  
  const route = useRoute();
  const flightStore = useFlightStore();
  
  const searchParams = ref({
    source: route.query.source || '',
    destination: route.query.destination || '',
    date: route.query.date || ''
  });
  
  const searchPerformed = ref(false);
  
  // Get flights from store
  const flights = computed(() => flightStore.flights);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time
  const formatTime = (timeString) => {
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  };
  
  // Search for flights
  const handleSearch = async () => {
    await flightStore.fetchFlights(searchParams.value);
    searchPerformed.value = true;
  };
  
  // Reset search form
  const resetSearch = () => {
    searchParams.value = {
      source: '',
      destination: '',
      date: ''
    };
  };
  
  // On component mount, check for query params and search
  onMounted(async () => {
    // If we have query params, perform search
    if (route.query.source || route.query.destination || route.query.date) {
      searchParams.value = {
        source: route.query.source || '',
        destination: route.query.destination || '',
        date: route.query.date || ''
      };
      await handleSearch();
    } else {
      // Otherwise just load all flights
      await flightStore.fetchFlights();
      searchPerformed.value = true;
    }
  });
  </script>
  
  <style scoped>
  .page-header {
    background-color: rgba(0, 102, 204, 0.05);
    border-left: 4px solid var(--primary-color);
  }
  
  .flight-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .flight-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .flight-badge {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 102, 204, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--primary-color);
  }
  
  .flight-route {
    position: relative;
  }
  
  .flight-path {
    position: relative;
    width: 100px;
  }
  
  .flight-line {
    height: 2px;
    background-color: #dee2e6;
    width: 100%;
    position: relative;
    top: 10px;
  }
  
  .flight-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-color);
    font-size: 14px;
  }
  
  .price-tag {
    background-color: rgba(0, 102, 204, 0.05);
    padding: 10px 15px;
    border-radius: 8px;
  }
  </style>