<template lang="pug">
  section
    div(class="box columns is-multiline")
      Registers(class="column is-6")
</template>

<script>
import Registers from '@/components/Registers'

export default {
  name: 'Dashboard',
  components: { Registers }
}
</script>
