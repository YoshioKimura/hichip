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
    <line-chart :styles="myStyles" :chart-data="datacollection" />
    <v-layout>
      <v-col
        v-for="item in ranking"
        :key="item"
        col="12"
        sm="4"
      >
        <v-card flat>
          <v-card-title>
            {{ item.label }}
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="(user, i) in getPosts(item.type)"
                :key="i"
                dense
              >
                <v-list-item-avatar>{{ i + 1 }}</v-list-item-avatar>
                <v-list-item-content>{{ user.name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'user',
  // middleware: 'auth-master',
  data () {
    return {
      myStyles: {
        width: '300px',
        height: '300px'
      },
      datacollection: null,
      tabs: [
        { label: '今年', type: 'year' },
        { label: '今月', type: 'mouth' },
        { label: '今週', type: 'week' }
      ],
      ranking: [
        { label: '今月おくったポイントが多い人ランキング(20位まで)', type: 'high_sent_employee' },
        { label: '今月もらったポイントが多い人ランキング(20位まで)', type: 'high_receipt_employee' },
        { label: '今月拍手した回数が一番多い人ランキング(20位まで)', type: 'high_senf_fav' }
      ]
    }
  },
  mounted () {
    this.getTransition('year')
    this.testData()
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
    },
    testData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Test Data2',
            backgroundColor: 'rgba(255, 100, 130, 0.2)',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getPosts (type) {
      return [{ name: type }, { name: type }]
      // return this.$axios.$get(type, {}, {
      //   headers: {
      //     Authorization: localStorage.getItem('auth._token.local')
      //   }
      // })
    }
  }
}
</script>
