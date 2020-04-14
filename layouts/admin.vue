<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <div>
        <p class="ma-4 font-weight-bold title text-center">
          管理画面
        </p>
        <p class="text-center">
          {{ $auth.loggedIn ? $auth.user.name: '' }}
        </p>
      </div>
      <v-divider />
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="menu in menus.super"
          :key="menu.title"
          :to="menu.to"
          exact
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
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
      // 本来だとmenu一列でmenuごとにrole持つのが正しい
      menus: {
        super: [
          { title: 'トップ', to: '/admin/' },
          { title: '本部画面', to: '/admin/provider' },
          { title: '従業員管理', to: '/admin/userslist' },
          { title: 'アナリティクス', to: '/admin/analytics' }
        ],
        master: [
          { title: 'トップ', to: '/admin/' },
          { title: '従業員管理', to: '/admin/userslist' },
          { title: 'アナリティクス', to: '/admin/analytics' }
        ]
      }
    }
  }
}
</script>
