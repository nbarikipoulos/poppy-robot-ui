<script>
import { Line, mixins } from 'vue-chartjs'
import { sparkLine } from '@/lib/charts/options'
import motor from '@/mixins/motor'

export default {
  name: 'MotorChart',
  extends: Line,
  mixins: [motor, mixins.reactiveData],
  computed: {
    data () {
      return this.getRegister('present_position', 'all').map(Math.round)
    }
  },
  watch: {
    data (value) {
      this.chartData = this.getChartData(value)
      this.options = this.getChartOptions()
    }
  },
  methods: {
    getChartOptions () { return sparkLine(this.range) },
    getChartData (data) {
      return {
        labels: [...Array(data.length).keys()],
        datasets: [{
          label: this.motor,
          showLine: true,
          data
        }]
      }
    }
  },
  mounted () {
    this.renderChart(
      this.getChartData(this.data),
      this.getChartOptions()
    )
  },
  beforeDestroy () {
    this.$data._chart.destroy()
  }
}
</script>
