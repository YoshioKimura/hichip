<template>
  <v-list-item>
    <v-list-item-avatar size="80">
      <v-img :src="user.img" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-subtitle v-text="user.name" />
      <button @click="sendTip">チップを贈る</button>
    </v-list-item-content>
  </v-list-item>
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
