<template>
  <v-dialog
    v-model="dialog"
    @click:outside="close"
    width="500"
  >
    <v-card>
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
        <v-card-actions>
          <v-btn
            @click.prevent="send"
            block
            color="primary"
          >
            チップを贈る
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
      point: ''
    }
  },
  computed: {
    hasPint () {
      return 0
    }
  },
  methods: {
    send () {
      alert(this.user.id)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
