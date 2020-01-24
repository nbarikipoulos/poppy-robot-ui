<template lang="pug">
  div
    b-navbar(v-if="showNavBar" type="is-primary")
      template(slot="end")
        b-navbar-item(tag="router-link" to="/control") Control
    router-view
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      showNavBar: false
    }
  }
}
</script>
