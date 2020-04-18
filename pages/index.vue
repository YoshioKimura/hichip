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
      <v-col cols="12" md="11">
        <template v-for="(history, i) in histories">
          <TimeLineItem
            :label="history.label"
            :favorite-num="countFavoriteNum(history.id)"
            :item="{...history, sender_name: getUserName(history.sender_id), receiver_name: getUserName(history.receiver_id)}"
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
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'user',
  components: {
    TimeLineItem
  },
  data () {
    return {
      histories: [],
      colleagues: [],
      favorites: [],
      currentLabel: 'すべて',
      tabs: [
        { label: 'すべて', type: '/api/posts' },
        { label: 'もらった', type: '/api/chips/receipt' },
        { label: 'おくった', type: '/api/chips/sent' },
        { label: 'いいねした', type: '/api/favorites/sent' }
      ]
    }
  },
  computed: {
    ...mapState('posts', ['posts'])
  },
  watch: {
    posts () {
      this.histories = this.posts
      this.histories = this.histories.map((el) => { el.label = 'すべて'; return el })
    }
  },
  created () {
    this.getFavorites()
    this.getPosts()
    this.getColleagues()
  },
  methods: {
    ...mapActions('posts', [
      'getPosts'
    ]),
    click (tab) {
      this.currentLabel = tab.label
      this.getHistories(tab)
      if (tab.label === 'すべて') {
        this.histories = this.posts
        // this.getAllHistories()
      } else {
        this.getHistories(tab)
      }
    },
    async getAllHistories () {
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
      const posts = [
        ...receipt.map((el) => { el.label = 'もらった'; return el }),
        ...sent.map((el) => { el.label = 'おくった'; return el })
      ]
      this.histories = this.sortTime(posts)
    },
    async getHistories (tab) {
      this.histories = await this.$axios.$post(tab.type, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      this.histories = this.histories.map((el) => { el.label = tab.label; return el })
      this.histories = this.sortTime(this.histories)
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
      return '運営'
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
