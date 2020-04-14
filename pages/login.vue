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
            ログイン
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="email"
              prepend-icon="mdi-email"
              label="メールアドレス"
              type="email"
            />
            <v-text-field
              v-model="password"
              prepend-icon="mdi-key"
              label="パスワード"
              type="password"
            />
            <v-card-actions>
              <v-btn
                @click.prevent="signIn"
                block
                color="primary"
              >
                ログイン
              </v-btn>
            </v-card-actions>
          </v-card-text>
          <SignInSocial v-if="false" />
        </v-card>
        <div>
          <nuxt-link to="/register">
            会員登録がまだの方はこちらから
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
      email: ''
    }
  },
  methods: {
    async signIn () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        alert('[Error]' + e)
      }
    }
  }
}
</script>
