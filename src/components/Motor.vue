<template>
  <div class="column is-half-tablet is-one-third-desktop">
    <div class="box has-border-primary">
      <div class="columns is-paddingless is-mobile is-multiline">
        <div class="column is-narrow is-full-desktop">
        <span
          class="has-text-weight-bold is-size-5 has-text-primary"
        >
          {{descriptor.name}}:
        </span>
        </div>
        <div class="column is-full-desktop">
          <b-field expanded>
          <b-slider
            :min="lowerLimit"
            :max="upperLimit"
            v-model="position"
            :step="10"
            ticks
            type="is-primary"
            :disabled="!store.isAddressable()"
          />
          </b-field>
        </div>
        <div class="column is-narrow is-full-desktop">
          <span class="tags has-addons">
            <span class="tag is-primary">{{lowerLimit}}</span>
            <span class="tag is-white">{{position}}</span>
            <span class="tag is-primary">{{upperLimit}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import EventBus from '@/lib/eventBus'
import store from '@/lib/store'

export default {
  name: 'Motor',
  data () {
    return {
      step: 10,
      store,
      name,
      position: NaN
    }
  },
  props: {
    descriptor: {}
  },
  watch: {
    position: async function () {
      if (this.store.isAddressable()) {
        this.store.execute('position', [this.name], this.position)
      }
    }
  },
  created () {
    this.name = this.descriptor.name
  },
  mounted () {
    EventBus.$on('DATA_POSITION', (data) => {
      if (!this.store.isAddressable()) {
        this.position = Math.round(data[this.name].present_position)
      }
    })
  },
  computed: {
    lowerLimit: function () {
      return Math.round(
        this.descriptor.lower_limit < this.descriptor.upper_limit
          ? this.descriptor.lower_limit
          : this.descriptor.upper_limit
      )
    },
    upperLimit: function () {
      return Math.round(
        this.descriptor.lower_limit > this.descriptor.upper_limit
          ? this.descriptor.lower_limit
          : this.descriptor.upper_limit

      )
    }
  }
}
</script>
