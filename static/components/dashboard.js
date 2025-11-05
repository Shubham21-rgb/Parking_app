import cusnav from "./cusnav.js"
export default{
    components:{
        'n':cusnav
    },
    template:`
    <div>
    <n></n>
    <h2>Welcome {{userData.username}} Customer</h2>
    <div class="row border">
            <div class="text-center"><router-link to="/customersearch" class="btn btn-success"><i class="fas fa-search">----------------------------Search----------------------------</i> </router-link></div>
    </div>
    <div class="row border">
        <div class="col-7 border" style="height: 750px; overflow-y:scroll">
            <h2>Services Available</h2>
            <div v-for="t in service" class="card">
                <div v-if="t.Service_name == 'Household Cleaning'">
                    <p><mark>{{t.Service_name}}</mark></p>
                    <div class="card-body">
                        <h5 class="card-title">Service</h5>
                        <p class="card-text">ID: {{t.id}}</p>
                        <p class="card-text">Time Required: {{t.Time_required}}</p>
                        <p class="card-text">About: {{t.Description}}</p>
                        <p class="card-text">Amount: {{t.amount}} </p>
                        <router-link :to="{name:'show',params:{id: t.id,amount: t.amount,service_name:t.Service_name}}" class="btn btn-success">Select</router-link>
                    </div>
                </div>
                <div v-if="t.Service_name == 'Household Electricals'">
                    <p><mark>{{t.Service_name}}</mark></p>
                    <div class="card-body">
                        <h5 class="card-title">Service</h5>
                        <p class="card-text">ID: {{t.id}}</p>
                        <p class="card-text">Time Required: {{t.Time_required}}</p>
                        <p class="card-text">About: {{t.Description}}</p>
                        <p class="card-text">Amount: {{t.amount}} </p>
                        <router-link :to="{name:'show',params:{id: t.id,amount: t.amount,service_name:t.Service_name}}" class="btn btn-success">Select</router-link>
                    </div>
                </div>
                <div v-if="t.Service_name == 'Household Sanitary'">
                    <p><mark>{{t.Service_name}}</mark></p>
                    <div class="card-body">
                        <h5 class="card-title">Service</h5>
                        <p class="card-text">ID: {{t.id}}</p>
                        <p class="card-text">Time Required: {{t.Time_required}}</p>
                        <p class="card-text">About: {{t.Description}}</p>
                        <p class="card-text">Amount: {{t.amount}} </p>
                        <router-link :to="{name:'show',params:{id:t.id,amount:t.amount,service_name:t.Service_name}}" class="btn btn-success">Select</router-link>
                    </div>
                </div>
                <div v-if="t.Service_name == 'Household Security'">
                    <p><mark>{{t.Service_name}}</mark></p>
                    <div class="card-body">
                        <h5 class="card-title">Service</h5>
                        <p class="card-text">ID: {{t.id}}</p>
                        <p class="card-text">Time Required: {{t.Time_required}}</p>
                        <p class="card-text">About: {{t.Description}}</p>
                        <p class="card-text">Amount: {{t.amount}} </p>
                        <router-link :to="{name:'show',params:{id:t.id,amount:t.amount,service_name:t.Service_name}}" class="btn btn-success">Select</router-link>
                    </div>
                </div>
                <div v-if="t.Service_name == 'Household Garderning'">
                    <p><mark>{{t.Service_name}}</mark></p>
                    <div class="card-body">
                        <h5 class="card-title">Service</h5>
                        <p class="card-text">ID: {{t.id}}</p>
                        <p class="card-text">Time Required: {{t.Time_required}}</p>
                        <p class="card-text">About: {{t.Description}}</p>
                        <p class="card-text">Amount: {{t.amount}} </p>
                        <router-link :to="{name:'show',params:{id:t.id,amount:t.amount,service_name:t.Service_name}}" class="btn btn-success">Select</router-link>
                    </div>
                </div>
            </div>
        </div>
    <div class="col-5 border" style="height: 750px;overflow-y:scroll;overflow-x:scroll">
    <h4>Service History</h4>
        <p>Accepted Services</p>
        <div v-for="t in transactions" v-if="t.status=='Accepted'" class="card mt-2">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Date of Request</th>
                        <th scope="col">Date of completion</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Service ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{{t.customer_id}}</td>
                    <td>{{t.Date_of_Request}}</td>
                    <td>{{t.Date_of_completion}}</td>
                    <td>{{t.amount}}</td>
                    <td>{{t.service_id}}</td>
                    <td>
                        <router-link :to="{name:'cpay',params:{id: t.id,status: t.status}}" class="btn btn-warning">Pay</router-link>
                    </td>
                </tbody>
            </table>
        </div>
        <p>Completed Services</p>
        <div v-for="t in transactions" v-if="t.status=='Completed'" class="card mt-2">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Date of Request</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Service ID</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{{t.customer_id}}</td>
                        <td>{{t.Date_of_Request}}</td>
                        <td>{{t.amount}}</td>
                        <td>{{t.service_id}}</td>
                        <td>
                            <router-link :to="{name:'cusrate',params:{id: t.id}}" class="btn btn-warning">Rate</router-link>
                        </td>
                    </tbody>
                </table>
            </div>
            <p>Pending Services</p>
            <div v-for="t in transactions" v-if="t.status=='Pending'" class="card mt-2">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Date of Request</th>
                            <th scope="col">Date of completion</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Service ID</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{{t.customer_id}}</td>
                        <td>{{t.Date_of_Request}}</td>
                        <td>{{t.Date_of_completion}}</td>
                        <td>{{t.amount}}</td>
                        <td>{{t.service_id}}</td>
                        <td>
                            <router-link :to="{name:'cancel',params:{id: t.id,status: t.status}}" class="btn btn-warning">Cancel</router-link>
                        </td>
                    </tbody>
                </table>
            </div>
            <p>Closed Services</p>
            <div v-for="t in transactions" v-if="t.status=='Closed'" class="card mt-2">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Date of Request</th>
                            <th scope="col">Date of completion</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Service ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{{t.customer_id}}</td>
                        <td>{{t.Date_of_Request}}</td>
                        <td>{{t.Date_of_completion}}</td>
                        <td>{{t.amount}}</td>
                        <td>{{t.service_id}}</td>
                    </tbody>
                </table>
            </div>
            <p>Rejected Services</p>
            <div v-for="t in transactions" v-if="t.status=='Rejected'" class="card mt-2">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Date of Request</th>
                            <th scope="col">Date of completion</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Service ID</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{{t.customer_id}}</td>
                        <td>{{t.Date_of_Request}}</td>
                        <td>{{t.Date_of_completion}}</td>
                        <td>{{t.amount}}</td>
                        <td>{{t.service_id}}</td>
                        <td>
                            <button @click="del" class="btn btn-info btn-sm">Delete</button>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>`,
    data: function(){
        return{
            userData:"",
            transactions:null,
            message:"",
            service:null,
            ser:null
        }
    },
    mounted(){ 
        this.loadTrans()
        this.loadUser()
        this.loadser()
        this.loadsers()
    },
    methods:{
        loadUser(){
            fetch('/api/home',{
                method:'GET',  
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data => this.userData=data)
        },
        loadTrans(){
            fetch('/api/get',{
                method:'GET',
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data =>this.transactions=data)
        },
        loadser(){
            fetch('/api/getser',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data => 
                this.service=data)
        },
        pay(){

        },
        del(){

        },
        loadsers(){
            fetch('/api/getsers',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'

                }
            }).then(response => response.json())
            .then(data => 
                this.ser=data)
        },
        close(){
            
        },
        rate(){

        }
    }                                      
}