<template lang="pug">
  section
    div(class="columns is-multiline")
      div(
        v-for="desc in getMotorDescriptors()"
        class="column is-2"
      )
        MotorChart(
          :name="desc.name"
          :data="store.mdata[desc.name].data"
          :height="200"
        )
</template>

<script>

import store from '@/lib/store'

export default {
  name: 'Dashboard',
  components: {},
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
