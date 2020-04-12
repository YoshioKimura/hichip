<template>
  <v-container>
    <v-layout justify-start>
      <template v-for="(user, i) in users">
        <UserListItem
          :user="user"
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
  methods: {
    openDialog (user) {
      this.user = user
      this.dialog = true
    }
  }
}
</script>
