import Navbar from "./Navbar.js"
export default{
    components:{
        'n':Navbar,
    },
    template:`
    <div class="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
  <!-- Header Section -->
  <div class="text-center mb-5">
    <h1 class="display-4 fw-bold text-primary">SmartPark</h1>
    <p class="lead text-secondary">
      Find, Book, and Park with Ease — Smart Parking for Smart Cities.
    </p>
  </div>

  <!-- Image Section -->
  <div class="card shadow-lg border-0" style="max-width: 650px;">
    <img src="static/pic1.png" class="card-img-top rounded-top" alt="Parking Illustration">

    <div class="card-body text-center">
      <h5 class="card-title mb-3">Seamless Parking Experience</h5>
      <p class="card-text text-muted">
        Reserve your parking space instantly and avoid the hassle of searching for parking spots.
      </p>

      <!-- Buttons -->
      <div class="d-flex justify-content-center gap-3 mt-4">
        <router-link class="btn btn-primary px-4" to="/login">Login</router-link>
        <router-link class="btn btn-outline-primary px-4" to="/register">Register as User</router-link>
        <router-link class="btn btn-outline-success px-4" to="/pro-register">Register as Professional</router-link>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="text-center mt-5 text-muted small">
    © 2025 SmartPark. All rights reserved.
  </footer>
</div>
`
}