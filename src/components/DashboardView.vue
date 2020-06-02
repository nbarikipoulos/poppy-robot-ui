<template lang="pug">
  section
    div(v-if="false" class="box")
      div(class="columns is-mobile")
        div(class="column is-narrow")
          b-field
            b-switch(
              v-model="showAsCard"
              type="is-primary"
              :rounded="false"
            ) Show as card
    div(
      v-if="showAsCard"
      class="columns is-multiline"
    )
      motor-panel(
        v-for="motor in motors"
        :key="motor"
        :motor="motor"
        class="column"
      )
    div(v-else class="tile is-ancestor")
      div(class="tile is-parent is-8")
        div(class="tile is-child box")
          registers(:motors="motors")
      div(class="tile is-parent is-4")
        div(class="tile is-child box")
          polar-positions-chart(:motors="motors")
</template>

<script>
import motors from '@/mixins/motors'
import MotorPanel from '@/components/sub/MotorPanel'
import Registers from '@/components/sub/Registers'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'

import store from '@/lib/store'

export default {
  name: 'DashboardView',
  mixins: [motors],
  components: { MotorPanel, Registers, PolarPositionsChart },
  data: _ => ({ settings: store.panel.dashboard }),
  computed: {
    showAsCard: {
      get () { return this.settings.showAsCard },
      set (value) { this.settings.showAsCard = value }
    }
  }
}
</script>
