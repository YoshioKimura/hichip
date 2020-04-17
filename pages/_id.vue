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
            v-if="$route.params.id == setUser.id"
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
    <template v-for="(post, i) in posts">
      <TimeLineItem
        :item="post"
        :key="i"
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
    click (type) {
      this.getPosts(type)
    },
    async getPosts (type) {
      this.posts = await this.$axios.$get(type, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
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
