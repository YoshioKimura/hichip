<template>
  <v-dialog
    v-model="dialog"
    @click:outside="close"
    width="500"
  >
    <v-card v-if="!check">
      <v-card-title>
        <v-avatar size="40" class="mr-2">
          <v-img :src="user.img" />
        </v-avatar>
        <div class="name">
          {{ user.name }}
        </div>
      </v-card-title>
      <v-card-text class="black--text">
        <div>
          おくれるポイント数: {{ available }}
        </div>
        <div class="pt-12">
          <v-row align="center">
            <v-col cols="9">
              <v-slider
                v-model="point"
                :max="sendablePoint"
                thumb-label="always"
                hide-details
              />
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="point"
                type="number"
                outlined
                hide-details
              />
            </v-col>
          </v-row>
        </div>

        <div class="mb-4 text-center">
          {{ user.name }} さんに<span class="font-weight-bold title">{{ point }}</span>ポイントをおくります
        </div>

        <v-textarea
          v-model="comment"
          label="コメント"
          hide-details
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="available < point"
          @click.prevent="send"
          block
          color="primary"
        >
          チップをおくる
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title />
      <v-card-text>
        <CheckMark />
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.prevent="close"
          block
          color="primary"
        >
          閉じる
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import CheckMark from '@/assets/images/checkmark'
export default {
  components: {
    CheckMark
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      comment: '',
      point: 39,
      check: false,
      available: 0,
      maxPoint: 500
    }
  },
  computed: {
    sendablePoint () {
      return this.available < this.maxPoint ? this.available : this.maxPoint
    }
  },
  mounted () {
    this.postAvailable()
  },
  methods: {
    send () {
      this.check = true
      this.$emit('post', { point: this.point, comment: this.comment })
    },
    close () {
      this.$emit('close')
      this.check = false
    },
    async postAvailable () {
      this.available = await this.$axios.$post(`/api/chips/available`, {
        type: 'receipt'
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    }
  }
}
</script>
