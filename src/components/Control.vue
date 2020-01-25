<template lang="pug">
  section
    div(class="box")
      div(class="columns is-mobile")
        div(class="column is-narrow")
          b-field
            b-switch(v-model="controlMotors") Control motors
        div(class="column")
          b-field(label="Speed" label-position="on-border")
            b-input(v-model="speed" placeholder="Set all motors speed")
            p(class="control")
              b-button(type="is-primary" @click="setSpeed") Set
    div(class="columns is-multiline")
      Motor(
        v-for="desc in getMotorDescriptors()"
        :key="desc.name"
        :descriptor="desc"
        :compliant="!controlMotors"
      )
</template>

<script>
import Motor from '@/components/Motor.vue'

import store from '@/lib/store'

export default {
  name: 'Control',
  components: {
    Motor
  },
  data () {
    return {
      store,
      controlMotors: false,
      speed: null
    }
  },
  watch: {
    controlMotors: async function (value) {
      await this.store.execute(
        'compliant',
        ['all'],
        !value
      )
    }
  },
  methods: {
    getMotorDescriptors () {
      return this.store.isConnected() // Useful?
        ? this.store.getPoppy().getDescriptor().motors
        : []
    },
    async setSpeed () {
      if (this.speed) {
        await this.store.execute(
          'speed',
          ['all'],
          this.speed
        )
      }
    }
  }
}
</script>
