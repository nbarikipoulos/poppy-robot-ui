<template lang="pug">
  b-table(
    class="has-text-primary"
    :data="data"
    :mobile-cards="false"
    icon-pack="fas"
  )
    template(slot-scope="props")
      //
      // Motor
      //
      b-table-column(label="id" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          span {{ column.label }}
        // Cell
        span {{ props.row.motor }}
      //
      // Compliant
      //
      b-table-column(custom-key="compliant" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }" class="has-text-primary")
          ext-b-icon(pack="fas" icon="gamepad")
        // Cell
        compliant(:value="props.row.compliant")
      //
      // Speed
      //
      b-table-column(custom-key="moving_speed" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          speed(:showValue="false")
        // Cell
        speed(
          :value="props.row.moving_speed"
          :showIcon="false"
          :tooltip="false"
        )
      //
      // Position
      //
      b-table-column(custom-key="present_position" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          position(:showValue="false" :tooltip="false")
        // Cell
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
            :options="chartOptions"
            :styles="{ height: '30px' }"
            class="box column is-paddingless is-hidden-mobile"
          )
      //
      // Temperature
      //
      b-table-column(custom-key="present_temperature" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          temperature(
            :value="temperatureMax"
            :showValue="false"
          )
        // Cell
        temperature(
          :value="props.row.present_temperature"
          :showIcon="false"
          labelType="tag"
        )
      //
      // LED
      //
      b-table-column(custom-key="led" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          b-icon(pack="far" icon="lightbulb")
        // Cell
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
  class: 'has-text-primary',
  centered: true
}

export default {
  name: 'Registers',
  mixins: [motors],
  components: { MotorChart, ...RegisterComponents },
  data: _ => ({ cell, chartOptions: sparkLine }),
  computed: {
    data: function () {
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
    temperatureMax: function () { return Math.max(...this.data.map(d => d.present_temperature)) }
  },
  methods: {
    getMotorDescriptor: (motor) => PUtils.getMotorDescriptor(motor),
    getChartData: function (motor, data) {
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
