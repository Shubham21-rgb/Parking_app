import cusnav from "./cusnav.js"
export default {
  components: {
    'n': cusnav
  },
  template: `
<div class="container py-4">
  <n></n>

  <div class="mb-4 text-center">
    <h2 class="fw-bold text-primary">User Dashboard</h2>
    <p class="text-muted">Manage all your parking reservations.</p>
  </div>

  <!-- Message -->
  <div v-if="message" class="alert alert-info text-center">{{ message }}</div>

  <!-- ACTIVE RESERVATIONS -->
  <div v-if="activeReservations.length" class="mb-5">
    <h4 class="fw-bold text-success mb-3">Active Reservations</h4>
    <div class="row">
      <div v-for="res in activeReservations" :key="res.id" class="col-md-6 mb-3">
        <div class="card shadow-sm border-success rounded-4">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">{{ res.lot_name }}</h5>
          </div>
          <div class="card-body">
            <p><strong>Spot:</strong> {{ res.spot_number }}</p>
            <p><strong>Start:</strong> {{ res.parking_timestamp }}</p>
            <p><strong>Status:</strong> {{ res.booking_status }}</p>
            <p><strong>Payment:</strong> {{ res.payment_status }}</p>

            <button class="btn btn-danger w-100 mt-2" @click="releaseSpot(res.id)">
              <i class="bi bi-x-circle me-2"></i> Release Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- AVAILABLE PARKING LOTS -->
  <h4 class="fw-bold text-primary mb-3">Available Parking Lots</h4>
  <div class="row">
    <div v-for="lot in lots" :key="lot.id" class="col-md-6 mb-4">
      <div class="card shadow-sm rounded-4">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">{{ lot.prime_location_name }}</h5>
        </div>
        <div class="card-body">
          <p><strong>Address:</strong> {{ lot.address }}, {{ lot.city }}</p>
          <p><strong>Price/hour:</strong> ₹{{ lot.price_per_hour }}</p>
          <p><strong>Available Spots:</strong> {{ lot.available_spots }}</p>

          <button class="btn btn-success w-100 mt-2"
                  :disabled="lot.available_spots === 0"
                  @click="proceedToPayment(lot)">
            <i class="bi bi-cash-coin me-2"></i> Book Spot (Pay)
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- HISTORY -->
  <hr class="my-5">
  <h4 class="fw-bold text-secondary">Reservation History</h4>
  <table class="table table-bordered mt-3">
    <thead class="table-light">
      <tr>
        <th>Lot</th>
        <th>Spot</th>
        <th>Start</th>
        <th>End</th>
        <th>Status</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in history" :key="r.id">
        <td>{{ r.lot_name }}</td>
        <td>{{ r.spot_number }}</td>
        <td>{{ r.parking_timestamp }}</td>
        <td>{{ r.leaving_timestamp || '-' }}</td>
        <td>{{ r.booking_status }}</td>
        <td>{{ r.payment_status }}</td>
      </tr>
    </tbody>
  </table>

</div>
`,
  data() {
    return {
      lots: [],
      activeReservations: [],
      history: [],
      message: ""
    };
  },
  mounted() {
    this.fetchLots();
    this.fetchReservations();
  },
  methods: {
    fetchLots() {
      fetch('/api/user/parking-lots', {
        headers: { "Authentication-Token": localStorage.getItem("auth_token") }
      })
      .then(r => r.json())
      .then(data => {
        this.lots = data.lots || [];
      });
    },

    fetchReservations() {
      fetch('/api/user/reservations', {
        headers: { "Authentication-Token": localStorage.getItem("auth_token") }
      })
      .then(r => r.json())
      .then(data => {
        this.activeReservations = data.active || [];
        this.history = data.history || [];
      });
    },

    proceedToPayment(lot) {
      localStorage.setItem("selected_lot", JSON.stringify(lot));
      this.$router.push('/payment');
    },

    releaseSpot(reservation_id) {
      fetch('/api/user/release', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("auth_token")
        },
        body: JSON.stringify({ reservation_id })
      })
      .then(r => r.json())
      .then(data => {
        this.message = data.message;
        this.fetchLots();
        this.fetchReservations();
      });
    }
  }
}