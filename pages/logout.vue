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
      this.$router.push('/login')
    }
  }
}
</script>
