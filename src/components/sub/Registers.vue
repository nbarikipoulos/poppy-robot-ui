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
      tr(v-for="(motorId, i) in motorIds")
        td
          span {{ motorId }}
        td
          ExtIcon(:value="value(motorId, 'compliant')" :state="icons.compliant")
        td
          span {{ value(motorId, 'moving_speed') }}
        td
          span {{ Math.round(value(motorId, 'present_position')) }}
        td(class="is-hidden-mobile")
          MotorChart(
            :key="motorId"
            :chartData="getChartData(motorId)"
            :options="chartOptions"
            :styles="{ height: '50px'}"
            class="box is-paddingless"
          )
        td
          span(:class='motorTempText[i]') {{ temperatures[i] }}
        td
          ExtIcon(:value="value(motorId, 'led')" :state="icons.led")
</template>

<script>
'use strict'

import store from '@/lib/store'
import PUtils from '@/lib/poppy-utils'
import T from '@/lib/utils/tBranding'
import icons from '@/lib/utils/icons'
import { sparkLine } from '@/lib/charts/options'

export default {
  name: 'Registers',
  data: _ => ({ chartOptions: sparkLine, icons, mdata: store.mdata }),
  props: {
    motorIds: { type: Array, default: _ => PUtils.allMotorIds }
  },
  computed: {
    temperatures: function () {
      return this.motorIds.map(motorId => this.value(motorId, 'present_temperature'))
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
    value: function (motor, register) {
      return this.mdata[motor][register].current
    },
    getChartData: function (motorId) {
      const data = this.mdata[motorId].present_position.data
      return {
        labels: [...Array(data.length).keys()],
        datasets: [{
          label: motorId,
          showLine: true,
          data
        }]
      }
    }
  }
}
</script>
