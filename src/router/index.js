import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
   {
    path: '/',
    redirect: '/login',
      name: 'login',
  component: () => import('@/views/login/index.vue')
  },
   {
    path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}

]

const router = new VueRouter({
  routes
})

export default router
