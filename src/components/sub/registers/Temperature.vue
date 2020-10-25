<template lang="pug">
  div
    b-tooltip(:label="toolTipTxt" :active="showTooltip")
      ext-b-icon(v-if="showIcon" :value="value" :state="state")
    span(v-if="showValue" :class="labelClass") {{ v }}
</template>

<script>
'use strict'

import register from '@/mixins/register'
import T from '@/lib/utils/tBranding'

const state = (value, old) => {
  const t = T(value)
  return { ...t.icon, type: `is-${t.color}` }
}

export default {
  name: 'Temperature',
  mixins: [register],
  data: _ => ({ state }),
  props: {
    value: { type: Number, default: NaN },
    labelType: {
      type: String,
      validator (value) {
        return ['tag', 'text', 'none'].indexOf(value) !== -1
      },
      default: 'text'
    }
  },
  computed: {
    T () { return T(this.value) },
    v () { return this.isValid ? this.value : this.invalid },
    toolTipTxt () { return `temp.: ${this.T.level}` },
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
