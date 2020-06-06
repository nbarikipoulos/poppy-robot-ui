<template lang="pug">
  div(class="box has-text-primary")
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
import Compliant from '@/components/sub/registers/Compliant'
import Position from '@/components/sub/registers/Position'
import Speed from '@/components/sub/registers/Speed'
import Temperature from '@/components/sub/registers/Temperature'
import Led from '@/components/sub/registers/Led'

import { sparkLine } from '@/lib/charts/options'

export default {
  name: 'MotorPanel',
  mixins: [motor],
  components: { PolarPositionsChart, Compliant, Speed, Position, Temperature, Led },
  data: _ => ({ chartOptions: sparkLine }),
  props: { maxHeight: { type: String, default: '300px' } }
}
</script>
