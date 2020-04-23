'use strict'

// FIXME
const PRIMARY = 'rgb(110, 161, 173)'

const sparkLine = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500
  },
  legend: { display: false },
  tooltips: { enabled: false },
  elements: {
    line: {
      fill: false,
      backgroundColor: PRIMARY,
      borderColor: PRIMARY,
      borderWidth: 2,
      cubicInterpolationMode: 'monotone'
    },
    point: {
      radius: 0
    }
  },
  scales: {
    xAxes: [{ display: false }],
    yAxes: [{
      display: false,
      ticks: { min: -135, max: 100 }
    }]
  }
}

export { sparkLine }
