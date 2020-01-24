'use strict'

import Vue from 'vue'
import Buefy from 'buefy'

import router from '@/router/router'

import App from '@/App.vue'

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
