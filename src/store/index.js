import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import decode from 'jwt-decode'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.tokenUser || null,
    currentUser:null,
    catBuscar:[],
    modBuscar:[],
    modInscritos:[],
    buscar:'',
    completados:false,
    paginaCat:1
  },
  getters:{
    logedIn(state){
      try{
        state.currentUser=decode(localStorage.tokenUser)
        return state.token != null
      }catch(error){
        return false
      }
    },
    categoriasFil(state){
      return state.catBuscar.filter((cats)=>{
        return cats.nombre.toLowerCase().match(state.buscar.toLowerCase())
      })
    },
    modulosFil(state){
      return state.modBuscar.filter((mods)=>{
          return state.completados? (state.modInscritos.some(mod=> state.modInscritos.length>0?mod.modulo.id ===mods.id:mod.id===mods.id))?mods.nombre.toLowerCase().match(state.buscar.toLowerCase()):null:!(state.modInscritos.some(mod=> state.modInscritos.length>0?mod.modulo.id ===mods.id:mod.id===mods.id))?mods.nombre.toLowerCase().match(state.buscar.toLowerCase()):null
      })
    },
    getDatosIns:(state)=>(modulo)=>{
      return state.modInscritos.filter(mods=>{
        return state.completados? mods.modulo.id.match(modulo):[]
      })
    },
    completado(state){
      return state.completados
    },
  },
  mutations: {
    setToken(state,token){
      state.token = token
    },
    bucarCat(state,categoria){
     state.catBuscar = categoria
    },
    buscarMod(state,modulo){
      state.modBuscar = modulo
    },
    setBuscar(state,buscar){
      state.buscar= buscar
    },
    setModulosCompletados(state,modulos){
      state.modInscritos =modulos
    },
    setCompletados(state,completado){
      state.completados = completado
    },
    setMoreModulos(state,modulo){
      modulo.forEach(element=>{
        state.modBuscar.push(element)
      })
    },
    setMoreCategorias(state,categoria){
      categoria.forEach(element=>{
        state.catBuscar.push(element)
      })
    },
    paginaCat(state,pagina){
      state.paginaCat = pagina;
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
    },
    // UrlsImagenes({commit,state}){
    //    state.catBuscar.map(cat=>{
    //     firebase
    //       .storage()
    //       .ref()
    //       .child(`ImagenesCategorias/${cat.img}.svg`)
    //       .getDownloadURL()
    //       .then((url) => {
    //        commit("setImagenes",cat.img)
    //       })
    //   })
    // }
  },
  modules: {
  }
})
