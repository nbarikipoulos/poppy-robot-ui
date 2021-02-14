<template lang="pug">
  b-table(
    :data="data"
    :mobile-cards="false"
  )
    //
    // Motor
    //
    b-table-column(label="name" v-bind="cell")
      // Header
      template(#header="{ column }")
        span {{ column.label }}
      template(#default="props")
        // Cell
        motor-info(:motor="props.row.motor")
    //
    // Compliant
    //
    b-table-column(custom-key="compliant" v-bind="cell")
      template(#header="{ column }")
        ext-b-icon(pack="fas" icon="gamepad")
      template(#default="props")
        compliant(:motor="props.row.motor" :showTooltip="false")
    //
    // Speed
    //
    b-table-column(custom-key="moving_speed" v-bind="cell")
      template(#header="{ column }")
        b-tooltip(label="moving speed")
          ext-b-icon(pack="fas" icon="tachometer-alt")
      template(#default="props")
        speed(:motor="props.row.motor" :showTooltip="false")
    //
    // Position
    //
    b-table-column(custom-key="present_position" v-bind="cell")
      template(#header="{ column }")
        ext-b-icon(pack="fas" icon="crosshairs")
      template(#default="props")
        div(class="columns is-vcentered")
          position(
            class="column is-2-tablet is-narrow-mobile"
            :motor="props.row.motor"
          )
          motor-chart(
            class="box column is-paddingless is-hidden-mobile"
            :motor="props.row.motor"
            :styles="{ height: '35px' }"
          )
    //
    // Temperature
    //
    b-table-column(custom-key="present_temperature" v-bind="cell")
      template(#header="{ column }")
        temperatureMax(:motors="motors")
      template(#default="props")
        temperature(:motor="props.row.motor" labelType="tag")
    //
    // LED
    //
    b-table-column(custom-key="led" v-bind="cell")
      template(#header="{ column }")
        ext-b-icon(pack="far" icon="lightbulb")
      template(#default="props")
        led(:motor="props.row.motor" :showTooltip="false")
</template>

<script>
'use strict'
import motors from '@/mixins/motors'
import MotorChart from '@/components/sub/MotorChart'
import * as RegisterComponents from '@/components/sub/registers/index'
import MotorInfo from '@/components/sub/MotorInfo'

const cell = {
  class: 'has-text-weight-semibold',
  centered: true
}

export default {
  name: 'Registers',
  mixins: [motors],
  components: { MotorChart, ...RegisterComponents, MotorInfo },
  data: _ => ({ cell }),
  computed: {
    data () { return this.motors.map(motor => ({ motor })) }
  }
}
</script>
