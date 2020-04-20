<template lang="pug">
  section
    div(class="box")
      div(class="columns is-mobile")
        div(class="column is-narrow")
          b-field
            b-switch(
              v-model="controlMotors"
              type="is-primary-bis"
              :rounded="false"
            ) Control motors
        div(class="column")
          b-field(
            custom-class="has-text-primary-bis"
            label="Speed"
            label-position="on-border"
          )
            b-input(v-model="speed" placeholder="Set all motors speed")
            p(class="control")
              b-button(type="is-primary-bis" @click="setSpeed") Set
    div(class="columns is-multiline")
      div(
        v-for="motorId in motorIds"
        class="column is-half-tablet is-one-quarter-desktop"
      )
        MotorControl(
          :motorId="motorId"
          :compliant="!controlMotors"
        )
</template>

<script>
import MotorControl from '@/components/sub/MotorControl.vue'

import PUtils from '@/lib/poppy-utils'

export default {
  name: 'ControlView',
  components: {
    MotorControl
  },
  data: _ => ({
    controlMotors: false,
    speed: null
  }),
  computed: {
    motorIds: function () { return PUtils.allMotorIds }
  },
  watch: {
    controlMotors: async function (value) {
      await PUtils.execute(
        'compliant',
        ['all'],
        !value
      )
    }
  },
  methods: {
    async setSpeed () {
      if (this.speed) {
        await PUtils.execute(
          'speed',
          ['all'],
          this.speed
        )
      }
    }
  }
}
</script>
