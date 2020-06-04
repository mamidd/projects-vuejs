import Vue from 'vue'
import App from './App.vue'

Vue.mixin({
  created(){
    console.log('GlobalMixin')
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
