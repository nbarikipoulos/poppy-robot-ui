'use strict'

import RegisterQuerying from './RegisterQuerying'

const P = require('poppy-robot-core')

class PConnector {
  constructor () {
    this._poppy = undefined
    this._querying = undefined
    this._isConnected = false
  }

  get poppy () { return this._poppy }

  get mdata () { return this._querying.data }

  async connect (connect) {
    try {
      this._poppy = await P.createPoppy({ connect })
    } catch (err) {
      this._poppy = undefined
    }
    this._isConnected = this._poppy !== undefined

    return this._isConnected
  }

  initQuerying () {
    //
    // Querying the robot
    //

    const config = {
      motors: this._poppy.getAllMotorIds(),
      registers: [{
        name: 'present_position',
        length: 100
      }, {
        name: 'moving_speed',
        length: 1
      }, {
        name: 'led',
        length: 1
      }, {
        name: 'compliant',
        length: 1
      }, {
        name: 'present_temperature',
        length: 1
      }]
    }

    this._querying = new RegisterQuerying(
      this._poppy,
      config
    )
  }

  async startQuerying () { await this._querying.launch() }
}

export const P_CONNECTOR = new PConnector()

const PUtils = {
  get poppy () { return P_CONNECTOR.poppy }, // arff
  get descriptor () { return this.poppy.getDescriptor() },
  get allMotorIds () { return this.poppy.getAllMotorIds() },

  getMotorDescriptor (id) {
    return this.descriptor.motors.find(m => m.name === id)
  },

  async execute (command, motorIds, ...values) {
    const script = P.createScript(...motorIds)
    script[command](...values)
    await this.poppy.exec(script)
  }
}

export default PUtils
