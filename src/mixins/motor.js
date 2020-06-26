'use strict'

import store from '@/lib/store'
import PUtils from '@/lib/poppy-utils'

const mixin = {
  props: { motor: String },
  computed: {
    mmdata () { return store.mdata[this.motor] },
    descriptor () { return PUtils.getMotorDescriptor(this.motor) }
  },
  methods: {
    getRegister (register, data = 'current') {
      return data === 'current'
        ? this.mmdata[register].current
        : this.mmdata[register].data
    }
  }
}

export default mixin
