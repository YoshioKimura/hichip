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
          <line-chart
            :style="myStyles"
            :chart-data="datacollection"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-layout>
      <v-col
        col="12"
        sm="6"
      >
        <v-card>
          <div class="pa-2">
            今月おくったポイントが多い人
          </div>
          <v-card-text>
            <template v-for="(data, j) in rkSent">
              <div
                :key="j"
                class="d-flex"
              >
                <div>{{ j + 1 }}.</div>
                <div class="pr-3 pl-1">
                  {{ data.name }}
                </div>
                <div class="ml-auto">
                  {{ data.total_amount }}pt
                </div>
              </div>
              <v-divider :key="j" />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        col="12"
        sm="6"
      >
        <v-card>
          <div class="pa-2">
            今月もらったポイントが多い人
          </div>
          <v-card-text>
            <template v-for="(data, j) in rkReceipt">
              <div
                :key="j"
                class="d-flex"
              >
                <div>{{ j + 1 }}.</div>
                <div class="pr-3 pl-1">
                  {{ data.name }}
                </div>
                <div class="ml-auto">
                  {{ data.total_amount }}pt
                </div>
              </div>
              <v-divider :key="j" />
            </template>
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
      datacollection: {},
      grafData: [],
      grafLabel: [],
      tabs: [
        { label: '今年', type: 'year' },
        { label: '今月', type: 'mouth' },
        { label: '今週', type: 'week' }
      ],
      rkSent: [],
      rkReceipt: []
    }
  },
  async mounted () {
    this.getTransition('year')
    const dataSent = await this.getPosts('/api/chips/high_sent_employee')
    this.rkSent = dataSent.map((v) => {
      return Object.assign({ ...v.user }, { ...v.chip })
    })
    const dataReceipt = await this.getPosts('/api/chips/high_receipt_employee')
    this.rkReceipt = dataReceipt.map((v) => {
      return Object.assign({ ...v.user }, { ...v.chip })
    })
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

      this.grafLabel = GrafData.labels

      this.grafData = GrafData.data.map((v) => {
        return v.total_amount
      })

      this.datacollection = {
        labels: this.grafLabel,
        datasets: [
          {
            label: '累計',
            backgroundColor: '#7de5d7',
            data: this.grafData
          }
        ]
      }
    },
    async getPosts (type) {
      const data = await this.$axios.$post(type, {}, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
      return data
    }
  }
}
</script>
