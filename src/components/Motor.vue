<template lang="pug">
  div(class="column is-half-tablet is-one-quarter-desktop")
    div(class="box has-border-primary")
      div(class="columns is-paddingless is-mobile is-multiline")
        div(class="column is-narrow is-full-desktop")
          span(class="has-text-weight-bold is-size-5 has-text-primary") {{descriptor.name}}:
        div(class="column is-full-desktop")
          b-field(expanded)
            b-slider(
              :min="lowerLimit"
              :max="upperLimit"
              v-model="position"
              :step="10"
              ticks
              type="is-primary"
              :disabled="compliant"
            )
        div(class="column is-narrow is-full-desktop is-hidden-desktop")
          b-taglist(attached)
            b-tag(type="is-primary") {{lowerLimit}}
            b-tag(type="is-white") {{position}}
            b-tag(type="is-primary") {{upperLimit}}
        div(class="column is-hidden-touch")
          p {{lowerLimit}} / {{position}} / {{upperLimit}}
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
    lowerLimit: function () {
      return Math.round(
        this.descriptor.lower_limit < this.descriptor.upper_limit
          ? this.descriptor.lower_limit
          : this.descriptor.upper_limit
      )
    },
    upperLimit: function () {
      return Math.round(
        this.descriptor.lower_limit > this.descriptor.upper_limit
          ? this.descriptor.lower_limit
          : this.descriptor.upper_limit

      )
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
