<template lang="pug">
  section
    div(class="box columns is-multiline")
      Registers(class="column is-6")
      AllPositionsChart(class="column is-6")
</template>

<script>
import Registers from '@/components/Registers'
import AllPositionsChart from '@/components/AllPositionsChart'

export default {
  name: 'Dashboard',
  components: { Registers, AllPositionsChart }
}
</script>
