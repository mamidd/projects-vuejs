import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store'

Vue.use(Vuelidate);

axios.defaults.baseURL = 'https://vue-axios-8774c.firebaseio.com'
axios.defaults.headers.common['Authorization'] = 'something'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqInterceptor = axios.interceptors.request.use( req => {
  console.log('Request intercept', req);
  return req;
})

const resInterceptor = axios.interceptors.response.use ( res => {
  console.log('Response intercept', res);
  return res;
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
