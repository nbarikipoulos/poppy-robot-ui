<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'MotorChart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    name: String,
    options: { type: Object }
  },
  mounted () {
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
