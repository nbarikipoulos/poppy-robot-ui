<template lang="pug">
  b-tooltip(:label="label" :active="showTooltip")
    ext-b-icon(v-if="!control" v-bind="getBr(regValue)")
    b-dropdown(v-else
      v-model="input"
      aria-role="list"
      position="is-bottom-left"
    )
      b-button(
        :class="clazz"
        type="button"
        slot="trigger"
        size="is-small"
      )
        ext-b-icon(v-bind="getBr(regValue)" size="is-small")
      b-dropdown-item(
        v-for="led of LEDs"
          :key="led.literal"
          :value="led.literal"
          aria-role="listitem"
        )
        div(class="media")
          ext-b-icon(
            class="media-left"
            v-bind="getBr(led.literal)"
          )
          div(class="media-content")
            span {{ led.literal }}
</template>

<script>
'use strict'

import register from '@/mixins/register'
import LEDs from '@/lib/utils/led'

export default {
  name: 'Led',
  mixins: [register],
  props: {
    off: { type: String, default: 'is-primary' }
  },
  data: _ => ({ LEDs, register: 'led' }),
  computed: {
    label () { return `LED: ${this.valueToDisplay}` }
  },
  methods: {
    getBr (value) {
      let result
      const offType = this.off
      switch (value) {
        case 'off':
          result = { pack: 'fas', icon: 'minus', type: offType }; break
        default:
          result = { pack: 'fa', icon: 'lightbulb', type: `is-${value}` }
      }
      return result
    }
  }
}
</script>
