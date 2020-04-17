const state = () => ({
  snackbars: []
})

const getters = {

}

const mutations = {
  SET_SNACKBAR (state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar)
  },
  changeShowingStatus (state, showing) {
    state.snackbars.some((snackbar, index) => {
      if (snackbar.id === showing.id) {
        state.snackbars[index].showing = showing.value
        return true
      }
    })
  }
}

const actions = {
  setSnackbar ({ commit }, snackbar) {
    snackbar.id = Date.now() + Math.random() + ''
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    commit('SET_SNACKBAR', snackbar)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
