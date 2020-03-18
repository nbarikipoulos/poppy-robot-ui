'use strict'

import * as pUtils from './utils'

const P = require('poppy-robot-core')

const store = {
  connect: {
    ip: 'poppy.local',
    httpPort: 8080,
    snapPort: 6969
  },
  poppy: undefined,
  mdata: {},

  async init () {
    try {
      this.poppy = await P.createPoppy({
        connect: this.connect
      })
      this.mdata = this._initMotorStorage()
    } catch (err) {
      // Do nothing
    }

    if (this.isConnected()) {
      await queryPosition()
      await queryRobot()
      await queryTemp()
      setInterval(_ => queryPosition(), 350)
      setInterval(_ => queryRobot(), 500)
      setInterval(_ => queryTemp(), 5000)
    }
  },

  _initMotorStorage () {
    const motors = this.getRobotDescriptor().motors
    return motors.reduce((acc, motor) => {
      acc[motor.name] = {}
      return acc
    }, {})
  },

  getPoppy () { return this.poppy },

  getRobotDescriptor () { return this.poppy.getDescriptor() },

  isConnected () { return this.poppy !== undefined },

  update (motor, reg, value) {
    this.mdata[motor][reg] = value
  },

  async execute (command, motors, ...values) {
    if (this.isConnected()) {
      const script = P.createScript(...motors)
      script[command](...values)
      await this.poppy.exec(script)
    }
  },

  async query ({
    motors = 'all',
    registers = ['present_position']
  } = {}) {
    return pUtils.query(
      this.poppy,
      motors,
      registers
    )
  }
}

const queryTemp = async _ => {
  const data = await store.poppy.query(
    'all',
    ['present_temperature']
  )
  for (const m in data) {
    const values = data[m]
    for (const reg in values) {
      store.update(m, reg, values[reg])
      store.mdata[m][reg] = values[reg]
    }
  }
}

const queryPosition = async _ => {
  const data = await store.poppy.query(
    'all',
    ['present_position']
  )

  for (const m in data) {
    const values = data[m]
    for (const reg in values) {
      store.update(m, reg, values[reg])
      store.mdata[m][reg] = values[reg]
    }
  }
}

const queryRobot = async _ => {
  const data = await store.poppy.query(
    'all',
    ['moving_speed', 'led', 'compliant']
  )

  // Dispatch data to local storage
  for (const m in data) {
    const values = data[m]
    for (const reg in values) {
      store.update(m, reg, values[reg])
      store.mdata[m][reg] = values[reg]
    }
  }
}

export default store
