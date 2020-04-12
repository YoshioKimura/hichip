<template>
  <v-card
    @click="sendTip"
    class="d-flex ma-2"
    flat
  >
    <v-card-text class="d-flex flex-row">
      <v-avatar size="40" class="mr-4">
        <v-img :src="item.to.img" />
      </v-avatar>
      <div>
        <div>
          <nuxt-link
            :to="`?uid=${item.from.uid}`"
            class="font-weight-black"
          >
            {{ item.from.name }}
          </nuxt-link>
          さんから
          <nuxt-link
            :to="`?uid=${item.to.uid}`"
            class="font-weight-black"
          >
            {{ item.to.name }}
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
