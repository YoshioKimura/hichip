<template>
  <v-app>
    <v-app-bar
      app
      color="white"
    >
      <v-spacer />
      <v-btn rounded outlined color="pink" to="/userlist">
        チップをおくる
      </v-btn>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="menu in menus"
            :key="menu.title"
            :to="menu.to"
            nuxt
          >
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app permanent>
      <div>
        <v-row justify="center">
          <v-col cols="4">
            <v-img src="/logo.png" class="div-center" />
          </v-col>
        </v-row>
        <p class="ma-4 font-weight-bold title text-center">
          G's Chip
        </p>
        <p class="text-center">
          {{ $auth.loggedIn ? $auth.user.name: '' }}
        </p>

        <v-row>
          <v-col>
            <div>
              <p class="text-center caption mb-1">
                今月もらった
              </p>
              <p class="text-center mb-1">
                {{ amountRange }}ポイント<br><small>(累計：{{ amount }})</small>
              </p>
            </div>
          </v-col>
          <v-col>
            <div>
              <p class="text-center caption mb-1">
                今週おくれる
              </p>
              <p class="text-center mb-1">
                {{ available }}ポイント
              </p>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-divider />

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="link in links"
          :key="link.title"
          :to="link.to"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="$auth.user && $auth.user.role >= 2"
          to="/master"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>管理画面</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.id"
      :value="snackbar.showing"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px`"
      @input="$store.commit('snackbar/changeShowingStatus', {id: snackbar.id, value: false})"
    >
      {{ snackbar.text }}
      <v-btn @click="$store.commit('snackbar/changeShowingStatus', {id: snackbar.id, value: false})" text>
        閉じる
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // middleware: 'auth',
  data () {
    const myid = this.$auth.loggedIn ? this.$auth.user.id : 0
    return {
      amount: null,
      amountRange: null,
      available: null,
      links: [
        { title: 'タイムライン', to: '/' },
        { title: 'マイページ', to: `/${myid}` },
        { title: 'プロローグ', to: '/prologue' }
      ],
      menus: [
        // { title: 'チップをおくる', to: '/userlist' },
        { title: 'ログアウトする', to: '/logout' }
      ]
    }
  },
  mounted () {
    this.postAmount()
    this.postAmountRange()
    this.postAvailable()
  },
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  },
  methods: {
    async postAmount () {
      this.amount = await this.$axios.$post(`/api/chips/amount`, {
        type: 'receipt'
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
    },
    async postAmountRange () {
      this.amountRange = await this.$axios.$post(`/api/chips/amount`, {
        type: 'receipt',
        range: 7
      }, {
        headers: {
          Authorization: localStorage.getItem('auth._token.local')
        }
      })
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
