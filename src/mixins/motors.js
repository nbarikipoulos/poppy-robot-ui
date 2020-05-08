'use strict'

import PUtils from '@/lib/poppy-utils'

import store from '@/lib/store'

const mixin = {
  data: _ => ({ mdata: store.mdata }),
  props: { motors: { type: Array, default: _ => PUtils.allMotorIds } },
  methods: {
    getRegisterValue: function (motor, register) {
      return this.mdata[motor][register].current
    }
  }
}

export default mixin
