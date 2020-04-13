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
            法人登録
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              prepend-icon="mdi-account"
              label="法人名"
              type="text"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      password: '',
      email: '',
      name: ''
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
        this.$router.push('/timeline')
      } catch (e) {
        alert('[Error]' + e)
      }
      // this.$store.dispatch('register/register', {
      //   email: this.email,
      //   password: this.password,
      //   name: this.name
      // })
    }
  }
}
</script>
