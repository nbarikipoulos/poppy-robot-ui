'use strict'

import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'
import Connect from '@/components/Connect.vue'

import Control from '@/components/Control.vue'

import store from '@/lib/store'

Vue.use(Router)

const ifNotConnected = (to, from, next) => {
  if (!store.isConnected()) {
    next('/connect')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      { path: '', component: Control },
      { path: 'control', component: Control }
    ],
    beforeEnter: ifNotConnected
  },
  {
    path: '/connect',
    component: Connect
  }
]

export default new Router({
  mode: 'history',
  routes
})
