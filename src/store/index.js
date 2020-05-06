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
    imagenes:{}
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
      return state.catBuscar!=null?state.catBuscar.filter((cats)=>{
        return cats.nombre.toLowerCase().match(state.buscar.toLowerCase())
      }):null
    },
    modulosFil(state){
      return state.modBuscar !=null?state.modBuscar.filter((mods)=>{
          return state.completados? (state.modInscritos.some(mod=> mod.id ===mods.id))?mods.nombre.toLowerCase().match(state.buscar.toLowerCase()):null:!(state.modInscritos.some(mod=> mod.id ===mods.id))?mods.nombre.toLowerCase().match(state.buscar.toLowerCase()):null
      }):null
    },
    completado(state){
      return state.completados
    },
    retornar:()=>(img)=>{
      var urlImg =''
      firebase
          .storage()
          .ref()
          .child(`ImagenesCategorias/${img}.svg`)
          .getDownloadURL()
          .then((url) => {
            urlImg = url
          })
          return urlImg
    }
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
      state.modInscritos.push(modulos)
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
    setImagenes(state,nombreImg,url){
      state.imagenes[nombreImg] = url
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
    UrlsImagenes({commit,state}){
       state.catBuscar.map(cat=>{
        firebase
          .storage()
          .ref()
          .child(`ImagenesCategorias/${cat.img}.svg`)
          .getDownloadURL()
          .then((url) => {
           commit("setImagenes",cat.img)
          })
      })
    }
  },
  modules: {
  }
})
