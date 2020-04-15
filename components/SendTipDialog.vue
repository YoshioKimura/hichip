<template>
  <v-dialog
    v-model="dialog"
    @click:outside="close"
    width="500"
  >
    <v-card v-if="!check">
      <v-card-title>
        <v-avatar size="40">
          <v-img :src="user.img" />
        </v-avatar>
        <div class="name">
          {{ user.name }}
        </div>
      </v-card-title>
      <v-card-text>
        <div>
          おくれるポイント数: {{ hasPint }}
        </div>
        <v-text-field
          v-model="point"
          label="送るポイント数(半角数字)"
          type="number"
        />
        <v-textarea
          v-model="comment"
          label="コメント"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.prevent="send"
          block
          color="primary"
        >
          チップを贈る
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
      point: '',
      check: false
    }
  },
  computed: {
    hasPint () {
      return 0
    }
  },
  methods: {
    send () {
      this.check = true
      this.$emit('post', { point: this.point, comment: this.comment })
    },
    close () {
      this.$emit('close')
      this.check = false
    }
  }
}
</script>
