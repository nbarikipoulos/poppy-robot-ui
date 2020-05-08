<template lang="pug">
  section
    div(class="tile is-ancestor")
      div(class="tile is-parent is-8")
        div(class="tile is-child box")
          Registers(:motors="motors")
      div(class="tile is-parent is-4")
        div(class="tile is-child box")
          PolarPositionsChart(:motors="motors")
</template>

<script>
import motors from '@/mixins/motors'
import Registers from '@/components/sub/Registers'
import PolarPositionsChart from '@/components/sub/PolarPositionsChart'

export default {
  name: 'DashboardView',
  mixins: [motors],
  components: { Registers, PolarPositionsChart }
}
</script>
