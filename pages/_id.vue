<template>
  <v-container>
    <div>{{ user.name }}</div>
    <div>{{ $route.params.id }}</div>
  </v-container>
</template>

<script>
export default {
  layout: 'user',
  computed: {
    user () {
      return {
        id: 54,
        name: '山下智久',
        img: 'https://i.pravatar.cc/150?img=1'
      }
    }
  }
}
</script>
