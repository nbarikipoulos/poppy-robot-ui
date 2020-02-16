<template lang="pug">
  div(id="app")
    router-view
</template>

<script>
export default { name: 'app' }
</script>

<style lang="scss">
  @import "@/assets/styles/my.scss";
  @import "~buefy/src/scss/buefy";
</style>
