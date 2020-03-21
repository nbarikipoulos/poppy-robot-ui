'use strict'

const P = require('poppy-robot-core')

class PoppyConnector {
  constructor () {
    this.poppy = undefined
  }

  async init (connect) {
    try {
      this.poppy = await P.createPoppy({ connect })
    } catch (err) {
      // Do nothing
    }

    return this.isConnected()
  }

  async launchQuerying (mdata) {
    const f = (poppy, registers) => poppy.query('all', registers)
    const g = (data) => {
      for (const m in data) {
        const values = data[m]
        for (const reg in values) {
          if (mdata[m][reg] !== values[reg]) {
            mdata[m][reg] = values[reg]
          }
        }
      }
    }
    const fg = async (poppy, registers) => f(poppy, registers).then(g)

    const queries = [{
      name: 'position',
      registers: ['present_position'],
      period: 333 // ms
    }, {
      name: 'others',
      registers: ['moving_speed', 'led', 'compliant'],
      period: 500 // ms
    }, {
      name: 'temperature',
      registers: ['present_temperature'],
      period: 15000 // "heavy" enough time consuming
    }]

    // t0 request to initiate mdata
    await Promise.all(
      queries.map(async conf => fg(this.poppy, conf.registers))
    )

    await f(this.poppy, queries[0].registers).then(g)

    queries.map(conf => setInterval(
      _ => fg(this.poppy, conf.registers),
      conf.period
    ))
  }

  getPoppy () { return this.poppy }

  isConnected () {
    return this.poppy !== undefined
  }

  async execute (command, motors, ...values) {
    if (this.isConnected()) {
      const script = P.createScript(...motors)
      script[command](...values)
      await this.poppy.exec(script)
    }
  }
}

export default PoppyConnector
