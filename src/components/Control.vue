<template lang="pug">
  section
    div(class="box")
      div(class="columns is-mobile")
        div(class="column is-narrow")
          b-field
            b-switch(v-model="isAddressable") Is Addressable
        div(class="column")
          b-field(label="Speed" label-position="on-border")
            b-input(v-model="speed"  placeholder="Set all motors speed")
            p(class="control")
              b-button(type="is-primary" @click="setSpeed") Set
    div(class="columns is-multiline")
      Motor(
        v-for="desc in getMotorDescriptors()"
        :key="desc.name"
        v-bind:descriptor="desc"
      )
</template>

<script>
import Motor from '@/components/Motor.vue'

import store from '@/lib/store'

export default {
  name: 'Control',
  components: {
    Motor
  },
  data () {
    return {
      store,
      isAddressable: false,
      speed: null
    }
  },
  props: {
    descriptor: {}
  },
  watch: {
    isAddressable: async function () {
      this.store.setAddressable(this.isAddressable)
      await this.store.execute(
        'compliant',
        ['all'],
        !this.isAddressable
      )
    }
  },
  methods: {
    getMotorDescriptors () {
      return this.store.isConnected() // Useful?
        ? this.store.getPoppy().getDescriptor().motors
        : []
    },
    async setSpeed () {
      if (this.speed) {
        await this.store.execute(
          'speed',
          ['all'],
          this.speed
        )
      }
    }
  }
}
</script>
