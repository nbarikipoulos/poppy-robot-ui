<template lang="pug">
    b-tooltip(label="moving speed" :active="showTooltip")
      span(class="vcenter")
        ext-b-icon(v-if="showIcon" pack="fas" icon="tachometer-alt")
        span(v-if="showValue") {{ value }}
</template>

<script>
'use strict'

import register from '@/mixins/register'

export default {
  name: 'Speed',
  mixins: [register],
  props: {
    value: { type: Number, default: NaN }
  }
}
</script>
