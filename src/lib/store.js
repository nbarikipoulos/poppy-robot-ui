'use strict'

import EventBus from '@/lib/eventBus'

const P = require('poppy-robot-core')

const queryPresentPosition = async () => {
  const data = await store.poppy.query('all', ['present_position'])
  EventBus.$emit('DATA_POSITION', data)
}

const store = {
  connect: {
    ip: 'poppy.local',
    httpPort: 8080,
    snapPort: 6969
  },
  poppy: undefined,

  async init () {
    try {
      this.poppy = await P.createPoppy({
        connect: this.connect
      })
    } catch (err) {
      // Do nothing
    }

    if (this.isConnected()) {
      setInterval(queryPresentPosition, 200)
    }
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

export default store
