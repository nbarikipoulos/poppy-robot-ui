<template lang="pug">
  section(class="hero is-medium")
    div(class="hero-body")
      div(class="columns is-centered is-vcentered")
        div(class="column is-one-quarter")
          div(class="box")
            b-field(label="Hostname")
              b-input(type="text" v-model="connection.ip")
            b-field(label="Port")
              b-input(type="text" v-model="connection.port")
            b-button(type="is-primary-bis" @click="connect" expanded) Connect
    b-loading(:is-full-page="false" :active.sync="isConnecting" :can-cancel="true")
</template>

<script>
import store from '@/lib/store'

export default {
  name: 'Connect',
  data: _ => ({
    connection: store.connect,
    isConnecting: false,
    autoConnect: true
  }),
  methods: {
    async connect () {
      this.isConnecting = true
      await store.init()
      this.isConnecting = false
      if (!store.isConnected) {
        this.$buefy.notification.open({
          duration: 5000,
          position: 'is-bottom',
          message: 'Unable to connect.',
          type: 'is-danger'
        })
      } else {
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
