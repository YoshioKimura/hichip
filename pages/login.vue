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
        md="6"
      >
        <v-card class="mb-3">
          <v-card-title>
            ログイン
          </v-card-title>
          <v-card-text>
            <UserAuthFrom
              @click="signIn"
              btn-text="ログイン"
            />
          </v-card-text>
          <SignInSocial v-if="false" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserAuthFrom from '@/components/UserAuthForm'
export default {
  components: {
    UserAuthFrom
  },
  data () {
    return {
    }
  },
  methods: {
    async signIn (args) {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: args.email,
            password: args.pw
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
