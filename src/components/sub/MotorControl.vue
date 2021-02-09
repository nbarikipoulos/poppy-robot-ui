<template lang="pug">
  div(class="box")
    div(class="columns is-mobile is-multiline is-vcentered")
      div(class="column is-narrow is-full-desktop")
        span(class="has-text-weight-bold is-size-5") {{ motor }}:
      div(class="column is-full-desktop")
        b-field(expanded)
          b-slider(
            :min="range['min']"
            :max="range['max']"
            v-model="slider"
            :step="10"
            type="is-primary"
            :disabled="compliant"
            size="is-medium"
          )
            b-slider-tick(
              v-for="v in ticks" :key="v" :value="v"
              class="has-text-text has-text-weight-bold"
            ) {{ v }}
</template>

<script>

import PUtils from '@/lib/poppy-utils'
import motor from '@/mixins/motor'

export default {
  name: 'MotorControl',
  mixins: [motor],
  data: _ => ({
    step: 10,
    slider: null
  }),
  watch: {
    async slider (value) {
      // Do not send a set position command
      // when motor is not driven with slider
      if (!this.compliant) {
        PUtils.execute('position', [this.motor], value)
      }
    },
    position (value) {
      if (this.compliant) {
        this.slider = value
      }
    }
  },
  computed: {
    position () {
      return Math.round(
        this.getRegister('present_position')
      )
    },
    ticks () { return [this.range.min, 0, this.range.max] },
    compliant () { return this.getRegister('compliant') }
  },
  mounted () {
    this.slider = this.position
  }
}
</script>
