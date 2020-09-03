'use strict'

import Vue from 'vue'
import Buefy from 'buefy'

import router from '@/router/router'

import App from '@/App.vue'
import MotorChart from '@/components/sub/MotorChart'
import Icon from '@/components/utils/Icon'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBug,
  faInfoCircle, faColumns,
  faMinus, faLightbulb,
  faGamepad, faCrosshairs, faBed, faBolt, faTachometerAlt,
  faThermometerQuarter, faThermometerThreeQuarters, faThermometerFull
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faLightbulb as farLightbulb
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faBug,
  faInfoCircle, faColumns,
  faMinus, faLightbulb, farLightbulb,
  faGamepad, faCrosshairs, faBed, faBolt, faTachometerAlt,
  faThermometerQuarter, faThermometerThreeQuarters, faThermometerFull
)

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome',
  defaultIconPack: 'fa'
})

Vue.component('font-awesome', FontAwesomeIcon)
Vue.component('MotorChart', MotorChart)
Vue.component('ExtBIcon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
