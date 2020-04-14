<template>
  <v-container>
    <v-tabs>
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
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
      tabs: [
        { label: '今年', type: 'year' },
        { label: '今月', type: 'month' },
        { label: '今週', type: 'week' }
      ]
    }
  }
}
</script>
