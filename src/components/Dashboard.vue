<template lang="pug">
  section
    div(class="tile is-ancestor")
      div(class="tile is-parent")
        div(class="tile box is-child is-8")
          Registers
        div(class="tile box is-child is-4")
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
