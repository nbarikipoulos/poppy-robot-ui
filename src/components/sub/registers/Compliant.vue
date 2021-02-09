<template lang="pug">
    b-tooltip(:label="label" :active="showTooltip")
      ext-b-icon(v-if="!control" v-bind="icon")
      div(v-else)
        b-button(
          :class="clazz"
          size="is-small"
          @click="input = !input"
          inverted focused
          :type="type"
        )
          ext-b-icon(v-bind="icon" :type="type")
</template>

<script>
'use strict'

import register from '@/mixins/register'

export default {
  name: 'Compliant',
  mixins: [register],
  data: _ => ({ register: 'compliant' }),
  computed: {
    command () { return this.input ? 'compliant' : 'stiff' },
    state () {
      let result = { pack: 'fa', icon: 'bug', label: this.invalid, type: 'is-black' }
      switch (this.regValue) {
        case true: result = { pack: 'fas', icon: 'bed', label: 'compliant', type: 'is-success' }; break
        case false: result = { pack: 'fas', icon: 'bolt', label: 'stiff', type: 'is-danger' }; break
      }

      return result
    },
    icon () { return { pack: this.state.pack, icon: this.state.icon } },
    type () { return this.state.type },
    label () { return `state: ${this.state.label}` }
  }
}
</script>
