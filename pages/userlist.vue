<template>
  <v-container>
    <v-layout justify-start>
      <template v-for="(u, i) in users">
        <UserListItem
          v-if="u.id!==$auth.user.id"
          :user="{...u, img: `https://i.pravatar.cc/150?id=${u.id}`}"
          :key="i"
          @openDialog="openDialog"
        />
      </template>
    </v-layout>
    <SendTipDialog
      :dialog="dialog"
      :user="user"
      @post="sendChips"
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
    async sendChips (args) {
      await this.$axios.$post(`/api/chips/send`, {
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
      await this.$router.push('/')
    }
  }
}
</script>
