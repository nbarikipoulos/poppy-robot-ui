<template lang="pug">
  section(class="hero is-medium")
    div(class="hero-body")
      div(class="columns is-centered is-vcentered")
        div(class="column is-one-quarter")
          div(class="box")
            b-field(label="Hostname")
              b-input(type="text" v-model="settings.ip")
            b-field(label="Port")
              b-input(type="text" v-model="settings.port")
            b-button(type="is-primary" @click="connect" expanded) Connect
    b-loading(:is-full-page="false" :active.sync="isConnecting" :can-cancel="true")
</template>

<script>
import store from '@/lib/store'
import { P_CONNECTOR } from '@/lib/poppy-utils'

export default {
  name: 'Connect',
  data: _ => ({
    settings: store.connect,
    isConnecting: false,
    autoConnect: false
  }),
  methods: {
    async connect () {
      this.isConnecting = true
      const connected = await P_CONNECTOR.connect(this.settings)
      store.connected = connected

      if (!connected) {
        this.isConnecting = false
        this.$buefy.notification.open({
          duration: 5000,
          position: 'is-bottom',
          message: 'Unable to connect.',
          type: 'is-danger'
        })
      } else {
        P_CONNECTOR.initQuerying()
        store.mdata = P_CONNECTOR.mdata
        await P_CONNECTOR.startQuerying()

        this.isConnecting = false
        this.$router.push('/')
      }
    }
  },
  mounted () {
    if (this.autoConnect) {
      this.connect()
    }
  }
}
</script>
