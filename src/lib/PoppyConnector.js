'use strict'

const P = require('poppy-robot-core')

class PoppyConnector {
  constructor () {
    this._poppy = undefined
  }

  async init (connect) {
    try {
      this._poppy = await P.createPoppy({ connect })
    } catch (err) {
      // Do nothing
    }

    return this.isConnected
  }

  get poppy () { return this._poppy }

  get isConnected () { return this._poppy !== undefined }

  async execute (command, motors, ...values) {
    if (this.isConnected) {
      const script = P.createScript(...motors)
      script[command](...values)
      await this._poppy.exec(script)
    }
  }
}

export default PoppyConnector
