<template>
  <div>
    ログアウトしています...
  </div>
</template>
<script>
export default {
  created () {
    this.signOut()
  },
  methods: {
    async signOut () {
      await this.$auth.logout()
      this.$store.dispatch('snackbar/setSnackbar', { text: `ログアウトしました` })
      this.$router.push('/login')
    }
  }
}
</script>
