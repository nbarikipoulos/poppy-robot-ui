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
  mdata: undefined,
  pConnector: new PConnector(),

  async init () {
    this.isConnected = await this.pConnector.init(
      this.connect
    )

    if (this.isConnected) {
      // "Expose" the robot descriptor
      this.descriptor = this.pConnector.poppy.getDescriptor()

      //
      // Querying the robot
      //

      const config = {
        motors: this.getAllMotorIds(),
        registers: {
          present_position: { length: 1 },
          moving_speed: { length: 1 },
          led: { length: 1 },
          compliant: { length: 1 },
          present_temperature: { length: 1 }
        }
      }

      const querying = new RegisterQuerying(
        this.pConnector.poppy,
        config
      )

      // get the data handler
      this.mdata = querying.data

      // Then , launch periodic querying to the robot
      await querying.launch()
    }
  },

  getAllMotorIds () { return this.descriptor.motors.map(m => m.name) },
  getMotorDesc (motorId) { return this.descriptor.motors.find(m => m.name === motorId) }
}

export default store
