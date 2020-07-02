import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition;
    }
    if(to.hash){
      return { selector: to.hash}
    }
    return {x:0, y:0}
    //return {x: 0, y:700}; //static scrolling in a fixed position
  }
})

router.beforeEach((to, from, next) => {
  console.log('global beforEach');
  next();
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
