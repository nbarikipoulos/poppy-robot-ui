<template lang="pug">
  b-dropdown-item(
    aria-role="listitem"
    :focusable="false"
    paddingless
    custom
  )
    div(class="modal-card mx-0" style="width:auto;")
      header(class="modal-card-head py-2 px-5")
        slot(name="header")
          span(class="has-text-weight-bold has-text-primary") {{ motor }}: Set register '{{ register }}'
      section(class="is-primary py-3 px-5")
        slot(name="body")
      footer(class="modal-card-foot py-2 px-2 mt-0")
        slot(name="footer")
          div(class="container")
            b-button(
              class="is-small is-pulled-right"
              label="close"
              type="is-primary"
              @click="closeModal()"
            )
</template>

<script>
export default {
  name: 'ModalItem',
  props: ['motor', 'register'],
  methods: {
    closeModal () { this.$parent.isActive = false }
  }
}
</script>
