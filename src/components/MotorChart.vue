<script>
import { Bar } from 'vue-chartjs'

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { display: false },
  tooltips: { enabled: false },
  scales: {
    xAxes: [{ display: false }],
    yAxes: [{
      display: true,
      ticks: { min: -125, max: 90 }
    }]
  }
}

export default {
  name: 'MotorChart',
  extends: Bar,
  props: {
    name: String,
    data: Array,
    nbPoint: { type: Number, default: 50 }
  },
  watch: {
    data: function (value) {
      this.$data._chart.data.datasets[0].data = value
        .slice(-this.nbPoint)
        .map(Math.round)
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart({
      labels: [...Array(this.nbPoint).keys()],
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
