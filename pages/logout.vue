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
      this.$store.commit('snackbar/showSnackbar', { text: 'ログアウトに成功しました', color: 'success' })
      this.$router.push('/login')
    }
  }
}
</script>
