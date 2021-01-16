<template lang="pug">
  div
    b-tooltip(:label="toolTipText" :active="showTooltip")
      div(class="vcenter")
        ext-b-icon(
          v-if="showIcon"
          v-bind="T.icon"
          :type="`is-${this.T.color}`"
        )
        span(:class="labelClass") {{ valueToDisplay }}°C
</template>

<script>
'use strict'

import register from '@/mixins/register'
import T from '@/lib/utils/tBranding'

export default {
  name: 'Temperature',
  mixins: [register],
  data: _ => ({ register: 'present_temperature' }),
  props: {
    labelType: {
      type: String,
      validator (value) { return ['tag', 'text', 'none'].includes(value) },
      default: 'text'
    }
  },
  computed: {
    T () { return T(this.regValue) },
    toolTipText () { return `temp.: ${this.T.level}` },
    labelClass () {
      switch (this.labelType) {
        case 'tag': return `tag is-${this.T.color}`
        case 'text':
        default: return `has-text-${this.T.color}`
      }
    }
  }
}
</script>
