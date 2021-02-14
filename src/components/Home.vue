<template lang="pug">
  div
    nav(class="level box py-1 px-1 is-mobile")
      div(class="level-left")
        div(class="level-item is-hidden-mobile")
          b-field(grouped)
            b-switch(
              v-model="showAsCard"
              type="is-primary"
              :rounded="false"
            )
              span Show as card
            b-field(v-if="showAsCard" type="is-primary")
              b-tooltip(label="Number of column" position="is-right")
                b-select(
                  icon-pack="fas"
                  icon="columns"
                  size="is-small"
                  v-model="dashboard.col"
                )
                  option(v-for="v in [3, 4, 6]" :value="v") {{ v }}
      div(class="level-right")
        div(class="level-item")
          b-tooltip(type="is-primary" position="is-left")
            ext-b-icon(pack="fas" icon="info-circle" type="is-primary")
            template(v-slot:content)
              span {{ settings.hostname }}:{{ settings.port }}
    div(
      v-if="!showAsCard"
      class="tile is-ancestor"
    )
      div(class="tile is-parent is-8")
        div(class="tile is-child box py-0 px-1")
          registers(:motors="motors")
      div(class="tile is-parent is-4")
        div(class="tile is-child box py-1")
          polar-positions-chart(:motors="motors")
    div(
      v-else
      class="columns is-multiline px-1"
    )
      div(
        v-for="motor in motors"
        :class="`column ${colSize} px-1`"
      )
        motor-panel(class="box is-paddingless" :motor="motor")
</template>

<script>
import motors from '@/mixins/motors'
import MotorPanel from '@/components/sub/MotorPanel'
import Registers from '@/components/sub/Registers'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'

import store from '@/lib/store'

export default {
  name: 'Main',
  mixins: [motors],
  components: { MotorPanel, Registers, PolarPositionsChart },
  data: _ => ({ settings: store.connect, dashboard: store.dashboard }),
  computed: {
    colSize () {
      const colSize = 12 / this.dashboard.col
      return `is-${colSize}`
    },
    showAsCard: {
      get () { return this.dashboard.showAsCard },
      set (value) { this.dashboard.showAsCard = value }
    }
  }
}
</script>
