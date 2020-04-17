<template>
  <v-container>
    <v-tabs>
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        @click="click(tab)"
      >
        {{ tab.label }}
      </v-tab>
    </v-tabs>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="10">
        <template v-for="(post, i) in posts">
          <TimeLineItem
            :label="post.label"
            :favorite-num="countFavoriteNum(post.id)"
            :item="{...post, sender_name: getUserName(post.sender_id), receiver_name: getUserName(post.receiver_id)}"
            :key="i"
            @favorite="sendFavorite"
          />
          <v-divider :key="i" />
        </template>
      </v-col>
    </v-row>
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
      colleagues: [],
      favorites: [],
      currentLabel: 'すべて',
      tabs: [
        { label: 'すべて', type: '/api/chips/receipt' },
        { label: 'もらった', type: '/api/chips/receipt' },
        { label: 'おくった', type: '/api/chips/sent' },
        { label: 'いいねした', type: '/api/favorites/sent' }
      ]
    }
  },
  mounted () {
    this.getFavorites()
    this.getColleagues()
    this.getAllPosts()
  },
  methods: {
    click (tab) {
      this.currentLabel = tab.label
      if (tab.label === 'すべて') {
        this.getAllPosts()
      } else {
        this.getPosts(tab)
      }
    },
    async getAllPosts () {
      // 本当はサーバー側に書けるといい処理
      const receipt = await this.$axios.$post('/api/chips/receipt', {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      const sent = await this.$axios.$post('/api/chips/sent', {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      console.log(receipt, sent)
      const posts = [
        ...receipt.map((el) => { el.label = 'もらった'; return el }),
        ...sent.map((el) => { el.label = 'おくった'; return el })
      ]
      this.posts = this.sortTime(posts)
    },
    async getPosts (tab) {
      this.posts = await this.$axios.$post(tab.type, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      this.posts = this.posts.map((el) => { el.label = tab.label; return el })
      this.posts = this.sortTime(this.posts)
    },
    async getColleagues () {
      this.colleagues = await this.$axios.$post('/api/users/colleague', {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    },
    getUserName (id) {
      for (const colleague of this.colleagues) {
        if (colleague.id === id) {
          return colleague.name
        }
      }
      return 'Undefined'
    },
    sortTime (items) {
      return items.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return 1
        } else if (a.created_at > b.created_at) {
          return -1
        } else {
          return 0
        }
      })
    },
    async sendFavorite (id) {
      // TODO: postにpostidを代入する
      try {
        const result = await this.$axios.$post('/api/favorites', {
          post: 46,
          type: 'Smile'
        }, {
          headers: {
            Authorization: localStorage.getItem('auth._token.local')
          }
        })
        alert(result)
      } catch (e) {
        alert(e)
      }
    },
    async getFavorites () {
      const favorites = await this.$axios.get(`/api/favorites/`)
      this.favorites = favorites.data
    },
    countFavoriteNum (postId) {
      const users = []
      for (const fav of this.favorites) {
        if (fav.post_id === postId) {
          users.push(fav.user_id)
        }
      }
      const setUsers = new Set(users)
      return [...setUsers].length
    }
  }
}
</script>
