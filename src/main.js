// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/layout'
import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$http = axios

Vue.use(ElementUI)
// Vue.use(axios,axios.create({
//   headers:{
//     'token':token
//   }
// }))

Vue.config.productionTip = false

axios.interceptors.request.use(function(config){
  // config.headers['Content-Type']='application/json; charset=UTF-8';
  // config.defaults.auth='Bearer '+localStorage.getItem('token')
  return config;
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<layout/>',
  components: { layout }
})
