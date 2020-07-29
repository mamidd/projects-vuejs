import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import { routes } from './routes'
import { store } from './store/store'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-stocktrader-55bd4.firebaseio.com/';

Vue.filter('currency', (value) => {
  return value.toLocaleString() + '€'
})

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
