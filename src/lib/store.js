'use strict'

import PConnector from './PoppyConnector'
import RegisterQuerying from './RegisterQuerying'

const store = {
  connect: {
    ip: 'poppy.local',
    port: 8080
  },
  isConnected: false,
  descriptor: undefined,
  mdata: {},
  pConnector: new PConnector(),

  async init () {
    this.isConnected = await this.pConnector.init(
      this.connect
    )

    const config = {
      registers: {
        present_position: { length: 100 },
        moving_speed: { length: 1 },
        led: { length: 1 },
        compliant: { length: 1 },
        present_temperature: { length: 1 }
      }
    }

    if (this.isConnected) {
      // "Expose" the robot descriptor
      this.descriptor = this.pConnector.poppy.getDescriptor()

      // Initialize storage for each motors
      this.mdata = this.descriptor.motors.reduce((acc, motor) => {
        acc[motor.name] = {}
        return acc
      }, {})

      // Launch periodic querying to the robot
      const querying = new RegisterQuerying(this.pConnector.poppy)
      await querying.launch(this.mdata, config)
    }
  },

  getAllMotorIds () { return this.descriptor.motors.map(m => m.name) },
  getMotorDesc (motorId) { return this.descriptor.motors.find(m => m.name === motorId) }
}

export default store
