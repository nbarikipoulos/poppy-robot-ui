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
    value: { type: String, default: 'off' },
    off: { type: String, default: 'is-primary' }
  },
  computed: {
    label () {
      return this.value === 'off' ? 'LED off' : this.value
    },
    state () {
      const offType = this.off
      return (value, old) => ({
        pack: value === 'off' ? 'fas' : 'fa',
        icon: value === 'off' ? 'minus' : 'lightbulb',
        type: value === 'off' ? offType : `is-${value}`
      })
    }
  }
}
</script>
