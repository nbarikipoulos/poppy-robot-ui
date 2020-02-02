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
      div(
        v-for="desc in getMotorDescriptors()"
        class="column is-half-tablet is-one-quarter-desktop"
      )
        Motor(
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
      controlMotors: false,
      speed: null
    }
  },
  watch: {
    controlMotors: async function (value) {
      await store.execute(
        'compliant',
        ['all'],
        !value
      )
    }
  },
  methods: {
    getMotorDescriptors () {
      return store.getRobotDescriptor().motors
    },
    async setSpeed () {
      if (this.speed) {
        await store.execute(
          'speed',
          ['all'],
          this.speed
        )
      }
    }
  }
}
</script>
