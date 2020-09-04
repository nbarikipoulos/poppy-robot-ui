<template lang="pug">
  div(class="has-text-primary has-text-weight-semibold")
    div(
      class="columns has-text-white is-multiline is-mobile has-background-primary has-text-left-mobile"
    )
      div(class="column is-narrow")
        b-tag(
          class="has-text-weight-bold has-text-primary"
          type="is-white"
          size="is-medium"
        ) {{ motor }}
      div(class="column is-narrow has-text-left")
        compliant(:value="getRegister('compliant')")
      div(class="column is-narrow")
        speed(:value="getRegister('moving_speed')")
      div(class="column is-narrow")
        position(
          :value="getRegister('present_position')"
          :lower_limit="descriptor.lower_limit"
          :upper_limit="descriptor.upper_limit"
        )
      //- Dummy "spacer"
      div(class="column")
      div(class="column is-narrow")
        temperature(class="vcenter" :value="getRegister('present_temperature')")
      div(class="column is-narrow")
        led(:value="getRegister('led')" off="is-white")
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

export default {
  name: 'MotorPanel',
  mixins: [motor],
  components: { PolarPositionsChart, ...RegisterComponents },
  data: _ => ({
    range: PUtils.getAngleRange(...PUtils.allMotorIds)
  }),
  props: { maxHeight: { type: String, default: '300px' } }
}
</script>
