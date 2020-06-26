'use strict'

import PUtils from '@/lib/poppy-utils'

import store from '@/lib/store'

const mixin = {
  data: _ => ({ mdata: store.mdata }),
  props: { motors: { type: Array, default: _ => PUtils.allMotorIds } },
  methods: {
    getRegister (motor, register, data = 'current') {
      return data === 'current'
        ? this.mdata[motor][register].current
        : this.mdata[motor][register].data
    }
  }
}

export default mixin
