<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="mb-3">
          <v-card-title>
            会員登録
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              prepend-icon="mdi-account"
              label="お名前"
              type="text"
            />
            <v-text-field
              v-model="email"
              prepend-icon="mdi-email"
              label="メールアドレス"
              type="email"
            />
            <v-text-field
              v-model="password"
              prepend-icon="mdi-key"
              label="パスワード(ハッシュ化されて保存されます)"
              type="password"
            />
            <v-card-actions>
              <v-btn
                @click.prevent="signIn"
                block
                color="primary"
              >
                登録する
              </v-btn>
            </v-card-actions>
          </v-card-text>
          <SignInSocial v-if="false" />
        </v-card>
        <div>
          <nuxt-link to="/login">
            ログインはこちらから
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      email: '',
      name: ''
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('register/register', {
        email: this.email,
        password: this.password,
        name: this.name
      })
    }
  }
}
</script>
