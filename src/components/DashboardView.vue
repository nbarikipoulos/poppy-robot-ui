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
        div(class="column is-narrow")
          b-field
            b-select(
              icon-pack="fas"
              icon="columns"
              type="is-primary"
              class="has-text-color-primary"
              v-model="settings.col"
            )
              option(v-for="v in [3, 4, 6]" :value="v") {{ v }}
    div(
      v-if="!showAsCard"
      class="tile is-ancestor"
    )
      div(class="tile is-parent is-8")
        div(class="tile is-child box")
          registers(:motors="motors")
      div(class="tile is-parent is-4")
        div(class="tile is-child box")
          polar-positions-chart(:motors="motors")
    div(v-else class="columns is-multiline")
      motor-panel(
        v-for="motor in motors"
        :key="motor"
        :motor="motor"
        :class="`column ${colSize}`"
      )
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
    colSize: function () {
      const colSize = 12 / this.settings.col
      return `is-${colSize}`
    },
    showAsCard: {
      get () { return this.settings.showAsCard },
      set (value) { this.settings.showAsCard = value }
    }
  }
}
</script>
