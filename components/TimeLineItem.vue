<template>
  <v-card
    @click="sendTip"
    class="d-flex ma-2"
    flat
  >
    {{ item }}
    <v-card-text class="d-flex flex-row">
      <v-avatar size="40" class="mr-4">
        <v-img :src="`https://i.pravatar.cc/160?img=${item.receiver_id}`" />
      </v-avatar>
      <div>
        <div>
          <nuxt-link
            :to="`?uid=${item.receiver_id}`"
            class="font-weight-black"
          >
            {{ item.receiver_id }}
          </nuxt-link>
          さんから
          <nuxt-link
            :to="`?uid=${item.receiver_id}`"
            class="font-weight-black"
          >
            {{ item.receiver_id }}
          </nuxt-link>
          さんへ
          <span class="font-weight-black">
            {{ item.point }}
          </span>
          ポイント贈られました！
        </div>
        <div>
          {{ item.comment }}
        </div>
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
    }
  }
}
</script>
