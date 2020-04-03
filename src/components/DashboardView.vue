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
import Registers from '@/components/sub/Registers'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'

export default {
  name: 'DashboardView',
  components: { Registers, PolarPositionsChart }
}
</script>
