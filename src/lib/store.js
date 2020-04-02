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
      // "Expose" the robot descriptor
      this.descriptor = this.pConnector.getPoppy().getDescriptor()
      // Initialize storage for each motors
      this.mdata = this.descriptor.motors.reduce((acc, motor) => {
        acc[motor.name] = {}
        return acc
      }, {})
      // Launch periodic querying to the robot
      await this.pConnector.launchQuerying(this.mdata)
    }
  },
  getAllMotorIds () { return this.descriptor.motors.map(m => m.name) }
}

export default store
