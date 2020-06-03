import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.backgroundColor = 'green';
  }
});

Vue.directive('highlight2', {
  bind(el, binding, vnode) {
    el.style.backgroundColor = binding.value;
  }
});

Vue.directive('highlight3', {
  bind(el, binding, vnode) {
    if(binding.arg == 'background'){
      el.style.backgroundColor = binding.value;
    }else{
      el.style.color = binding.value;
    }
  }
});

Vue.directive('highlight4', {
  bind(el, binding, vnode) {
    let delay = 0;
    if(binding.modifiers['delayed']){
      delay = 3000;
    }
    setTimeout(() => {
      if(binding.arg == 'background'){
        el.style.backgroundColor = binding.value;
      }else{
        el.style.color = binding.value;
      }
    },delay);
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
