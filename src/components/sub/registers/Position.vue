<template lang="pug">
    b-tooltip(:label="label" :active="showTooltip")
      ext-b-icon(v-if="showIcon" pack="fas" icon="crosshairs")
      span(v-if="showValue") {{ Math.round(value) }}
</template>

<script>
'use strict'

import register from '@/mixins/register'

export default {
  name: 'Position',
  mixins: [register],
  props: {
    value: { type: Number, default: NaN },
    lower_limit: { type: Number },
    upper_limit: { type: Number }
  },
  computed: {
    label () {
      return `range: [${Math.round(this.lower_limit)}/${Math.round(this.upper_limit)}]`
    }
  }
}
</script>
