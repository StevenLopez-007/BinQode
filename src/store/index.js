import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null
  },
  mutations: {
    setToken(state,token){
      state.tokenUser = token
    }
  },
  actions: {
    guardarToken({commit},token){
      commit("setToken",token)
      localStorage.setItem('tokenUser',token);
    }
  },
  modules: {
  }
})
