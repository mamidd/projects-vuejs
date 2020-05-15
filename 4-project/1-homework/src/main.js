import Vue from 'vue'
import App from './App.vue'
import Header from './Header.vue'
import ServersManagment from './ServersManagment.vue'
import ServerList from './ServerList.vue'

Vue.component('app-header', Header)
Vue.component('app-servers-managment', ServersManagment)
Vue.component('app-server-list', ServerList)

new Vue({
  el: '#app',
  render: h => h(App)
})
