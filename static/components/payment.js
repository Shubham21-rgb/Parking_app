
export default {
  template: `
<div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
  <n></n>
  <div class="card shadow-lg border-0 rounded-4" style="width: 450px;">
    <div class="card-header bg-success text-white text-center rounded-top-4 py-3">
      <h4 class="mb-0">Payment Gateway</h4>
    </div>
    <div class="card-body p-4 text-center">
      <h5>Booking: {{ lot.prime_location_name }}</h5>
      <p class="text-muted mb-4">Price/hour: ₹{{ lot.price_per_hour }}</p>

      <div class="d-grid gap-2 mb-3">
        <button class="btn btn-primary btn-lg" @click="makePayment('upi')">
          <i class="bi bi-upc-scan me-2"></i> Pay via UPI
        </button>
        <button class="btn btn-outline-primary btn-lg" @click="makePayment('card')">
          <i class="bi bi-credit-card me-2"></i> Pay via Card
        </button>
      </div>

      <div v-if="message" class="alert alert-info mt-3">{{ message }}</div>
    </div>
  </div>
</div>
`,
  data() {
    return {
      lot: {},
      message: ""
    }
  },
  mounted() {
    const storedLot = localStorage.getItem("selected_lot");
    if (storedLot) this.lot = JSON.parse(storedLot);
  },
  methods: {
    makePayment(method) {
      const bodyData = {
        lot_id: this.lot.id,
        payment_method: method
      };
      fetch('/api/user/book', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": localStorage.getItem("auth_token")
        },
        body: JSON.stringify(bodyData)
      })
      .then(r => r.json())
      .then(data => {
        this.message = data.message;
        if (data.status === 'success') {
          setTimeout(() => this.$router.push('/dashboard'), 1500);
        }
      });
    }
  }
}
