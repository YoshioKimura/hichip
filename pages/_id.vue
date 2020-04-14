<template>
  <v-container>
    <v-layout justify-start>
      <v-card
        class="ma-4"
        flat
        tile
      >
        <v-img :src="user.img" />
        <v-card-actions>
          <v-btn
            v-if="$route.params.id == origUser.uid"
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
          :disabled="$route.params.id != origUser.uid"
          label="表示名"
        />
        <v-btn
          v-if="$route.params.id == origUser.uid"
          outlined
          rounded
          color="primary"
        >
          保存
        </v-btn>
        <v-card-actions>
          <v-btn
            v-if="$route.params.id != origUser.uid"
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
  layout: 'user',
  components: {
    TimeLineItem,
    SendTipDialog
  },
  data () {
    return {
      dialog: false,
      user: {},
      tabs: [
        { label: 'もらった', type: 'take' },
        { label: 'おくった', type: 'give' },
        { label: 'いいねした', type: 'like' }
      ]
    }
  },
  computed: {
    origUser () {
      return {
        uid: 2,
        name: '山下智久',
        img: 'https://i.pravatar.cc/150?img=1'
      }
    },
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
  watch: {
    origUser (val) {
      this.user = val
    }
  },
  mounted () {
    // dummy
    this.user = {
      id: this.$route.params.id,
      name: '山下智久',
      img: 'https://i.pravatar.cc/150?img=1'
    }
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
