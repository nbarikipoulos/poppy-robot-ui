'use strict'

// FIXME
const PRIMARY = [110, 161, 173]
const rgb = (r, g, b) => `rgb(${r},${g},${b})`
const rgba = (r, g, b, a) => `rgba(${r},${g},${b},${a})`

const polar = (
  range, // { min, max }
  color = rgba(...PRIMARY, 0.75)
) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 100
  },
  legend: { display: false },
  elements: {
    arc: {
      backgroundColor: color
    }
  },
  scale: {
    ticks: range
  }
})

const sparkLine = (
  range, // { min, max }
  {
    border = rgb(...PRIMARY),
    line = rgba(...PRIMARY, 0.75)
  } = {}
) => ({
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
      borderColor: border,
      backgroundColor: line,
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
      ticks: m(1.3, range)
    }]
  }
})

const m = (coef, range) => ({ min: coef * range.min, max: coef * range.max })

export { sparkLine, polar }
