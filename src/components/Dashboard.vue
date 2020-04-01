<template lang="pug">
  section
    div(class="tile is-ancestor")
      div(class="tile is-parent is-8")
        div(class="tile is-child box")
          Registers
      div(class="tile is-parent is-4")
        div(class="tile is-child box")
          AllPositionsChart
</template>

<script>
import Registers from '@/components/Registers'
import AllPositionsChart from '@/components/AllPositionsChart'

export default {
  name: 'Dashboard',
  components: { Registers, AllPositionsChart }
}
</script>
