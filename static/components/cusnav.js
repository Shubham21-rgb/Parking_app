export default{
    template:`
    <div class="row border">
    <div class="col-9 border fs-1">
        Parking Services
    </div>
    <div class="col-3 border d-flex align-items-center justify-content-between">
        <router-link class="btn btn-primary" to="/cussummary">Summary</router-link>
        <div v-for="t in sot" class="d-inline">
            <router-link class="btn btn-primary" :to="{name:'cprofile',params:{id: t.id}}">Profile</router-link>
        </div>
        <router-link class="btn btn-primary" to="/login">Logout</router-link>
    </div>
</div>`,
    data:function(){
        return{
            ser:null,
            sot:null
        }

    },
    mounted(){
        this.sr()
    },
    methods:{
        sr(){
            fetch('/api/profentryies',{
                method:'GET',
                headers:{
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data=>{
                this.sot=data
                console.log(data)
            })
        }

    }
}