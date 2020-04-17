<template>
  <v-container>
    <v-col>
      <v-card>
        <v-card-text>
          <v-tabs>
            <v-tab
              v-for="(tab, i) in tabs"
              :key="i"
              @click="click(tab.type)"
            >
              {{ tab.label }}
            </v-tab>
          </v-tabs>
          <line-chart :style="myStyles" :chart-data="datacollection" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-layout>
      <v-col
        v-for="item in ranking"
        :key="item"
        col="12"
        sm="4"
      >
        <v-card>
          <div class="pa-2">
            {{ item.label }}
          </div>
          <v-card-text>
            <div
              v-for="(user, i) in getPosts(item.type)"
              :key="i"
            >
              <span>{{ i + 1 }}</span>
              <span>{{ user.name }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'user',
  data () {
    return {
      myStyles: {
        width: '300px',
        height: '300px'
      },
      datacollection: {
        labels: [],
        datasets: [{
          backgroundColor: 'rgba(255, 100, 130, 0.2)',
          label: '累計',
          data: []
        }]
      },
      tabs: [
        { label: '今年', type: 'year' },
        { label: '今月', type: 'mouth' },
        { label: '今週', type: 'week' }
      ],
      ranking: [
        { label: '今月おくったポイントが多い人', type: '/api/chips/high_sent_employee' },
        { label: '今月もらったポイントが多い人', type: '/api/chips/high_receipt_employee' },
        { label: '今月拍手した回数が一番多い人', type: '' }
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
      const GrafData = await this.$axios.$post(`/api/chips/total_transition`, {
        type
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      console.log(GrafData)
      this.datacollection.labels = GrafData.labels
      this.datacollection.datasets[0].data = GrafData.data
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getPosts (type) {
      return this.$axios.$post(type, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    }
  }
}
</script>
