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
          :value="user.name"
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
    <template v-for="(itme, i) in itmes">
      <TimeLineItem
        :item="itme"
        :key="i"
      />
      <v-divider :key="i" />
    </template>
    <SendTipDialog
      :dialog="dialog"
      :user="user"
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
      setUser: {},
      tabs: [
        { label: 'もらった', type: 'take' },
        { label: 'おくった', type: 'give' },
        { label: 'いいねした', type: 'like' }
      ]
    }
  },
  computed: {
    itmes () {
      return [
        {
          id: 1,
          to: {
            uid: 54,
            name: '三浦大知',
            img: 'https://i.pravatar.cc/160?img=2'
          },
          from: {
            uid: 2,
            name: '山下智久',
            img: 'https://i.pravatar.cc/160?img=1'
          },
          point: 39,
          comment: 'ピアボーナスサービス'
        },
        {
          id: 2,
          to: {
            uid: 2,
            name: '山下智久',
            img: 'https://i.pravatar.cc/160?img=1'
          },
          from: {
            uid: 54,
            name: '三浦大知',
            img: 'https://i.pravatar.cc/160?img=2'
          },
          point: 39,
          comment: 'ピアボーナスサービス'
        }
      ]
    }
  },
  mounted () {
    this.setUser = this.user
  },
  methods: {
    click (type) {
      alert(type)
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
