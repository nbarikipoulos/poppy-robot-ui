<template lang="pug">
    b-tooltip(:label="label" :active="tooltip")
      ext-b-icon(:value="value" :state="state")
</template>

<script>
'use strict'
import icons from '@/lib/utils/icons'

export default {
  name: 'Led',
  data: _ => ({ state: icons.led }),
  props: {
    value: { type: String },
    tooltip: { type: Boolean, default: true }
  },
  computed: {
    label: function () {
      return this.value === 'off' ? 'LED off' : this.value
    }
  }
}
</script>
