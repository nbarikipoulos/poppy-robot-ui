'use strict'

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
      backgroundColor: 'white',
      borderColor: 'white',
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
