'use strict'

import motor from '@/mixins/motor'
import PUtils from '@/lib/poppy-utils'

const mixin = {
  mixins: [motor],
  data: _ => ({
    input: undefined, // v-model for user's input
    wait: false, // avoid to override user's value with query before
    isUpdatable: true,
    register: undefined
  }),
  props: {
    showIcon: { type: Boolean, default: false },
    showTooltip: { type: Boolean, default: true },
    control: { type: Boolean, default: true }
  },
  computed: {
    regValue () {
      const value = this.getRegister(this.register)
      return isNaN(parseFloat(value)) ? value : Math.round(value)
    },
    command () { // Return the script function name
      let result
      switch (this.register) {
        case 'present_position': result = 'position'; break
        case 'moving_speed': result = 'speed'; break
        default: result = this.register
      }

      return result
    },
    valueToDisplay () {
      const v = this.control ? this.input : this.regValue
      return this.isValid(v) ? v : '---'
    }
  },
  watch: {
    control (value) {
      if (value) {
        this.input = this.regValue
      }
    },
    regValue (value) {
      if (this.control && !this.wait && this.isValid(value) && this.isUpdatable) {
        this.input = value
      }
    },
    input (value) {
      if (value !== this.regValue && this.isValid(value)) {
        this.setRegister(value)
      }
    }
  },
  methods: {
    isValid (value) {
      let result
      switch (typeof value) {
        case undefined: result = false; break
        case 'number': result = !Number.isNaN(value); break
        default: result = true
      }
      return result
    },
    async setRegister (value) {
      this.wait = true
      await PUtils.execute(this.command, [this.motor], value)
      setTimeout(_ => { this.wait = false }, 333)
    }
  },
  mounted () {
    if (this.control) {
      this.input = this.regValue
    }
  }
}

export default mixin
