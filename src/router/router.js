'use strict'

import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App.vue'
import Connect from '@/components/Connect.vue'

import Home from '@/components/Home.vue'

import store from '@/lib/store'

Vue.use(Router)

const ifNotConnected = (to, from, next) => {
  if (!store.connected) {
    next('/connect')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: '', component: Home }
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
