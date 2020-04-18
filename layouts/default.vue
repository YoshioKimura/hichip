<template>
  <v-app>
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
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  }
}
</script>
