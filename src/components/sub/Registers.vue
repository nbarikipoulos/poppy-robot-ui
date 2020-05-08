<template lang="pug">
  div(class="table-container")
    table(
      class="table is-fullwidth has-text-primary has-text-weight-bold is-narrow has-text-centered"
    )
      thead
        th id
        th
          b-icon(pack="fas" icon="gamepad")
        th
          b-icon(pack="fas" icon="tachometer-alt")
        th
          b-icon(pack="fas" icon="crosshairs")
        th(class="is-hidden-mobile")
          span ...
        th
          ExtIcon(:value="temperatureMax" :state="icons.temperature")
        th
          b-icon(pack="far" icon="lightbulb")
      tr(v-for="(motor, i) in motors")
        td
          span {{ motor }}
        td
          ExtIcon(
            :value="getRegister(motor, 'compliant')"
            :state="icons.compliant"
          )
        td
          span {{ getRegister(motor, 'moving_speed') }}
        td
          span {{ Math.round(getRegister(motor, 'present_position')) }}
        td(class="is-hidden-mobile")
          MotorChart(
            :key="motor"
            :chartData="getChartData(motor)"
            :options="chartOptions"
            :styles="{ height: '50px'}"
            class="box is-paddingless"
          )
        td
          span(:class='motorTempText[i]') {{ temperatures[i] }}
        td
          ExtIcon(
            :value="getRegister(motor, 'led')"
            :state="icons.led"
          )
</template>

<script>
'use strict'
import motors from '@/mixins/motors'
import T from '@/lib/utils/tBranding'
import icons from '@/lib/utils/icons'
import { sparkLine } from '@/lib/charts/options'

export default {
  name: 'Registers',
  mixins: [motors],
  data: _ => ({ chartOptions: sparkLine, icons }),
  computed: {
    temperatures: function () {
      return this.motors.map(motor => this.getRegister(motor, 'present_temperature'))
    },
    temperatureMax: function () { return Math.max(...this.temperatures) },
    motorTempText: function () {
      return this.temperatures.map(temp => {
        const t = T(temp)
        return t.level !== 'ok' ? `has-text-${t.color}` : ''
      })
    }
  },
  methods: {
    getChartData: function (motor) {
      const data = this.getRegister(motor, 'present_position', 'all')
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
