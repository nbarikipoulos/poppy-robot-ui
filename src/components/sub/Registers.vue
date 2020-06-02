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
          span
            //- (class="has-text-primary")
            ext-b-icon(pack="fas" icon="gamepad")
        // Cell
        ext-b-icon(:value="props.row.compliant" :state="icons.compliant")
      //
      // Speed
      //
      b-table-column(custom-key="moving_speed" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          b-icon(pack="fas" icon="tachometer-alt")
        // Cell
        span {{ props.row.moving_speed }}
      //
      // Position
      //
      b-table-column(custom-key="present_position" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          b-icon(pack="fas" icon="crosshairs")
        // Cell
        div(class="columns")
          span(class="column is-2-tablet is-narrow-mobile") {{ Math.round(props.row.present_position) }}
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
          ext-b-icon(:value="temperatureMax" :state="icons.temperature")
        // Cell
        span(
          :class="`tag is-${T(props.row.present_temperature).color}`"
        ) {{ props.row.present_temperature }}
      //
      // LED
      //
      b-table-column(custom-key="led" v-bind="cell")
        // Header
        template(slot="header" slot-scope="{ column }")
          b-icon(pack="far" icon="lightbulb")
        // Cell
        ext-b-icon(:value="props.row.led" :state="icons.led")
</template>

<script>
'use strict'
import motors from '@/mixins/motors'
import MotorChart from '@/components/sub/MotorChart'
import T from '@/lib/utils/tBranding'
import icons from '@/lib/utils/icons'
import { sparkLine } from '@/lib/charts/options'

const cell = {
  class: 'has-text-primary',
  centered: true
}

export default {
  name: 'Registers',
  mixins: [motors],
  components: { MotorChart },
  data: _ => ({ cell, chartOptions: sparkLine, icons }),
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
    T: (temperature) => T(temperature),
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
