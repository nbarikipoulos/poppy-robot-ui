<template lang="pug">
  div(class="box has-border-primary")
    div(class="columns is-paddingless is-mobile is-multiline is-vcentered")
      div(class="column is-narrow is-full-desktop")
        span(class="has-text-weight-bold is-size-5") {{name}}:
      div(class="column is-full-desktop")
        b-field(expanded)
          b-slider(
            :min="range['min']"
            :max="range['max']"
            v-model="slider"
            :step="10"
            type="is-primary-bis"
            :disabled="compliant"
            size="is-medium"
          )
            b-slider-tick(
              v-for="v in getTicks()" :key="v" :value="v"
              class="has-text-text has-text-weight-bold"
            ) {{ v }}
</template>

<script>
import store from '@/lib/store'

export default {
  name: 'Motor',
  data: _ => ({
    step: 10,
    slider: null,
    mdata: store.mdata
  }),
  props: {
    descriptor: Object,
    compliant: Boolean
  },
  watch: {
    slider: async function (value) {
      // Do not send a set position command
      // when motor is not driven with slider
      if (!this.compliant) {
        store.pConnector.execute('position', [this.name], value)
      }
    },
    position: function (value) {
      if (this.compliant) {
        this.slider = value
      }
    }
  },
  computed: {
    name: function () { return this.descriptor.name },
    position: function () {
      return Math.round(
        this.mdata[this.name].present_position
      )
    },
    range: function () {
      const [min, max] = [
        this.descriptor.lower_limit,
        this.descriptor.upper_limit
      ].sort().map(Math.round)

      return { min, max }
    }
  },
  methods: {
    getTicks () { return [this.range.min, 0, this.range.max] }
  },
  mounted () {
    this.slider = this.position
  }
}
</script>
