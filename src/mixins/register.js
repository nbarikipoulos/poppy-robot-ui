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
        case 'string': result = this.value !== undefined; break
        case 'number': result = this.value !== undefined && !isNaN(this.value); break
        default: result = this.value !== undefined
      }
      return result
    }
  }
}

export default mixin
