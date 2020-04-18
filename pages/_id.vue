<template>
  <v-container>
    <v-layout justify-start>
      <v-card
        class="ma-4"
        flat
        tile
      >
        <v-img :src="`https://i.pravatar.cc/160?img=${$route.params.id}`" />
        <v-card-actions>
          <v-btn
            v-if="false && $route.params.id == setUser.id"
            @click="changeAvatar()"
            block
            outlined
            rounded
            color="primary"
          >
            画像の変更
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        class="ma-4"
        flat
        tile
      >
        <v-text-field
          v-model="setUser.name"
          :disabled="$route.params.id != $auth.user.id"
          label="表示名"
        />
        <v-btn
          v-if="$route.params.id == $auth.user.id"
          @click="patchUser"
          outlined
          rounded
          color="primary"
        >
          更新
        </v-btn>
        <v-card-actions>
          <v-btn
            v-if="$route.params.id != $auth.user.id"
            @click="sendTip()"
            rounded
            outlined
            color="pink"
          >
            このメンバーにポイントを贈る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-tabs>
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        @click="click(tab.type)"
      >
        {{ tab.label }}
      </v-tab>
    </v-tabs>
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
    <SendTipDialog
      :dialog="dialog"
      :user="setUser"
      @close="dialog=false"
    />
  </v-container>
</template>

<script>
import TimeLineItem from '@/components/TimeLineItem'
import SendTipDialog from '@/components/SendTipDialog'

export default {
  components: {
    TimeLineItem,
    SendTipDialog
  },
  layout: 'user',
  data () {
    return {
      dialog: false,
      setUser: {
        name: '',
        id: 0,
        email: ''
      },
      posts: [],
      histories: [],
      colleagues: [],
      favorites: [],
      currentLabel: 'すべて',
      tabs: [
        { label: 'もらった', type: '/api/posts/receipt' },
        { label: 'おくった', type: '/api/posts/sent' },
        { label: 'いいねした', type: '/api/favorites/sent' }
      ]
    }
  },
  computed: {
  },
  created () {
    this.getPosts('/api/posts')
    this.getUser()
  },
  methods: {
    click (tab) {
      this.currentLabel = tab.label
      if (tab.label === 'すべて') {
        this.getAllHistories()
      } else {
        this.getHistories(tab)
      }
    },
    async getPosts () {
      this.posts = await this.$axios.$get('/api/posts', {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
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
    },
    async getUser () {
      const user = await this.$axios.$get(`/api/users/${this.$route.params.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      this.setUser = {
        id: user.id,
        name: user.name,
        email: user.email
      }
    },
    changeAvatar () {
      alert('変更')
    },
    sendTip () {
      this.dialog = true
    },
    async patchUser () {
      this.posts = await this.$axios.$patch(`/api/users/${this.setUser.id}`, this.setUser, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      this.$store.dispatch('snackbar/setSnackbar', { text: `ユーザデータを更新しました` })
    }
  }
}
</script>
