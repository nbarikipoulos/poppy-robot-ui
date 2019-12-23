<template>
    <section>
      <div class="box">
        <b-field>
          <b-input type="text" v-model="store.hostname"/>
          <p class="control">
            <b-button type="is-primary" @click="connect">Connect</b-button>
          </p>
        </b-field>
      </div>
    </section>
</template>

<script>

import store from '@/lib/store'

export default {
  name: 'Connect',
  data () {
    return {
      store
    }
  },
  props: {

  },
  methods: {
    async connect () { await store.init() }
  }
}
</script>
