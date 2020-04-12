<template>
  <v-container>
    <template v-for="(itme, i) in itmes">
      <TimeLineItem
        :item="itme"
        :key="i"
      />
      <v-divider :key="i" />
    </template>
  </v-container>
</template>

<script>
import TimeLineItem from '@/components/TimeLineItem'

export default {
  layout: 'user',
  components: {
    TimeLineItem
  },
  computed: {
    itmes () {
      return [
        {
          id: 1,
          to: {
            uid: 54,
            name: '三浦大知',
            img: 'https://i.pravatar.cc/160?img=2'
          },
          from: {
            uid: 2,
            name: '山下智久',
            img: 'https://i.pravatar.cc/160?img=1'
          },
          point: 39,
          comment: 'ピアボーナスサービス'
        },
        {
          id: 2,
          to: {
            uid: 2,
            name: '山下智久',
            img: 'https://i.pravatar.cc/160?img=1'
          },
          from: {
            uid: 54,
            name: '三浦大知',
            img: 'https://i.pravatar.cc/160?img=2'
          },
          point: 39,
          comment: 'ピアボーナスサービス'
        }
      ]
    }
  }
}
</script>
