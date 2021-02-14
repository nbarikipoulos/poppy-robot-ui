<template lang="pug">
  b-tooltip(:label="label" :active="showTooltip")
    div(:class="{ vcenter: showIcon }")
      ext-b-icon(v-if="showIcon" pack="fas" icon="crosshairs")
      span(
        v-if="!control || !editable"
      ) {{ valueToDisplay }}
      b-dropdown(
        v-else
        aria-role="dialog"
        :mobile-modal="true"
        append-to-body
        trap-focus
        @active-change="eventHandler"
      )
        a(
          class="a-register"
          :class="clazz"
          slot="trigger"
          role="button"
        )
          span(class="has-text-centered") {{ valueToDisplay }}
        modal-item(
          :motor="motor"
          :register="register"
          style="min-width:300px;"
        )
          template(#body)
            b-field
              b-slider(
                v-model="input"
                v-bind="range"
                :step="10"
                :lazy="false"
                type="is-primary"
                size="is-medium"
              )
                b-slider-tick(
                  v-for="v in ticks" :key="v" :value="v"
                  class="has-text-weight-bold"
                ) {{ v }}
</template>

<script>
'use strict'

import register from '@/mixins/register'
import ModalItem from './utils/ModalItem'

export default {
  name: 'Position',
  mixins: [register],
  components: { ModalItem },
  data: _ => ({ register: 'present_position' }),
  computed: {
    editable () { return !this.getRegister('compliant') },
    ticks () { return [this.range.min, 0, this.range.max] },
    label () { return `range: [${this.range.min}/${this.range.max}]` }
  },
  methods: { eventHandler (event) { this.inputInProgress = event } },
  mounted () { this.inputInProgress = false }
}
</script>
