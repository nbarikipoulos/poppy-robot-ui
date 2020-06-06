<template lang="pug">
    b-tooltip(label="moving speed" :active="tooltip")
      ext-b-icon(pack="fas" icon="tachometer-alt")
      span {{ value }}
</template>

<script>
'use strict'

export default {
  name: 'Speed',
  props: {
    value: { type: Number },
    tooltip: { type: Boolean, default: true }
  }
}
</script>
