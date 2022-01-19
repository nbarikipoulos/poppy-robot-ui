<template lang="pug">
  div(class="has-text-weight-semibold")
    div(
      class="columns is-multiline is-mobile has-text-left-mobile mx-0 my-0"
      :class="invert"
    )
      div(class="column is-narrow")
        motor-info(:motor="motor")
      div(class="column is-narrow has-text-left")
        compliant(:clazz="invert" :motor="motor")
      div(class="column is-narrow")
        speed(:clazz="invert" :motor="motor" showIcon)
      div(class="column is-narrow")
        position(:clazz="invert" :motor="motor" showIcon)
      //- Dummy "spacer"
      div(class="column")
      div(class="column is-narrow")
        temperature(:motor="motor" showIcon)
      div(class="column is-narrow")
        led(:clazz="invert" :motor="motor" off="is-white")
    div
      polar-positions-chart(
        :motors="[this.motor]"
        :range="range"
        :styles="{ position: 'relative', 'max-height': this.maxHeight }"
      )
</template>

<script>

import PUtils from '@/lib/poppy-utils'
import motor from '@/mixins/motor'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'
import * as RegisterComponents from '@/components/sub/registers/index'
import MotorInfo from '@/components/sub/MotorInfo'

export default {
  name: 'MotorPanel',
  mixins: [motor],
  components: { PolarPositionsChart, ...RegisterComponents, MotorInfo },
  props: { maxHeight: { type: String, default: '350px' } },
  data: _ => ({ invert: ['has-background-primary', 'has-text-white'] }),
  computed: { range () { return PUtils.getAngleRange(...PUtils.motorNames) } }
}
</script>
