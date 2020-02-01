<template lang="pug">
  div(class="box has-border-primary")
    div(class="columns is-paddingless is-mobile is-multiline")
      div(class="column is-narrow is-full-desktop")
        span(class="has-text-weight-bold is-size-5 has-text-primary") {{descriptor.name}}:
      div(class="column is-full-desktop")
        b-field(expanded)
          b-slider(
            :min="range['min']"
            :max="range['max']"
            v-model="position"
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
</template>

<script>
import EventBus from '@/lib/eventBus'
import store from '@/lib/store'

export default {
  name: 'Motor',
  data () {
    return {
      step: 10,
      store,
      name,
      position: NaN
    }
  },
  props: {
    descriptor: Object,
    compliant: Boolean
  },
  watch: {
    position: async function (value) {
      // Do not send a set position command
      // when motor is not driven with slider
      if (!this.compliant) {
        this.store.execute('position', [this.name], value)
      }
    }
  },
  computed: {
    range: function () {
      const values = [
        this.descriptor.lower_limit,
        this.descriptor.upper_limit
      ].sort().map(Math.round)

      return {
        min: values[0],
        max: values[1]
      }
    }
  },
  created () {
    this.name = this.descriptor.name
  },
  mounted () {
    EventBus.$on('DATA_POSITION', (data) => {
      // Do not update position from querying request
      // when motor is driven by the slider
      if (this.compliant) {
        this.position = Math.round(data[this.name].present_position)
      }
    })
  }
}
</script>
