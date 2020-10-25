<template lang="pug">
  span(class="vcenter")
    b-tooltip(:label="label" :active="showTooltip")
      ext-b-icon(v-if="showIcon" pack="fas" icon="crosshairs")
    span(v-if="showValue") {{ v }}
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
    v () { return this.isValid ? Math.round(this.value) : this.invalid },
    label () {
      return `range: [${Math.round(this.lower_limit)}/${Math.round(this.upper_limit)}]`
    }
  }
}
</script>
