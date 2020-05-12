<template lang="pug">
  div(class="card")
    div(class="card-content")
      div(class="content has-text-primary")
        div(
          class="columns is-vcentered is-mobile has-background-primary has-text-white"
        )
          div(class="column is-narrow")
            span(class="has-text-weight-bold") {{ motor }}
          div(class="column is-narrow has-text-left")
            ExtIcon(
              :value="getRegister('compliant')"
              :state="icons.compliant"
            )
          div(class="column is-narrow")
            b-icon(pack="fas" icon="tachometer-alt")
            span {{ getRegister('moving_speed') }}
          div(class="column is-narrow")
            b-icon(pack="fas" icon="crosshairs")
            span {{ Math.round(getRegister('present_position')) }}
          //- div(class="column")
          //-   MotorChart(
          //-     :key="motor"
          //-     :chartData="getPositionChartData()"
          //-     :options="chartOptions"
          //-     :styles="{ height: '30px' }"
          //-     class="box is-paddingless"
          //-   )
          div(class="column has-text-right is-narrow")
            ExtIcon(
              :value="getRegister('led')"
              :state="icons.led"
            )
            ExtIcon(:value="getRegister('present_temperature')" :state="icons.temperature")
            span(:class="motorTempText") {{ getRegister('present_temperature') }}
        div(class="columns is-vcentered")
          div(class="column")
            PolarPositionsChart(
              :motors="[this.motor]"
            )

</template>

<script>
import motor from '@/mixins/motor'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'
import T from '@/lib/utils/tBranding'
import icons from '@/lib/utils/icons'
import { sparkLine } from '@/lib/charts/options'

export default {
  name: 'MotorPanel',
  mixins: [motor],
  components: { PolarPositionsChart },
  data: _ => ({ icons, chartOptions: sparkLine }),
  computed: {
    motorTempText: function () {
      const t = T(this.getRegister('present_temperature'))
      return t.level !== 'ok' ? `has-text-${t.color}` : ''
    }
  },
  methods: {
    getPositionChartData: function () {
      const data = this.getRegister('present_position', 'all')
      return {
        labels: [...Array(data.length).keys()],
        datasets: [{
          label: this.motor,
          showLine: true,
          data
        }]
      }
    }
  }
}
</script>
