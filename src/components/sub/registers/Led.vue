<template lang="pug">
  b-tooltip(:label="label" :active="showTooltip")
    ext-b-icon(:value="value" :state="state")
</template>

<script>
'use strict'

import register from '@/mixins/register'

export default {
  name: 'Led',
  mixins: [register],
  props: {
    value: String,
    off: { type: String, default: 'is-primary' }
  },
  computed: {
    label () {
      return (this.value === 'off' ? 'LED off' : this.value) || `LED: ${this.invalid}`
    },
    state () {
      const offType = this.off
      return (value, old) => {
        let result
        switch (value) {
          case undefined: result = {}; break
          case 'off': result = { pack: 'fas', icon: 'minus', type: offType }; break
          default: result = { pack: 'fa', icon: 'lightbulb', type: `is-${value}` }
        }
        return result
      }
    }
  }
}
</script>
