<template lang="pug">
  section
    div(class="tile is-ancestor")
      div(class="tile is-parent")
        Registers(class="tile is-child box is-8")
        AllPositionsChart(class="tile is-child box is-4")
</template>

<script>
import Registers from '@/components/Registers'
import AllPositionsChart from '@/components/AllPositionsChart'

export default {
  name: 'Dashboard',
  components: { Registers, AllPositionsChart }
}
</script>
