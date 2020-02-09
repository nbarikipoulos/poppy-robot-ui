<script>
import { Bar } from 'vue-chartjs'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { display: false },
  tooltips: { enabled: false }
}

export default {
  name: 'MotorChart',
  extends: Bar,
  props: {
    name: String,
    data: Array,
    height: undefined
  },
  watch: {
    data: function (value) {
      this.$data._chart.data.datasets[0].data = value
        .slice(-20)
        .map(Math.round)
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart({
      labels: [...Array(20).keys()],
      datasets: [{
        label: this.name,
        backgroundColor: '#f87979',
        data: []
      }]
    },
    options)
  }
}
</script>
