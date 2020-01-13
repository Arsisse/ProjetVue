import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'

import RestaurantsListe from './components/RestaurantsListe'
import RestaurantDetails from './components/RestaurantDetails.vue'
import RestaurantEvaluation from './components/RestaurantEvaluation.vue'

import "./assets/global.css"

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueMaterial);

const routes = [
  {
    path: '/liste',
    component: RestaurantsListe
  },
  {
    path: '/details',
    component: RestaurantDetails
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.replace('/liste')

Vue.component('restaurant-evaluation', RestaurantEvaluation);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
