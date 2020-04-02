<script>
'use strict'

import { PolarArea } from 'vue-chartjs'

import store from '@/lib/store'

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
  name: 'AllPositionsChart',
  extends: PolarArea,
  data: _ => ({ mdata: store.mdata, options }),
  props: {
    motors: { type: Array, default: _ => store.getAllMotorIds() }
  },
  computed: {
    positions: function () {
      return this.motors.map(id => this.mdata[id].present_position)
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
    this.options)
  }
}
</script>
