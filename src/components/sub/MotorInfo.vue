<template lang="pug">
  b-tooltip
    span(
      class="tag has-text-weight-bold is-medium px-2"
    ) {{ motor }}
    template(v-slot:content)
      div(class="has-text-left")
        p type: {{ descriptor.model }}
        p id: {{ descriptor.id }}
</template>

<script>
'use strict'
import motor from '@/mixins/motor'

export default {
  name: 'MotorInfo',
  mixins: [motor]
}
</script>
