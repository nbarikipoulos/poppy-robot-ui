'use strict'

import PUtils from '@/lib/poppy-utils'

import store from '@/lib/store'

const mixin = {
  data: _ => ({ mdata: store.mdata }),
  props: { motors: { type: Array, default: _ => PUtils.allMotorIds } },
  methods: {
    getRegister (
      register,
      { type = 'array', data = 'current' } = {}
    ) {
      const p = data === 'current' ? 'current' : 'data'

      const res = this.motors.reduce((acc, m) => {
        acc[m] = this.mdata[m][register][p]
        return acc
      }, {})

      return type === 'array' ? Object.values(res) : res
    }
  }
}

export default mixin
