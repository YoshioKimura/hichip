<template>
  <v-container>
    <v-row>
      <template v-for="(u, i) in users">
        <v-col
          v-if="u.id!==$auth.user.id"
          cols="6"
          sm="3"
          md="2"
        >
          <UserListItem
            :user="{...u, img: `https://i.pravatar.cc/150?id=${u.id}`}"
            :key="i"
            @openDialog="openDialog"
          />
        </v-col>
      </template>
    </v-row>
    <SendTipDialog
      :dialog="dialog"
      :user="user"
      @post="send"
      @close="dialog=false"
    />
  </v-container>
</template>

<script>
import UserListItem from '@/components/UserListItem'
import SendTipDialog from '@/components/SendTipDialog'

export default {
  layout: 'user',
  components: {
    UserListItem,
    SendTipDialog
  },
  data () {
    return {
      dialog: false,
      user: {},
      users: []
    }
  },
  // async asyncData ({ $axios, $auth }) {
  //   const users = await $axios.$post('/api/users/colleague', {}, {
  //     headers: {
  //       Authorization: localStorage.getItem('auth._token.local')
  //     }
  //   })
  //   return { users }
  // },
  async mounted () {
    this.users = await this.$axios.$post('/api/users/colleague', {}, {
      headers: {
        Authorization: localStorage.getItem('auth._token.local')
      }
    })
  },
  methods: {
    openDialog (user) {
      this.user = user
      this.dialog = true
    },
    async send (args) {
      const chip = await this.$axios.$post(`/api/chips/send`, {
        user: {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email
        },
        send: args.point
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })

      const send = await this.$axios.$post(`/api/posts/send`, {
        user: {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email
        },
        content: args.comment,
        chip_id: chip.id
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      console.log(chip)
      console.log('send')
      console.log(send)
      this.$store.dispatch('snackbar/setSnackbar', { text: `ポイントを贈りました！` })
      await this.$router.push('/')
    }
  }
}
</script>
