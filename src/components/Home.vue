<template lang="pug">
  div
    b-navbar(type="is-primary")
      template(slot="end")
        b-navbar-item(tag="router-link" to="/dashboard") Dashboard
        b-navbar-item(tag="router-link" to="/control") Control
    router-view
</template>

<script>
export default {
  name: 'Main'
}
</script>
