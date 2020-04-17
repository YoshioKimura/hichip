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
        { label: 'すべて', type: '/api/posts' },
        { label: 'もらった', type: '/api/chips/receipt' },
        { label: 'おくった', type: '/api/chips/sent' },
        { label: 'いいねした', type: '/api/favorites/sent' }
      ]
    }
  },
  mounted () {
    this.getPosts('/api/posts')
  },
  methods: {
    click (type) {
      this.getPosts(type)
    },
    async getPosts (type) {
      this.posts = await this.$axios.$post(type, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    }
  }
}
</script>
