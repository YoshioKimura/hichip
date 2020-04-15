<template>
  <v-container>
    <v-layout justify-start>
      <template v-for="(colleague, i) in colleagues">
        <UserListItem
          :user="{...colleague, img: `https://i.pravatar.cc/150?id=${Math.ceil(Math.random()*5)}`}"
          :key="i"
          @openDialog="openDialog"
        />
      </template>
    </v-layout>
    <SendTipDialog
      :dialog="dialog"
      :user="user"
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
    users () {
      return [
        {
          id: 54,
          name: '山下智久',
          img: 'https://i.pravatar.cc/150?img=1'
        },
        {
          id: 2,
          name: '三浦春馬',
          img: 'https://i.pravatar.cc/150?img=2'
        }
      ]
    }
  },
  async asyncData ({ $axios, $auth }) {
    const colleagues = await $axios.$post('/api/users/colleague', {}, {
      headers: {
        Authorization: `Bearer  ${$auth.user.access_token}`
      }
    })
    return { colleagues }
  },
  methods: {
    openDialog (user) {
      this.user = user
      this.dialog = true
    }
  }
}
</script>
