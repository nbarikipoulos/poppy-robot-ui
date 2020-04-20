<script>
'use strict'

import { PolarArea } from 'vue-chartjs'

import store from '@/lib/store'
import PUtils from '@/lib/poppy-utils'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 100
  },
  legend: { display: false },
  scale: {
    ticks: { min: -125, max: 90 }
  }
}

export default {
  name: 'PolarPositionsChart',
  extends: PolarArea,
  data: _ => ({ mdata: store.mdata, options }),
  props: {
    motorIds: { type: Array, default: _ => PUtils.allMotorIds }
  },
  computed: {
    positions: function () {
      return this.motorIds.map(id => this.mdata[id].present_position.current)
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
      labels: this.motorIds,
      datasets: [{ data: [] }]
    },
    this.options)
  }
}
</script>
