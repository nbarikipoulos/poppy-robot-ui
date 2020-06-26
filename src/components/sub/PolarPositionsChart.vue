<script>
'use strict'

import { PolarArea, mixins } from 'vue-chartjs'

import motors from '@/mixins/motors'
import store from '@/lib/store'
import { polar } from '@/lib/charts/options'

export default {
  name: 'PolarPositionsChart',
  extends: PolarArea,
  mixins: [motors, mixins.reactiveData],
  data: _ => ({ mdata: store.mdata }),
  computed: {
    positions () {
      return this.motors.map(motor => this.mdata[motor].present_position.current)
    }
  },
  watch: {
    positions (value) {
      // this.$data._chart.data.datasets[0].data = value
      // this.$data._chart.update()
      this.chartData = {
        labels: this.motors,
        datasets: [{ data: value }]
      }
    }
  },
  mounted () {
    this.chartData = {
      labels: this.motors,
      datasets: [{ data: [] }]
    }
    this.options = polar
    this.renderChart(
      this.chartData,
      this.options
    )
  },
  beforeDestroy () {
    this.$data._chart.destroy()
  }
}
</script>
