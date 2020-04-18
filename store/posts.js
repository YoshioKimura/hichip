const state = () => ({
  posts: ''
})

const getters = {
  paramLength: (state) => {
    return state.param.length
  }
}

const mutations = {
  setPosts (state, posts) {
    state.posts = posts
  }
}

const actions = {
  async getPosts ({ commit }) {
    const posts = await this.$axios.$get('/api/posts', {}, {
      headers: {
        Authorization: localStorage.getItem('auth._token.local')
      }
    })
    commit('setPosts', posts)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

// store/example.js でファイルを生成した場合のComponent内での呼び出し方

// ストアのデータを呼び出す
// this.$store.state.example.param

// ディスパッチする
// this.$store.dispatch('example/doAction', '引数を渡せる')

// コミットする
// this.$store.commit('example/doMutation', '引数を渡せる')

// this.$store.getters['hoge/isHogeExist']

// import { mapState } from "vuex";
// computed: mapState({
//   // mapState内では、state === this.$store.state となる
// }),
