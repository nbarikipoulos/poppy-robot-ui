'use strict'

import store from '@/lib/store'
import PUtils from '@/lib/poppy-utils'

const mixin = {
  props: { motor: String },
  computed: {
    mmdata () { return store.mdata[this.motor] },
    range () { return PUtils.getAngleRange(this.motor) },
    descriptor () { return PUtils.getMotorDescriptor(this.motor) }
  },
  methods: {
    getRegister (register, data = 'current') {
      const p = data === 'current' ? 'current' : 'data'
      return this.mmdata[register][p]
    }
  }
}

export default mixin
