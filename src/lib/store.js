'use strict'

import PConnector from './PoppyConnector'

const store = {
  connect: {
    ip: 'poppy.local',
    httpPort: 8080,
    snapPort: 6969
  },
  isConnected: false,
  descriptor: undefined,
  mdata: {},
  pConnector: new PConnector(),

  async init () {
    this.isConnected = await this.pConnector.init(
      this.connect
    )

    if (this.isConnected) {
      this.descriptor = this.pConnector.getPoppy().getDescriptor()
      this.mdata = this._initMotorStorage()
      this.pConnector.launchQuerying(this.mdata)
    }
  },

  _initMotorStorage () {
    const motors = this.descriptor.motors
    return motors.reduce((acc, motor) => {
      acc[motor.name] = {}
      return acc
    }, {})
  }
}

export default store
