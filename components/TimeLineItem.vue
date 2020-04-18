<template>
  <v-card
    class="d-flex ma-2"
    flat
  >
    <v-card-text class="d-flex flex-row justify-space-between align-center">
      <div class="d-flex flex-row align-center">
        <v-avatar size="40" class="mr-4">
          <v-img :src="`https://i.pravatar.cc/160?img=${label==='もらった'?item.sender_name: item.receiver_name}`" />
        </v-avatar>
        <div>
          <div>
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
