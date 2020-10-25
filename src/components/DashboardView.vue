<template lang="pug">
  section
    div(class="box")
      b-field(grouped)
        b-switch(
          v-model="showAsCard"
          type="is-primary"
          :rounded="false"
        )
          span(class="has-text-primary has-text-weight-semibold") Show as card
        b-field(v-if="showAsCard")
          b-tooltip(label="Number of column")
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
        :class="`box column ${colSize}`"
        :key="motor"
        :motor="motor"
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
    colSize () {
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
