<template lang="pug">
  div
    b-tooltip(:label="toolTipText")
      ext-b-icon(v-bind="T.icon" :type="`is-${this.T.color}`")
</template>

<script>
'use strict'

import motors from '@/mixins/motors'
import T from '@/lib/utils/tBranding'

export default {
  name: 'TemperatureMax',
  mixins: [motors],
  computed: {
    T () { return T(this.tMax) },
    tMax () {
      return Math.max(
        ...Object.values(this.getRegister('present_temperature'))
      )
    },
    toolTipText () { return `Tmax: ${this.T.level} (${this.tMax}°C)` }

  }
}
</script>
