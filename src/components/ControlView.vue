<template lang="pug">
  section
    div(class="box py-2 pl-1")
      b-field(grouped)
        b-tooltip(
          class="pr-2"
          label="Set state of all motors to compliant"
          position="is-right"
          multilined
        )
          b-button(
            type="is-danger"
            @click="setState('compliant')"
            inverted focused
          )
            ext-b-icon(icon="bed")
        b-tooltip(
          class="pr-2"
          label="Set state of all motors to stiff"
          position="is-right"
          multilined
        )
          b-button(
            type="is-success"
            @click="setState('stiff')"
            inverted focused
          )
            ext-b-icon(icon="bolt")
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
        motor-control(:motor="motor")
</template>

<script>
import motors from '@/mixins/motors'
import MotorControl from '@/components/sub/MotorControl.vue'
import PUtils from '@/lib/poppy-utils'

export default {
  name: 'ControlView',
  mixins: [motors],
  components: { MotorControl },
  data: _ => ({ speed: null }),
  methods: {
    getState (motor) {
      return this.getRegister(motor, 'compliant')
    },
    async setState (state) {
      await PUtils.execute(state, ['all'])
    },
    async setSpeed () {
      if (!isNaN(this.speed)) {
        await PUtils.execute('speed', ['all'], this.speed)
      }
    }
  }
}
</script>
