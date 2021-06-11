import Vue from 'vue'
import VueRouter from 'vue-router'
import ConvertAgent from '../components/ConvertAgent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ConvertAgent',
    component: ConvertAgent
  },
  {
    path: '/comand',
    name: 'CreateComandAgent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/CreateComandAgent.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
