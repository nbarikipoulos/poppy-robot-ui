<template lang="pug">
  div(class="box has-text-primary has-text-weight-semibold")
    div(
      class="columns has-text-primary is-mobile"
    )
      div(class="column is-narrow")
        span(class="has-text-weight-bold") {{ motor }}
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
      div(class="column has-text-right")
        temperature(:value="getRegister('present_temperature')")
        led(:value="getRegister('led')")
    div(class=" has-text-primary")
      polar-positions-chart(
        :motors="[this.motor]"
        :styles="{ position: 'relative', 'max-height': this.maxHeight }"
      )
</template>

<script>
'use strict'

import motor from '@/mixins/motor'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'
import * as RegisterComponents from '@/components/sub/registers/index'
import { sparkLine } from '@/lib/charts/options'

export default {
  name: 'MotorPanel',
  mixins: [motor],
  components: { PolarPositionsChart, ...RegisterComponents },
  data: _ => ({ chartOptions: sparkLine }),
  props: { maxHeight: { type: String, default: '300px' } }
}
</script>
