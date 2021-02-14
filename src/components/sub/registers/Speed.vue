<template lang="pug">
    b-tooltip(label="moving speed" :active="showTooltip")
      div(class="vcenter")
        ext-b-icon(
          v-if="showIcon"
          pack="fas"
          icon="tachometer-alt"
        )
        span(v-if="!control") {{ valueToDisplay }}
        b-dropdown(
          v-else
          aria-role="dialog"
          :mobile-modal="true"
          trap-focus
          @active-change="eventHandler"
        )
          a(
            class="a-register"
            :class="clazz"
            slot="trigger"
            role="button"
          )
            span {{ valueToDisplay }}
          modal-item(
            :motor="motor"
            :register="register"
            style="min-width:275px;"
          )
            template(#body)
              b-field
                b-numberinput(
                  v-model="input"
                  :controls="true"
                  :lazy="true"
                  size="is-small"
                  controls-position="compact"
                  step="10"
                  min-step="1"
                  min="0"
                  max="1023"
                )
</template>

<script>
'use strict'

import register from '@/mixins/register'
import ModalItem from './utils/ModalItem'

export default {
  name: 'Speed',
  mixins: [register],
  components: { ModalItem },
  data: _ => ({ register: 'moving_speed' }),
  methods: { eventHandler (event) { this.inputInProgress = event } },
  mounted () { this.inputInProgress = false }
}
</script>
