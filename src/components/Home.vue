<template lang="pug">
  div
    b-navbar(type="is-primary")
      template(slot="brand")
        b-navbar-item(tag="div")
          b-tooltip(type="is-light" position="is-right")
            ext-b-icon(pack="fas" icon="info-circle")
            template(v-slot:content)
              span(
                class="has-text-primary"
              ) {{ settings.ip }}:{{ settings.port }}
      template(slot="end")
        b-navbar-item(tag="router-link" to="/dashboard") Dashboard
        b-navbar-item(tag="router-link" to="/control") Control
    router-view(class="view")
</template>

<script>
import store from '@/lib/store'

export default {
  name: 'Main',
  data: _ => ({ settings: store.connect })
}
</script>
