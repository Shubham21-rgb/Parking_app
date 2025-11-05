import Navbar from "./Navbar.js"
export default{
    components:{
        'n':Navbar,
    },
    template:`
    <div class="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
  <div class="card shadow-lg border-0 rounded-4" style="width: 500px;">
    
    <!-- Header -->
    <div class="card-header bg-success text-white text-center rounded-top-4 py-3">
      <h3 class="mb-0 fw-bold">SmartPark User Registration</h3>
    </div>

    <!-- Body -->
    <div class="card-body p-4">
      <p class="text-center text-muted small mb-4">
        This is the base registration page. You can add more details once you enter your User Dashboard.
      </p>

      <!-- Registration Form -->
      <div class="mb-3">
        <label for="email" class="form-label fw-semibold">Email Address</label>
        <input 
          type="text" 
          id="email" 
          class="form-control" 
          placeholder="Enter your email"
          v-model="formData.email"
        >
      </div>

      <div class="mb-3">
        <label for="username" class="form-label fw-semibold">Create Username</label>
        <input 
          type="text" 
          id="username" 
          class="form-control" 
          placeholder="Username must be unique"
          v-model="formData.username"
        >
      </div>

      <div class="mb-3">
        <label for="password" class="form-label fw-semibold">Create Password</label>
        <input 
          type="password" 
          id="password" 
          class="form-control" 
          placeholder="Enter your password"
          v-model="formData.password"
        >
      </div>

      <!-- Message Display -->
      <div v-if="message" class="alert alert-info py-2 text-center mt-3">
        {{ message }}
      </div>

      <!-- Register Button -->
      <div class="d-grid mt-4">
        <button class="btn btn-success btn-lg" @click="RegisUser">
          <i class="bi bi-person-plus-fill me-2"></i> Register
        </button>
      </div>

      <!-- Divider -->
      <hr class="my-4">

      <!-- Already Registered -->
      <div class="text-center">
        <p class="mb-1 text-muted">Already have an account?</p>
        <router-link to="/login" class="btn btn-outline-success btn-sm px-4">
          Login Here
        </router-link>
      </div>
    </div>
  </div>
</div>
`,
    data: function(){
        return{
            formData:{
                email:"",
                username:"",
                password:""
            },
            message:""
        }
    },
    methods:{
        RegisUser: function(){
            fetch('/api/user_register',{
                method: 'POST',
                headers: {
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(this.formData)

            })
            .then(response => response.json())
            .then(data=>alert(data.message),
                this.$router.push('/login'))
                  
        }
    }
}  

