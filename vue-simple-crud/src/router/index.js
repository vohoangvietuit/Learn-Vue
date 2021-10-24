import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/products',
    name: 'products',
    component: () => import('../components/ProductsList')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/AddProduct')
  }
]

const router = new VueRouter({
  routes
})

export default router
