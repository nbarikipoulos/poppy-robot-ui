<template lang="pug">
    b-tooltip(:label="label" :active="showTooltip")
      ext-b-icon(v-if="!control" :pack="state.pack" :icon="state.icon")
      div(v-else)
        b-button(
          :class="clazz"
          size="is-small"
          @click="input = !input"
          inverted focused
          :type="state.type"
        )
          ext-b-icon(
            :pack="state.pack"
            :icon="state.icon"
          )
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
      let result = { pack: 'fa', icon: 'bug', type: 'is-black' }
      switch (this.regValue) {
        case true: result = { pack: 'fas', icon: 'bed', label: 'compliant', type: 'is-success' }; break
        case false: result = { pack: 'fas', icon: 'bolt', label: 'stiff', type: 'is-danger' }; break
      }

      return result
    },
    label () { return `state: ${this.state.label}` },
    pack () { return this.state.pack },
    icon () { return this.state.icon },
    type () { return this.state.type }
  }
}
</script>
