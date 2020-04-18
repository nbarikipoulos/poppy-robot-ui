'use strict'

class RegisterData {
  constructor (name, length = 1) {
    this._name = name
    this._length = length
    this._values = []
  }

  get data () { return this._values }

  get current () {
    return this._length === 1
      ? this._values[0]
      : this._values.slice(-1)[0]
  }

  add (value) {
    if (this._length === 1) {
      this._values[0] = value
    } else {
      if (this._values.length >= this._length) {
        this._values.shift()
      }
      this._values.push(value)
    }
  }
}

class RegisterQuerying {
  constructor (poppy, config) {
    this._poppy = poppy
    this._config = config
    this._data = {}

    this._init()
  }

  _init () {
    this._data = this._config.motors.reduce((acc, motor) => {
      const props = this._config.registers.map(r => ({ [r.name]: new RegisterData(r.name, r.length) }))
      acc[motor] = Object.assign({}, ...props)
      return acc
    }, {})
  }

  get data () { return this._data }

  async launch () {
    const f = (poppy, registers) => poppy.query('all', registers)
    const g = (data) => Object.entries(data)
      .forEach(([motor, values]) => Object.entries(values)
        .forEach(([reg, value]) => this._data[motor][reg].add(value))
      )
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
