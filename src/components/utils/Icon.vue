<template lang="pug">
  b-icon(
    :size="size"
    v-bind="ico"
  )
</template lang="pug">
<script>
export default {
  name: 'ext-b-icon',
  props: {
    pack: String,
    icon: String,
    type: String,
    size: { type: String, default: 'is-medium' },
    value: undefined,
    state: [Array, Function],
    errIcon: { type: Object, default: _ => ({ icon: 'bug' }) }
  },
  computed: {
    ico () {
      const res = {}

      const state = this.getState(this.value)
      const arr = ['pack', 'icon', 'type']

      arr.forEach(key => {
        res[key] = state[key] || this[key]
      })

      return { ...this.errIcon, ...res }
    }
  },
  methods: {
    getState (value) {
      let state = {}
      if (typeof this.state === 'function') {
        state = this.state(value)
      } else if (Array.isArray(this.state)) {
        state = this.state.find(elt => {
          return elt.value === value
        })
      } else if (this.state) {
        throw new TypeError(
          'ext-b-icon: Use a function or an array for state'
        )
      }

      return state || {}
    }
  }
}
</script>
