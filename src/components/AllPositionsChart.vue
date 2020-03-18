<script>
'use strict'

import { PolarArea } from 'vue-chartjs'

import store from '@/lib/store'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 600
  },
  legend: { display: false },
  scale: {
    ticks: { min: -125, max: 90 }
  }
}

export default {
  name: 'AllPositionsChart',
  extends: PolarArea,
  computed: {
    positions: function () {
      return this.getAllMotorIds().map(id => store.mdata[id].present_position)
    }
  },
  methods: {
    getAllMotorIds () { return store.getPoppy().getAllMotorIds() }
  },
  watch: {
    positions: function (value) {
      this.$data._chart.data.datasets[0].data = value
      this.$data._chart.update()
    }
  },
  mounted () {
    const labels = store.getPoppy().getAllMotorIds()
    this.renderChart({
      labels,
      datasets: [{ data: [] }]
    },
    options)
  }
}
</script>
