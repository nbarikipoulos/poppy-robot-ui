<template lang="pug">
  section
    div(class="box py-2")
      b-field
        b-field(grouped)
          b-switch(
            v-model="controlMotors"
            type="is-primary"
            :rounded="false"
          )
            span(class="has-text-primary") Control motors
          div(class="pt-1")
            b-field(
              custom-class="has-text-primary"
              label="Speed"
              label-position="on-border"
            )
              b-input(
                v-model="speed"
                placeholder="Set all motors speed"
              )
              p(class="control")
                b-button(type="is-primary" @click="setSpeed") Set
    div(class="columns is-multiline")
      div(
        v-for="motor in motors"
        class="column is-half-tablet is-one-quarter-desktop"
      )
        motor-control(
          :motor="motor"
          :compliant="!controlMotors"
        )
</template>

<script>
import motors from '@/mixins/motors'
import MotorControl from '@/components/sub/MotorControl.vue'
import PUtils from '@/lib/poppy-utils'

export default {
  name: 'ControlView',
  mixins: [motors],
  components: { MotorControl },
  data: _ => ({
    controlMotors: false,
    speed: null
  }),
  watch: {
    async controlMotors (value) {
      await PUtils.execute(
        value ? 'stiff' : 'compliant',
        ['all']
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
