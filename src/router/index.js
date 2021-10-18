import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '~views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/Home'),

        // or
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        //   import(/* webpackChunkName: "about" */ '../views/About.vue'),

        meta: {
          title: 'Home'
        }
      },

      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/Contact'),
        meta: {
          title: 'contact'
        }
      },

      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import('@/views/UserCenter'),
        meta: {
          title: 'userCenter'
        }
      }
    ]
  },

  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('@/views/SignUp')
  },
  {
    path: '/logIn',
    name: 'LogIn',
    component: () => import('@/views/LogIn')
  },
  {
    path: '/runCampaign',
    name: 'RunCampaign',
    component: () => import('@/views/RunCampaign')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('@/views/Support')
  },
  {
    path: '/offerList',
    name: 'OfferList',
    component: () => import('@/views/OfferList')
  },
  {
    path: '/balanceHistory',
    name: 'BalanceHistory',
    component: () => import('@/views/BalanceHistory'),
    meta: {
      title: 'balanceHistory'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
