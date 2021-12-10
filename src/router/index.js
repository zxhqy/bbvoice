import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import '../assets/css/global.css'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8080'
Vue.use(VueRouter)
import home from '../components/home.vue'
import users from '../components/user/users.vue'
import date from '../components/date/date.vue'
import  course from '../components/course/course.vue'



const router = new VueRouter({
  routes:[
    {path:'/', redirect:'/login'},
    {path:'/login',component:Login},
    { path:'/home',
      component:home,
      children : [{path : '/users', component : users},
      {path : '/date', component : date},
      {path : '/course', component : course},
    ]
    },
    
  ]
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next();
  const tokenstr = window.sessionStorage.getItem('token');
  if(!tokenstr) return next('/login');
  next();
})


export default router
