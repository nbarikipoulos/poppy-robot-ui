<template lang="pug">
  div(class="table-container")
    table(
      class="table is-fullwidth has-text-white has-text-weight-bold is-size-5 is-narrow has-text-centered"
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
          ExtIcon(:value="mdata[motorId].compliant.current" :state="icons.compliant")
        td
          span {{ mdata[motorId].moving_speed.current }}
        td
          span {{ Math.round(mdata[motorId].present_position.current) }}
        td(class="is-hidden-mobile")
          MotorChart(
            :key="motorId"
            :chartData="getChartData(motorId)"
            :options="chartOptions"
            :styles="{ height: '50px'}"
          )
        td
          span(:class='motorTempText[i]') {{ temperatures[i] }}
        td
          ExtIcon(:value="mdata[motorId].led.current" :state="icons.led")
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
      return this.motorIds.map(motorId => this.mdata[motorId].present_temperature.current)
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
