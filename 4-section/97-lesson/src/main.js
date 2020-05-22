import Vue from 'vue'
import App from './App.vue'
import home from './Home.vue'

Vue.component('app-servers', home)

new Vue({
  el: '#app',
  render: h => h(App)
})
