<template lang="pug">
    b-tooltip(:label="label" :active="showTooltip")
      ext-b-icon(v-if="showIcon" :value="value" :state="state")
</template>

<script>
'use strict'

import register from '@/mixins/register'

const state = [
  { value: true, icon: 'bed', pack: 'fas' },
  { value: false, icon: 'bolt', pack: 'fas' }
]

export default {
  name: 'Compliant',
  mixins: [register],
  data: _ => ({ state }),
  props: {
    value: { type: Boolean }
  },
  computed: {
    label: function () {
      const state = this.value ? 'compliant' : 'stiff'
      return `state: ${state}`
    }
  }
}
</script>
