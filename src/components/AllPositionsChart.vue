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
  data: _ => ({ motorIds: [] }),
  computed: {
    positions: function () {
      return this.motorIds.map(id => store.mdata[id].present_position)
    }
  },
  watch: {
    positions: function (value) {
      this.$data._chart.data.datasets[0].data = value
      this.$data._chart.update()
    }
  },
  mounted () {
    this.motorIds = store.pConnector.getPoppy().getAllMotorIds()
    this.renderChart({
      labels: this.motorIds,
      datasets: [{ data: [] }]
    },
    options)
  }
}
</script>
