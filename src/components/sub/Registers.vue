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
        th
          ExtIcon(:value="temperatureMax" :state="icons.temperature")
      tr(v-for="(motorId, i) in motorIds")
        td
          span {{ motorId }}
        td
          span {{ Math.round(mdata[motorId].present_position.current) }}
        td
          ExtIcon(:value="mdata[motorId].compliant.current" :state="icons.compliant")
        td
          span {{ mdata[motorId].moving_speed.current }}
        td
          ExtIcon(:value="mdata[motorId].led.current" :state="icons.led")
        td
          span(:class='motorTempText[i]') {{ temperatures[i] }}
</template>

<script>
'use strict'

import store from '@/lib/store'
import T from '@/lib/utils/tBranding'

const icons = {
  compliant: [
    { value: true, icon: 'bed', pack: 'fas' },
    { value: false, icon: 'bolt', pack: 'fas' }
  ],
  led: (value, old) => ({
    pack: value === 'off' ? 'fas' : 'fa',
    icon: value === 'off' ? 'minus' : 'sun',
    type: value === 'off' ? 'is-white' : `is-${value}`
  }),
  temperature: (value, old) => {
    const t = T(value)
    return { ...t.icon, type: `is-${t.color}` }
  }
}

export default {
  name: 'Registers',
  data: _ => ({ icons, mdata: store.mdata }),
  props: {
    motorIds: { type: Array, default: _ => store.getAllMotorIds() }
  },
  computed: {
    temperatures: function () {
      return this.motorIds.map(motorId => this.mdata[motorId].present_temperature.current)
    },
    temperatureMax: function () { return Math.max(...this.temperatures) },
    motorTempText: function () {
      return this.temperatures.map(temp => {
        const t = T(temp)
        return t.level !== 'ok' ? `has-text-${t.color}` : ''
      })
    }
  }
}
</script>
