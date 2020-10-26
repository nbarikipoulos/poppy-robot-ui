'use strict'

const mixin = {
  data: _ => ({ invalid: '???' }),
  props: {
    showIcon: { type: Boolean, default: true },
    showValue: { type: Boolean, default: true },
    showTooltip: { type: Boolean, default: true }
  },
  computed: {
    isValid () {
      let result
      switch (typeof this.value) {
        case undefined: result = false; break
        case 'number': result = !isNaN(this.value); break
        default: result = true
      }
      return result
    }
  }
}

export default mixin
