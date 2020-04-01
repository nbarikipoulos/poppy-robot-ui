<template lang="pug">
  div(class="table-container")
    table(
      class="table is-fullwidth has-text-white has-text-weight-bold is-size-5 is-narrow has-text-centered"
    )
      thead
        th id
        th
          b-icon(pack="fas" icon="crosshairs")
        th
          b-icon(pack="fas" icon="gamepad")
        th
          b-icon(pack="fas" icon="tachometer-alt")
        th
          b-icon(pack="far" icon="lightbulb")
      tr(v-for="motor in getAllMotorIds()")
        td
          span {{ motor }}
        td
          span {{ Math.round(mdata[motor].present_position) }}
        td
          ExtIcon(:value="mdata[motor].compliant" :state="icons.compliant")
        td
          span {{ mdata[motor].moving_speed }}
        td
          ExtIcon(:value="mdata[motor].led" :state="icons.led")
</template>

<script>
'use strict'

import store from '@/lib/store'

const icons = {
  compliant: [
    { value: true, icon: 'bed', pack: 'fas' },
    { value: false, icon: 'bolt', pack: 'fas' }
  ],
  led: (value, old) => ({
    pack: value === 'off' ? 'fas' : 'fa',
    icon: value === 'off' ? 'minus' : 'sun',
    type: value === 'off' ? 'is-white' : `is-${value}`
  })
}

export default {
  name: 'Registers',
  data: _ => ({
    icons,
    clazz: 'is-narrow has-text-centered',
    mdata: store.mdata
  }),
  props: {
  },
  methods: {
    getAllMotorIds () { return store.pConnector.getPoppy().getAllMotorIds() }
  }
}
</script>
