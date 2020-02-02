'use strict'

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
      setInterval(queryPresentPosition, 200)
    }
  },

  _initMotorStorage () {
    const motors = this.getRobotDescriptor().motors
    return motors.reduce((acc, motor) => {
      acc[motor.name] = {
        position: undefined,
        data: []
      }
      return acc
    }, {})
  },

  getPoppy () { return this.poppy },

  getRobotDescriptor () { return this.poppy.getDescriptor() },

  isConnected () { return this.poppy !== undefined },

  async execute (command, motors, ...values) {
    if (this.isConnected()) {
      const script = P.createScript(...motors)
      script[command](...values)
      await this.poppy.exec(script)
    }
  }

}

const queryPresentPosition = async _ => {
  const reg = 'present_position'
  const data = await store.poppy.query('all', [reg])
  for (const m in data) {
    const value = data[m][reg]
    store.mdata[m].position = value
    const points = store.mdata[m].data
    if (points.length >= 50) {
      points.shift()
    }
    points.push(value)
  }
}

export default store
