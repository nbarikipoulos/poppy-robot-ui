'use strict'

import store from '@/lib/store'
import PUtils from '@/lib/poppy-utils'

const mixin = {
  props: { motor: String },
  computed: {
    mmdata: function () { return store.mdata[this.motor] },
    descriptor: function () { return PUtils.getMotorDescriptor(this.motor) }
  },
  methods: {
    getRegisterValue: function (register) {
      return this.mmdata[register].current
    }
  }
}

export default mixin
