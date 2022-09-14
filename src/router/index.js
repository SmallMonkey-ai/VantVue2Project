import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import('@/views/index')
  },
  {
    path: "/allCharge",
    component: () => import('@/views/allCharge')
  },
  {
    path: "/Complain",
    component: () => import('@/views/complain')
  },
  {
    path: "/extension",
    component: () => import('@/views/extension')
  },
  {
    path: "/finance",
    component: () => import('@/views/finance')
  },
  {
    path: "/plan",
    component: () => import('@/views/plan')
  },
  {
    path: "/sale",
    component: () => import('@/views/sale')
  },
  {
    path: "/yearReport",
    component: () => import('@/views/yearReport')
  },
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.place
VueRouter.prototype.place = function place(location) {
  return originalReplace.call(this, location).catch(err => err)
}
export default router
