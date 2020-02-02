<template lang="pug">
  div(class="box has-border-primary is-primary")
    apexchart(
      type="line"
      :height="height"
      width="100%"
      :options="chart"
      :series="series"
    )
</template>

<script>
const chart = {
  chart: {
    sparkline: { enabled: true }
  },
  plotOptions: {
    bar: { columnWidth: '90%' }
  },
  labels: [],
  xaxis: {
    show: false
  },
  yaxis: {
    crosshairs: { width: 1 },
    show: true
  },
  tooltip: {
    fixed: { enabled: false },
    x: { show: false },
    y: { show: false },
    marker: { show: false }
  }
}
const series = [{
  name: 'mySerie',
  data: []
}]

export default {
  name: 'MotorChart',
  data () {
    return {
      chart,
      series
    }
  },
  props: {
    name: String,
    data: Array,
    height: undefined
  },
  watch: {
    data: function (value) {
      this.series = [{
        name: 'mySerie',
        data: value
      }]
    }
  }
}
</script>
