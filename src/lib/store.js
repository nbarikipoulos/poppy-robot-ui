'use strict'

const store = {
  connect: {
    hostname: 'poppy.local',
    port: 8080
  },
  connected: false,

  mdata: undefined,

  dashboard: {
    showAsCard: false,
    col: 3
  }
}

export default store
