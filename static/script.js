import Home from './components/Home.js' 
import Login from './components/Login.js' 
import Register from './components/Register.js' 
import Navbar from './components/Navbar.js' 
import Footer from './components/Footer.js' 
//import pregister from './components/pregister.js'
import dashboard from './components/dashboard.js'
/*import update from './components/update.js'
import admin from './components/admin.js'
import trans from './components/trans.js'
import pdashboard from './components/pdashboard.js'
import paccept from './components/paccept.js'
import preject from './components/preject.js'
import pdelete from './components/pdelete.js'
import pay from './components/pay.js'
import complete from './components/complete.js'
import close from './components/close.js'
import cancel from './components/cancel.js'
import timeupdate from './components/timeupdate.js'
import verification from './components/verfication.js'
import cverify from './components/cverify.js'
import pverify from './components/pverify.js'
import cblock from './components/cblock.js'
import pblock from './components/pblock.js'
import cunblock from './components/cunblock.js'
import punblock from './components/punblock.js'
import acomplete from './components/acomplete.js'
import aclose from './components/aclose.js'
import adelete from './components/adelete.js'
import aupdate from './components/aupdate.js'
import adminaccept from './components/adminaccept.js'
import adminreject from './components/adminreject.js'
import profprofile from './components/profprofile.js'
import customerprof from './components/customerprof.js'
import admindelserv from './components/admindelserv.js'
import adminserviceupdate from './components/adminserviceupdate.js'
import admindelservices from './components/admindelservices.js'
import rate from './components/rate.js'
import ratemanagement from './components/ratemanagement.js'
import professionalserviceadd from './components/professionalserviceadd.js'
import adminsearch from './components/adminsearch.js'
import customersearch from './components/customersearch.js'
import adminsummary from './components/adminsummary.js'
import customersummary from './components/customersummary.js'*/

const routes=[
    {path: '/',component: Home},
    {path:'/dashboard',component:dashboard},
    {path: '/login',component: Login},
    {path:'/register',component: Register}
    

]
const router=new VueRouter({
    routes

})
const app = new Vue({
    el:"#app",
    router,
    template:`
    <div class="container">Welcome To Our Portal from Developer
    <router-view></router-view>
    <foot></foot>
    </div>
    `,
    data:{
        section:"frontend"
    },
    components:{
        "nav-bar":Navbar,
        "foot":Footer
    }
})

/*
    {path: '/register',component: Register},
    {path:'/pregister',component:pregister},
    {path:'/show/:id',name:'show',component:trans},
    {path:'/pdashboard',component:pdashboard},
    {path:'/paccept/:id',name:'paccept',component:paccept},
    {path:'/preject/:id',name:'preject',component:preject},
    {path:'/pdelete/:id',name:'pdelete',component:pdelete},
    {path:'/cpay/:id',name:'cpay',component:pay},
    {path:'/complete/:id',name:'complete',component:complete},
    {path:'/close/:id',name:'close',component:close},
    {path:'/cancel/:id',name:'cancel',component:cancel},
    {path:'/tupdates/:id',name:'tupdate',component:timeupdate},
    {path:'/update/:id',name:'update',component:update},
    {path:'/cverify/:id',name:'verify',component:cverify},
    {path:'/pverify/:id',name:'verify1',component:pverify},
    {path:'/pblock/:id',name:'pblock',component:pblock},
    {path:'/cblock/:id',name:'cblock',component:cblock},
    {path:'/cunblock/:id',name:'cunblock',component:cunblock},
    {path:'/punblock/:id',name:'punblock',component:punblock},
    {path:'/acomplete/:id',name:'acomplete',component:acomplete},
    {path:'/aclose/:id',name:'aclose',component:aclose},
    {path:'/adelete/:id',name:'adelete',component:adelete},
    {path:'/aupdate/:id',name:'aupdate',component:aupdate},
    {path:'/adminaccept/:id',name:'adminaccept',component:adminaccept},
    {path:'/adminreject/:id',name:'adminreject',component:adminreject},
    {path:'/profprofile/:id',name:'pprofile',component:profprofile},
    {path:'/crofprofile/:id',name:'cprofile',component:customerprof},
    {path:'/adminserviceupdate/:id',name:'adminserv',component:adminserviceupdate},
    {path:'/adminservicedelete/:id',name:'admindelservice',component:admindelservices},
    {path:'/professionalservcreate/:id',name:'professionalsercreate',component:professionalserviceadd},
    {path:'/rate/:id',name:'cusrate',component:rate},
    {path:'/verify',component:verification},
    {path:'/adminratemanage/:id',name:'adminrate',component:ratemanagement},
    {path:'/admin',component:admin},
    {path:'/adminupdate',component:admindelserv},
    {path:'/adminsearchin',component:adminsearch},
    {path:'/customersearch',component:customersearch},
    {path:'/adminsummary',component:adminsummary},
    {path:'/cussummary',component:customersummary}
*/ 