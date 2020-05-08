<script>
'use strict'

import { PolarArea } from 'vue-chartjs'

import motors from '@/mixins/motors'
import store from '@/lib/store'
import { polar } from '@/lib/charts/options'

export default {
  name: 'PolarPositionsChart',
  extends: PolarArea,
  mixins: [motors],
  data: _ => ({ mdata: store.mdata, chartOptions: polar }),
  computed: {
    positions: function () {
      return this.motors.map(motor => this.mdata[motor].present_position.current)
    }
  },
  watch: {
    positions: function (value) {
      this.$data._chart.data.datasets[0].data = value
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart({
      labels: this.motors,
      datasets: [{ data: [] }]
    },
    this.chartOptions)
  }
}
</script>
