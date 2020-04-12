<template>
  <v-card
    @click="sendTip"
    width="150"
    class="d-flex flex-wrap ma-4"
  >
    <v-img :src="user.img" />
    <v-card-text>
      <div class="font-weight-black">
        {{ user.name }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    sendTip () {
      this.$emit('openDialog', this.user)
    }
  }
}
</script>
