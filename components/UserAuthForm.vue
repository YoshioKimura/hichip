<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="userInfo.email"
      :rules="[required('name')]"
      label="ユーザー名"
      name="name"
    />
    <v-text-field
      v-model="userInfo.pw"
      :type="showPw ? 'text' : 'password'"
      :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[required('pw')]"
      @click:append="showPw = !showPw"
      label="パスワード"
      name="current-password"
    />
    <v-btn
      @click="submitForm(userInfo)"
      :disabled="!valid"
    >
      {{ btnText }}
    </v-btn>
  </v-form>
</template>

<script>
import validations from '@/utils/validations'

export default {
  props: ['btnText', 'hasName'],
  data () {
    return {
      valid: false,
      showPw: false,
      userInfo: {
        email: '',
        pw: '',
        name: ''
      },
      ...validations
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    click (type) {
      alert(type)
    },
    async getPosts () {
      this.posts = await this.$axios.$get(`/api/posts`, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    },
    submitForm (userInfo) {
      this.$emit('click', userInfo)
    }
  }
}
</script>
