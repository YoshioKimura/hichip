<template>
  <v-card
    class="d-flex ma-2"
    flat
  >
    <v-card-text class="d-flex flex-row justify-space-between align-center">
      <div class="d-flex flex-row align-center">
        <v-avatar size="40" class="mr-2">
          <v-img :src="`https://i.pravatar.cc/160?img=${item.sender_id}`" />
        </v-avatar>
        <v-icon>
          mdi-arrow-right
        </v-icon>
        <v-avatar size="40" class="ml-2 mr-4">
          <v-img :src="`https://i.pravatar.cc/160?img=${item.receiver_id}`" />
        </v-avatar>
        <div>
          <div v-if="label==='すべて'">
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
            <span v-if="item.chip">
              <span class="font-weight-bold title">
                {{ item.chip.amount }}
              </span>
              ポイントが贈られました！
            </span>
            <span v-else>
              メッセージが贈られました！
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
          <div>
            {{ item.comment }}
          </div>
          <div>
            {{ $moment(item.created_at).format('YYYY年MM月DD日 HH:MM') }}
          </div>
        </div>
      </div>
      <div>
        <v-btn @click="sendFavorite" icon large>
          <v-icon>
            mdi-heart
          </v-icon>
        </v-btn>
        {{ favoriteNum }}
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
    favoriteNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    sendFavorite () {
      this.$emit('favorite', this.item)
    }
  }

}
</script>
