<template lang="pug">
  div(id="app")
    Control(v-if="store.isConnected()")
    Connect(v-else)
</template>

<script>

import Connect from '@/components/Connect.vue'
import Control from '@/components/Control.vue'

import store from '@/lib/store'

export default {
  name: 'app',
  components: {
    Connect,
    Control
  },
  data () {
    return {
      store
    }
  },
  async created () {
    // Uncomment to auto-connect
    // await store.init()
  }
}
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
