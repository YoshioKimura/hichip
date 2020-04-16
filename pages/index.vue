<template>
  <v-container>
    <v-tabs>
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        @click="click(tab.type)"
      >
        {{ tab.label }}
      </v-tab>
    </v-tabs>
    <template v-for="(post, i) in posts">
      <TimeLineItem
        :item="post"
        :key="i"
      />
      <v-divider :key="i" />
    </template>
  </v-container>
</template>

<script>
import TimeLineItem from '@/components/TimeLineItem'

export default {
  layout: 'user',
  components: {
    TimeLineItem
  },
  data () {
    return {
      posts: [],
      tabs: [
        { label: 'すべて', type: 'all' },
        { label: 'もらった', type: 'take' },
        { label: 'おくった', type: 'give' },
        { label: 'いいねした', type: 'like' }
      ]
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    click (type) {
      alert(type)
    },
    async getPosts () {
      this.posts = await this.$axios.$get(`/api/posts`, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    }
  }
}
</script>
