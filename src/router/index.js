import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WeatherDetails from '../views/WeatherDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:name',
    name: 'WeatherDetails',
    component: WeatherDetails,
    props: true
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
