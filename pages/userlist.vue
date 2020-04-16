<template>
  <v-container>
    <v-layout justify-start>
      <template v-for="(u, i) in users">
        <UserListItem
          :user="{...u, img: `https://i.pravatar.cc/150?id=${Math.ceil(Math.random()*5)}`}"
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
      user: {}
    }
  },
  computed: {
    // users () {
    //   return [
    //     {
    //       id: 54,
    //       name: '山下智久',
    //       img: 'https://i.pravatar.cc/150?img=1'
    //     },
    //     {
    //       id: 2,
    //       name: '三浦春馬',
    //       img: 'https://i.pravatar.cc/150?img=2'
    //     }
    //   ]
    // }
  },
  async asyncData ({ $axios, $auth }) {
    const users = await $axios.$post('/api/users/colleague', {}, {
      headers: {
        Authorization: localStorage.getItem('auth._token.local')
      }
    })
    return { users }
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
