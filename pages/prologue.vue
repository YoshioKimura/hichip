<template>
  <v-container>
    <div v-html="prologue" />
  </v-container>
</template>

<script>
import prologue from '@/assets/md/prologue.md'
export default {
  layout: 'user',
  computed: {
    prologue () {
      return prologue
    }
  }
}
</script>
