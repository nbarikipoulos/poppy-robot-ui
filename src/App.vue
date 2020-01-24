<template lang="pug">
  div(id="app")
    router-view
</template>

<script>
export default { name: 'app' }
</script>

<style lang="scss">
  @charset "utf-8";

  #app {
    margin: 5px;
  }

  $primary: #32485F;;
  $text: $primary;
  $input-color: $text;
  $input-border-color:   #32485F;
  $input-hover-color:  #a5c7f3;

  $column-gap: 5px;

  @import "~bulma/sass/utilities/_all";
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
