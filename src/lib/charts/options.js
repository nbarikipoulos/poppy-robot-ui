'use strict'

// FIXME
const PRIMARY = [110, 161, 173]
const rgb = (r, g, b) => `rgb(${r},${g},${b})`
const rgba = (r, g, b, a) => `rgba(${r},${g},${b},${a})`

const polar = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 100
  },
  legend: { display: false },
  elements: {
    arc: {
      backgroundColor: rgba(...PRIMARY, 0.75)
    }
  },
  scale: {
    ticks: { min: -125, max: 90 } // FIXME
  }
}

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
      backgroundColor: rgb(...PRIMARY),
      borderColor: rgb(...PRIMARY),
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

export { sparkLine, polar }
