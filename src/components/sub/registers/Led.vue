<template lang="pug">
    b-tooltip(:label="label" :active="showTooltip")
      ext-b-icon(:value="value" :state="state")
</template>

<script>
'use strict'

import register from '@/mixins/register'

const state = (value, old) => ({
  pack: value === 'off' ? 'fas' : 'fa',
  icon: value === 'off' ? 'minus' : 'sun',
  type: value === 'off' ? 'is-primary' : `is-${value}`
})

export default {
  name: 'Led',
  mixins: [register],
  data: _ => ({ state }),
  props: {
    value: { type: String, default: 'off' }
  },
  computed: {
    label: function () {
      return this.value === 'off' ? 'LED off' : this.value
    }
  }
}
</script>
