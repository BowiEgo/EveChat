import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'login',
      component: require('@/pages/Login').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/pages/Home').default
    },
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    }
  ]
})
