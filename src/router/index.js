import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import '../assets/css/global.css'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(VueRouter)
import home from '../components/home.vue'


// const routes = [
//   {path:'/', redirect:'/login'},
//   { path:'/login',component:Login},
//   {path:'/home', component:home}
// ]

const router = new VueRouter({
  routes:[
    {path:'/', redirect:'/login'},
    {path:'/login',component:Login},
    {path:'/home', component:home}
  ]
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next();
  const tokenstr = window.sessionStorage.getItem('token');
  if(!tokenstr) return next('/login');
  next();
})


export default router
