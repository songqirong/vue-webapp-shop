import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = ()=>import('./components/views/Home.vue')
// console.log(Home)
const Find = ()=>import('./components/views/Find.vue')
const ShopList = ()=>import('./components/views/ShopList.vue')
const User = ()=>import('./components/views/User.vue')
const Login = ()=>import('./components/views/Login.vue')
const Reg = ()=>import('./components/views/Reg.vue')
const Detail = ()=>import('./components/views/Detail.vue')
const Search = ()=>import('./components/views/Search.vue')
Vue.use(VueRouter);
const router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/home',component:Home
        },
        {
            path:'/find',component:Find
        },
        {
            path:'/user',component:User
        },
        {
            path:'/shoplist',component:ShopList
        },
        {
            path:'/login',component:Login
        },
        {
            path:'/reg',component:Reg
        },
        {
            path:'/detail/:id',component:Detail
        },
        {
            path:'/search',component:Search
        },
        {
            path:'/*',
            redirect:'/home'
        }
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.path=='/user'){
        let token = localStorage.getItem("token")
        if(token){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})
export default router;