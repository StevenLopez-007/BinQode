import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import decode from 'jwt-decode'
import VueCookies from 'vue-cookies'
// import firebase from 'firebase'
import axios from 'axios'

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
    paginaCat:1,
    darkTheme:localStorage.darkTheme=='true'|| false,
  },
  getters:{
    darkTheme(state){
      return state.darkTheme
    },
    logedIn(state){
      try{
        if(localStorage.tokenUser === undefined){
          return false
        }
        else{
          state.currentUser=decode(localStorage.tokenUser)
        return state.token != null
        }
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
    modsInsFil:(state)=>(buscarMod,notaUp)=>{
      return state.modInscritos.sort((a,b)=> notaUp?b.calificacion-a.calificacion:a.calificacion-b.calificacion).filter(mod=>{
        return mod.modulo.nombre.toLowerCase().match(buscarMod)
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
    modInscritos: (state)=>(modulo)=>{
      let inscrito =  axios.get(`inscripcion/verificarModulo/${modulo}/${state.currentUser.usuario._id}`);
       return inscrito.inscripcions != undefined? true:false;
    },
    getProgresoporCat:(state)=>(cat)=>{
      return state.modInscritos.filter( mods=>{
        return mods.modulo.categoria.match(cat)
      })
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
    },
    setDarkTheme(state,darkTheme){
      state.darkTheme = darkTheme
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
