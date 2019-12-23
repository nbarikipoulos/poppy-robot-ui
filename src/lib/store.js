import EventBus from '@/lib/eventBus'

const P = require('poppy-robot-core')

const queryPresentPosition = async () => {
  const data = await store.poppy.query('all', ['present_position'])
  EventBus.$emit('DATA_POSITION', data)
}

const store = {
  state: {
    connected: false,
    isAddressable: false
  },
  hostname: 'poppy.local',
  poppy: undefined,

  async init () {
    try {
      this.poppy = await P.createPoppy({
        connect: { ip: this.hostname }
      })
      this.state.connected = true
    } catch (err) {
      this.state.connected = false
    }

    if (this.state.connected) {
      setInterval(queryPresentPosition, 200)
    }
  },

  getPoppy () { return this.poppy },

  getHostname () { return this.hostname },
  setHostname (value) { this.hostname = value },
  isConnected () { return this.state.connected },
  isAddressable () { return this.state.isAddressable },
  setAddressable (value) { this.state.isAddressable = value },

  async execute (command, motors, ...values) {
    console.log('============= EXEC', command, motors, values)
    if (this.state.connected) {
      const script = P.createScript(...motors)
      script[command](...values)
      await this.poppy.exec(script)
    }
  }

}

export default store
