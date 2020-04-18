<template>
  <v-card
    class="d-flex ma-2"
    flat
  >
    <v-card-text class="d-flex flex-row justify-space-between align-center">
      <div class="d-flex flex-row align-center">
        <v-avatar v-if="label!=='いいねした'" size="40" class="mr-2">
          <v-img :src="`https://i.pravatar.cc/160?img=${item.sender_id}`" />
        </v-avatar>
        <v-icon v-if="label!=='いいねした'">
          mdi-arrow-right
        </v-icon>
        <v-avatar v-if="label!=='いいねした'" size="40" class="ml-2 mr-4">
          <v-img :src="`https://i.pravatar.cc/160?img=${item.receiver_id}`" />
        </v-avatar>
        <div>
          <div v-if="label==='すべて'">
            <span class="ib">
              <nuxt-link
                :to="`/${item.sender_id}`"
                class="font-weight-black"
              >
                {{ item.sender_id===0?'運営': item.sender_name }}
              </nuxt-link>
              さん から
              <nuxt-link
                :to="`/${item.receiver_id}`"
                class="font-weight-black"
              >
                {{ item.receiver_name }}
              </nuxt-link>
              さん へ
            </span>
            <span class="ib">
              <span v-if="item.chip">
                <span class="font-weight-bold title">
                  {{ item.chip.amount }}
                </span>
                ポイントが贈られました！
              </span>
              <span v-else>
                メッセージが贈られました！
              </span>
            </span>
          </div>
          <div v-else-if="label==='いいねした'">
            <span v-if="favoriteData.sender" class="ib">
              <nuxt-link
                :to="`/${favoriteData.sender_id}`"
                class="font-weight-black"
              >
                {{ favoriteData.sender_id===0?'運営': favoriteData.sender.name }}
              </nuxt-link>
              さん から
              <nuxt-link
                :to="`/${favoriteData.receiver_id}`"
                class="font-weight-black"
              >
                {{ favoriteData.receiver.name }}
              </nuxt-link>
              さん へ
            </span>
            <span class="ib">
              <span v-if="favoriteData.chip">
                <span class="font-weight-bold title">
                  {{ favoriteData.chip.amount }}
                </span>
                ポイントが贈られました！
              </span>
              <span v-else>
                メッセージが贈られました！
              </span>
            </span>
          </div>
          <div v-else>
            <v-chip :color="label==='もらった'?'cyan':'light-green'" small class="mr-2" c>
              {{ label }}
            </v-chip>
            <span v-if="item.sender_id===0">
              運営より
            </span>
            <span v-else>
              <nuxt-link
                :to="`/${item.sender_id}`"
                class="font-weight-black"
              >
                {{ label==="もらった"?item.sender_name: item.receiver_name }}
              </nuxt-link>
              さん{{ label==="もらった"? 'から': 'へ' }}
            </span>

            <span class="font-weight-bold title">
              {{ item.amount }}
            </span>
            ポイント{{ label==="もらった"? 'が贈られました！': 'を贈りました！' }}
          </div>
          <div v-if="label!=='いいねした'" class="balloon1-top">
            <p>
              {{ item.content }}
            </p>
          </div>
          <div>
            {{ $moment(item.created_at).format('YYYY年MM月DD日 HH:MM') }}
          </div>
        </div>
      </div>
      <div v-if="label==='すべて' && item.sender_id!==$auth.user.id">
        <v-btn
          v-if="isAuthUserClicked"
          @click=""
          color="red"
          icon
          large
        >
          <v-icon>
            mdi-heart
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          @click="sendFavorite"
          :color="color"
          icon
          large
        >
          <v-icon>
            mdi-heart
          </v-icon>
        </v-btn>
        <span>
          {{ this.favoriteUsers.length }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    label: {
      type: String,
      default: ''
    },
    favoriteUsers: {
      type: Array,
      default: () => { return [] }
    },
    posts: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      color: ''
    }
  },
  computed: {
    isAuthUserClicked () {
      return this.favoriteUsers.includes(this.$auth.user.id)
    },
    favoriteData () {
      return this.pickPostData(this.item.post_id)
    }
  },
  methods: {
    sendFavorite () {
      this.color = 'red'
      this.favoriteNum += 1
      this.$emit('favorite', this.item.id)
    },
    pickPostData (id) {
      for (const post of this.posts) {
        if (post.id === id) {
          console.log(post)
          return { ...post }
        }
      }
      return {}
    }
  }

}
</script>
<style scoped>
  .balloon1-top {
    position: relative;
    display: inline-block;
    margin: 0.3em 0;
    padding: 7px 10px;
    min-width: 120px;
    max-width: 100%;
    color: #555;
    font-size: 16px;
    background: #eee;
    border-radius: 4px;
  }

  .balloon1-top:before {
    content: "";
    position: absolute;
    top: -15px;
    left: 30px;
    margin-left: -15px;
    border: 10px solid transparent;
    border-bottom: 10px solid #eee;
  }

  .balloon1-top p {
    margin: 0;
    padding: 0;
  }

  .ib {
    style:inline-block;
  }
</style>
