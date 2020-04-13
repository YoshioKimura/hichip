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
                XXポイント
              </p>
            </div>
          </v-col>
          <v-col>
            <div>
              <p class="text-center caption mb-1">
                今週使える
              </p>
              <p class="text-center mb-1">
                XXポイント
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
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { title: 'タイムライン', to: '/timeline' },
        { title: 'マイページ', to: '/profile_received' },
        { title: 'プロローグ', to: '/prologue' }
      ],
      menus: [
        { title: 'チップを送る', to: '/userlist' },
        { title: 'ログアウトする', to: '/logout' }
      ]
    }
  }
}
</script>
