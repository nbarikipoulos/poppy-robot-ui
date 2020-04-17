'use strict'

class RegisterQuerying {
  constructor (poppy, config) {
    this._poppy = poppy
    this._data = {}

    this._init(config)
  }

  _init (config) {
    this._data = config.motors.reduce((acc, motor) => {
      acc[motor] = {}
      return acc
    }, {})
  }

  get data () { return this._data }

  async launch () {
    const f = (poppy, registers) => poppy.query('all', registers)
    const g = (data) => {
      for (const m in data) {
        const values = data[m]
        for (const reg in values) {
          this._data[m][reg] = values[reg]
        }
      }
    }
    const fg = (poppy, registers) => f(poppy, registers).then(g)

    const queries = [{
      name: 'position',
      registers: ['present_position'],
      period: 333 // ms
    }, {
      name: 'others',
      registers: ['moving_speed', 'led', 'compliant'],
      period: 750 // ms
    }, {
      name: 'temperature',
      registers: ['present_temperature'],
      period: 10000 // ms
    }]

    // t0 request to initialize mdata
    await Promise.all(
      queries.map(async conf => fg(this._poppy, conf.registers))
    )

    queries.map(conf => setInterval(
      async _ => fg(this._poppy, conf.registers),
      conf.period
    ))
  }
}

export default RegisterQuerying
