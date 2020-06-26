<template lang="pug">
  b-icon(:pack="current.pack" :icon="current.icon" :type="current.type")
</template lang="pug">
<script>
export default {
  name: 'ext-b-icon',
  data () {
    return {
      current: {
        icon: undefined,
        pack: undefined,
        type: undefined
      }
    }
  },
  props: {
    pack: String,
    icon: String,
    type: String,
    value: undefined, // The observable value
    state: [Array, Function]
  },
  watch: {
    value (value, old) {
      const state = this.getState(value)
      this.setCurrentState(state)
    }
  },
  methods: {
    getState (value) {
      let state = {}
      if (this.state instanceof Function) {
        state = this.state(value)
      } else if (this.state instanceof Array) {
        state = this.state.find(elt => {
          return elt.value === value
        })
      } else if (this.state) {
        throw new TypeError(
          'ext-b-icon: use a function or an array for state'
        )
      }

      return state
    },
    setCurrentState (state) {
      ['pack', 'icon', 'type'].forEach(key => {
        const value = state[key]
        this.current[key] = value === undefined ? this[key] : value
      })
    }
  },
  mounted () {
    const state = this.getState(this.value)
    this.setCurrentState(state)
  }
}
</script>
