<template lang="pug">
  div(class="box has-border-primary")
    div(class="columns is-paddingless is-mobile is-multiline is-vcentered")
      div(class="column is-narrow is-full-desktop")
        span(class="has-text-weight-bold is-size-5 has-text-primary") {{name}}:
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
            b-slider-tick(v-for="v in getTicks()" :value="v") {{ v }}
</template>

<script>
import store from '@/lib/store'

export default {
  name: 'Motor',
  data () {
    return {
      store,
      step: 10,
      slider: null
    }
  },
  props: {
    descriptor: Object,
    compliant: Boolean
  },
  watch: {
    slider: async function (value) {
      // Do not send a set position command
      // when motor is not driven with slider
      if (!this.compliant) {
        store.execute('position', [this.name], value)
      }
    },
    position: function (value) {
      if (this.compliant) {
        this.slider = value
      }
    }
  },
  mounted () {
    this.slider = this.position
  },
  computed: {
    name: function () { return this.descriptor.name },
    position: function () {
      return Math.round(
        store.mdata[this.name].position
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
  }
}
</script>
