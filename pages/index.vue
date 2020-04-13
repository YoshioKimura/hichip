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
  data () {
    return {
      tabs: [
        { label: 'すべて', type: 'all' },
        { label: 'もらった', type: 'take' },
        { label: 'おくった', type: 'give' },
        { label: 'いいねした', type: 'like' }
      ]
    }
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
  },
  methods: {
    click (type) {
      alert(type)
    }
  }
}
</script>
