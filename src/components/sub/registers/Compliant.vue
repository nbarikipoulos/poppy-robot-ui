<template lang="pug">
    b-tooltip(:label="label" :active="tooltip")
      ext-b-icon(:value="value" :state="state")
</template>

<script>
'use strict'
import icons from '@/lib/utils/icons'

export default {
  name: 'Compliant',
  data: _ => ({ state: icons.compliant }),
  props: {
    value: { type: Boolean },
    tooltip: { type: Boolean, default: true }
  },
  computed: {
    label: function () {
      const state = this.value ? 'compliant' : 'stiff'
      return `state: ${state}`
    }
  }
}
</script>
