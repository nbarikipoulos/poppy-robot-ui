<template lang="pug">
  div(class="box has-border-primary")
    div(class="columns is-paddingless is-mobile is-multiline")
      div(class="column is-narrow is-full-desktop")
        span(class="has-text-weight-bold is-size-5 has-text-primary") {{name}}:
      div(class="column is-full-desktop")
        b-field(expanded)
          b-slider(
            :min="range['min']"
            :max="range['max']"
            v-model="slider"
            :step="10"
            ticks
            type="is-primary"
            :disabled="compliant"
          )
      div(class="column is-narrow is-full-desktop is-hidden-desktop")
        b-taglist(attached)
          b-tag(type="is-primary") {{ range['min'] }}
          b-tag(type="is-white") {{ position }}
          b-tag(type="is-primary") {{ range['max'] }}
      div(class="column is-hidden-touch")
        p {{ range['min'] }} / {{ position }} / {{ range['max'] }}
        //- MotorChart(
        //-   :name="name"
        //-   :data="store.mdata[name].data"
        //- )
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
  }
}
</script>
