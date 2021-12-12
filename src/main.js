import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

axios.interceptors.request.use(
  config =>{
    let token = window.sessionStorage.getItem('token')
    if(token){
        //这里面获取的请求头的键(tokenHeader)根据每个后端的习惯封装的名称各不相同  
      config.headers.common['Token'] = token
    }
    return config
  }, error =>{
    return Promise.reject(error)
  }
)