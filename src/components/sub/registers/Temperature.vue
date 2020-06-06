<template lang="pug">
    b-tooltip(:label="label" :active="tooltip")
      ext-b-icon(:value="value" :state="state")
      span(:class="`has-text-${T.color}`") {{ value }}
</template>

<script>
'use strict'
import icons from '@/lib/utils/icons'
import T from '@/lib/utils/tBranding'

export default {
  name: 'Temperature',
  data: _ => ({ state: icons.temperature }),
  props: {
    value: { type: Number },
    tooltip: { type: Boolean, default: true }
  },
  computed: {
    T: function () { return T(this.value) },
    label: function () { return `temp.: ${this.T.level}` }
  }
}
</script>
