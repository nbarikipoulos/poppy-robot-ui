<template lang="pug">
  b-table(
    :data="data"
    :mobile-cards="false"
    icon-pack="fas"
  )
    //
    // Motor
    //
    b-table-column(label="id" v-bind="cell")
      // Header
      template(v-slot:header="{ column }")
        span {{ column.label }}
      template(v-slot="props")
        // Cell
        span {{ props.row.motor }}
    //
    // Compliant
    //
    b-table-column(custom-key="compliant" v-bind="cell")
      template(v-slot:header="{ column }")
        ext-b-icon(pack="fas" icon="gamepad")
      template(v-slot="props")
        compliant(:value="props.row.compliant")
    //
    // Speed
    //
    b-table-column(custom-key="moving_speed" v-bind="cell")
      template(v-slot:header="{ column }")
        speed(:showValue="false")
      template(v-slot="props")
        speed(
          :value="props.row.moving_speed"
          :showIcon="false"
          :showTooltip="false"
        )
    //
    // Position
    //
    b-table-column(custom-key="present_position" v-bind="cell")
      template(v-slot:header="{ column }")
        position(:showValue="false" :showTooltip="false")
      template(v-slot="props")
        div(class="columns")
          div(class="column is-2-tablet is-narrow-mobile has-text-centered")
            position(
              :value="props.row.present_position"
              :lower_limit="getMotorDescriptor(props.row.motor).lower_limit"
              :upper_limit="getMotorDescriptor(props.row.motor).upper_limit"
              :showIcon="false"
            )
          motor-chart(
            :chartData="getChartData(props.row.motor, props.row.positions )"
            :options="getCharOptions(props.row.motor)"
            :styles="{ height: '30px' }"
            class="box column is-paddingless is-hidden-mobile"
          )
    //
    // Temperature
    //
    b-table-column(custom-key="present_temperature" v-bind="cell")
      template(v-slot:header="{ column }")
        temperature(
          :value="temperatureMax"
          :showValue="false"
        )
      template(v-slot="props")
        temperature(
          :value="props.row.present_temperature"
          :showIcon="false"
          labelType="tag"
        )
    //
    // LED
    //
    b-table-column(custom-key="led" v-bind="cell")
      template(v-slot:header="{ column }")
        b-icon(pack="far" icon="lightbulb")
      template(v-slot="props")
        led(:value="props.row.led")
</template>

<script>
'use strict'
import motors from '@/mixins/motors'
import MotorChart from '@/components/sub/MotorChart'
import * as RegisterComponents from '@/components/sub/registers/index'
import PUtils from '@/lib/poppy-utils'
import { sparkLine } from '@/lib/charts/options'

const cell = {
  class: 'has-text-primary has-text-weight-semibold',
  centered: true
}

export default {
  name: 'Registers',
  mixins: [motors],
  components: { MotorChart, ...RegisterComponents },
  data: _ => ({ cell }),
  computed: {
    data () {
      return this.motors.map(motor => {
        return {
          motor,
          compliant: this.getRegister(motor, 'compliant'),
          led: this.getRegister(motor, 'led'),
          moving_speed: Math.round(this.getRegister(motor, 'moving_speed')),
          present_position: Math.round(this.getRegister(motor, 'present_position')),
          positions: this.getRegister(motor, 'present_position', 'all').map(Math.round),
          present_temperature: this.getRegister(motor, 'present_temperature')
        }
      })
    },
    temperatureMax () { return Math.max(...this.data.map(d => d.present_temperature)) }
  },
  methods: {
    getMotorDescriptor (motor) { return PUtils.getMotorDescriptor(motor) },
    getCharOptions (motor) { return sparkLine(PUtils.getAngleRange(motor)) },
    getChartData (motor, data) {
      return {
        labels: [...Array(data.length).keys()],
        datasets: [{
          label: motor,
          showLine: true,
          data
        }]
      }
    }
  }
}
</script>
