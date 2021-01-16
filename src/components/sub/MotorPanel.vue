<template lang="pug">
  div(class="has-text-primary has-text-weight-semibold")
    div(
      class="columns has-text-white is-multiline is-mobile has-background-primary has-text-left-mobile"
    )
      div(class="column is-narrow")
        motor-info(:motor="motor")
      div(class="column is-narrow has-text-left")
        compliant(
          :clazz="['has-background-primary']"
          :motor="motor"
        )
      div(class="column is-narrow")
        speed(
          :clazz="['has-text-white']"
          :motor="motor"
          showIcon
        )
      div(class="column is-narrow")
        position(
          :clazz="['has-text-white']"
          :motor="motor"
          showIcon
        )
      //- Dummy "spacer"
      div(class="column")
      div(class="column is-narrow")
        temperature(:motor="motor" showIcon)
      div(class="column is-narrow")
        led(
          :clazz="['has-background-primary']"
          :motor="motor"
          off="is-white"
        )
    div(class="has-text-primary")
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
  props: { maxHeight: { type: String, default: '300px' } },
  computed: { range () { return PUtils.getAngleRange(...PUtils.allMotorIds) } }
}
</script>
