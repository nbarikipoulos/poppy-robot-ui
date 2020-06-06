<template lang="pug">
    b-tooltip(:label="label" :active="tooltip")
      ext-b-icon(pack="fas" icon="crosshairs")
      span {{ Math.round(value) }}
</template>

<script>
'use strict'

export default {
  name: 'Position',
  props: {
    value: { type: Number },
    lower_limit: { type: Number },
    upper_limit: { type: Number },
    tooltip: { type: Boolean, default: true }
  },
  computed: {
    label: function () {
      return `[${Math.round(this.lower_limit)}/${Math.round(this.upper_limit)}]`
    }
  }
}
</script>
