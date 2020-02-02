'use strict'

import Vue from 'vue'
import Buefy from 'buefy'
import VueApexCharts from 'vue-apexcharts'

import router from '@/router/router'

import App from '@/App.vue'
import MotorChart from '@/components/MotorChart'

Vue.use(Buefy)
Vue.component('apexchart', VueApexCharts)

Vue.component('MotorChart', MotorChart)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
