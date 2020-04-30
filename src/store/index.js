import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.tokenUser || null
  },
  getters:{
    logedIn(state){
      return state.token != null
    }
  },
  mutations: {
    setToken(state,token){
      state.token = token
    }
  },
  actions: {
    guardarToken({commit},token){
      commit("setToken",token)
      localStorage.setItem('tokenUser',token);
    },
    logout({commit}){
      
      commit("setToken",null)
      localStorage.removeItem('tokenUser')
      router.push('/login');
      
    }
  },
  modules: {
  }
})
