<script>
'use strict'

import { PolarArea, mixins } from 'vue-chartjs'

import PUtils from '@/lib/poppy-utils'
import motors from '@/mixins/motors'
import store from '@/lib/store'
import { polar } from '@/lib/charts/options'

export default {
  name: 'PolarPositionsChart',
  extends: PolarArea,
  mixins: [motors, mixins.reactiveData],
  data: _ => ({ mdata: store.mdata }),
  props: {
    range: { type: Object, default: undefined }
  },
  computed: {
    positions () {
      return this.motors.map(motor => this.mdata[motor].present_position.current)
    },
    _range () {
      return this.range
        ? this.range
        : PUtils.getAngleRange(...this.motors)
    }
  },
  watch: {
    _range () { this.options = polar(this._range) },
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
    this.options = polar(this._range)

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
