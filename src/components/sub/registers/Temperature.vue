<template lang="pug">
    b-tooltip(:label="toolTipTxt" :active="tooltip")
      ext-b-icon(v-if="showIcon" :value="value" :state="state")
      span(v-if="showValue" :class="labelClass") {{ value }}
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
    text: {
      type: String,
      validator: function (value) {
        return ['tag', 'text'].indexOf(value) !== -1
      },
      default: 'text'
    }
  },
  computed: {
    T: function () { return T(this.value) },
    toolTipTxt: function () { return `temp.: ${this.T.level}` },
    labelClass: function () {
      switch (this.text) {
        case 'tag': return `tag is-${T.color}`
        case 'text':
        default: return `has-text-${T.color}`
      }
    }
  }
}
</script>
