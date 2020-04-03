<template lang="pug">
  section
    div(class="tile is-ancestor")
      div(class="tile is-parent is-8")
        div(class="tile is-child box")
          Registers
      div(class="tile is-parent is-4")
        div(class="tile is-child box")
          PolarPositionsChart
</template>

<script>
import Registers from '@/components/Registers'
import PolarPositionsChart from '@/components/PolarPositionsChart'

export default {
  name: 'DashboardView',
  components: { Registers, PolarPositionsChart }
}
</script>
