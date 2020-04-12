<template>
  <v-container>
    <v-list>
      <template v-for="(user, i) in users">
        <UserListItem :user="user" :key="i" />
      </template>
    </v-list>
  </v-container>
</template>

<script>
import UserListItem from '@/components/UserListItem'
export default {
  layout: 'user',
  components: {
    UserListItem
  },
  computed: {
    users () {
      return [
        {
          id: 54,
          name: '山下智久',
          img: 'https://i.pravatar.cc/80?img=1'
        },
        {
          id: 2,
          name: '三浦春馬',
          img: 'https://i.pravatar.cc/80?img=2'
        }
      ]
    }
  }
}
</script>
