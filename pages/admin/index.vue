<template>
  <v-container>
    <v-tabs>
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        @click="click(tab.type)"
      >
        {{ tab.label }}
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      posts: [],
      tabs: [
        { label: '今年', type: 'year' },
        { label: '今月', type: 'mouth' },
        { label: '今週', type: 'week' }
      ]
    }
  },
  mounted () {
    this.getTransition('year')
  },
  methods: {
    click (type) {
      this.getTransition(type)
    },
    async getTransition (type) {
      this.posts = await this.$axios.$post(`/api/chips/total_transition`, {
        type
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    }
  }
}
</script>
