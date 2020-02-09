<template lang="pug">
  section
    div(class="box columns is-multiline")
      div(
        v-for="desc in getMotorDescriptors()"
        class="column is-6"
      )
        MotorChart(
          class="box has-background-primary"
          :name="desc.name"
          :data="store.mdata[desc.name].data"
          :height="100"
        )
</template>

<script>

import store from '@/lib/store'

export default {
  name: 'Dashboard',
  data () {
    return {
      store
    }
  },
  methods: {
    getMotorDescriptors () { return this.store.getRobotDescriptor().motors }
  }
}
</script>
