import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SingleCityPage from '../views/SingleCityPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:name',
    name: 'SingleCityPage',
    component: SingleCityPage,
    props: true
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
