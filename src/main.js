import Vue from 'vue'
import App from './App.vue'
import router from './router';
import http from '@/untils/api'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
