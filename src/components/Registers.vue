<template lang="pug">
  div(class="box table-container")
    table(
      class="table is-fullwidth has-text-primary has-text-weight-bold is-size-5"
      :class="clazz"
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
        th
          b-icon(pack="fas" icon="thermometer-half")
      tr(
        v-for="motor in getAllMotorIds()"
        :class="clazz"
      )
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
        td
          span {{ mdata[motor].present_temperature }}
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
    type: value === 'off' ? 'is-primary' : `is-${value}`
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
