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
const Address = ()=>import('./components/views/Address.vue')
const AddressEditor = ()=>import('./components/views/AddressEditor.vue')
Vue.use(VueRouter);
const router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/home',component:Home, name: 'home'
        },
        {
            path:'/find',component:Find, name: 'find'
        },
        {
            path:'/user',component:User, name: 'user'
        },
        {
            path:'/shoplist',component:ShopList, name: 'shopList'
        },
        {
            path:'/login',component:Login, name: 'login'
        },
        {
            path:'/reg',component:Reg, name: 'reg'
        },
        {
            path:'/detail/:id',component:Detail, name: 'detail'
        },
        {
            path:'/search',component:Search, name: 'search'
        },
        {
            path:'/address',component:Address, name: 'Address'
        },
        {
            path:'/address-editor',component:AddressEditor, name: 'AddressEditor'
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