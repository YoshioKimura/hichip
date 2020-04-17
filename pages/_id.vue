<template>
  <v-container>
    <v-layout justify-start>
      <v-card
        class="ma-4"
        flat
        tile
      >
        <v-img :src="`https://i.pravatar.cc/160?img=${setUser.id}`" />
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
          :value="setUser.name"
          :disabled="$route.params.id != setUser.id"
          label="表示名"
        />
        <v-btn
          v-if="$route.params.id == setUser.id"
          outlined
          rounded
          color="primary"
        >
          保存
        </v-btn>
        <v-card-actions>
          <v-btn
            v-if="$route.params.id != setUser.id"
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
        id: 0
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
  mounted () {
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
      this.setUser = await this.$axios.$get(`/api/users/${this.$route.params.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    },
    changeAvatar () {
      alert('変更')
    },
    sendTip () {
      this.dialog = true
    }
  }
}
</script>
