import Vue from 'vue'
import VueRouter from 'vue-router'
import Categoria from '../components/Categorias.vue'
import Cuestionario from '../components/Cuestionario.vue'
import CuestionarioCon from '../components/CuestionarioCon.vue'
import InstroduccionMod from '../components/IntroduccionModulo.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Modulos from '../components/Modulos.vue'
import Bienvenida from '../components/Bienvenida.vue'
import Perfil from '../components/Perfil.vue'

// import firebase, { firestore } from 'firebase'
import store from '../store'

// async function verificarMod(){
//   return await axios.get('')
// }

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path:'/bienvenida',
      name:'Bienvenida',
      component:Bienvenida,
      meta:{
        libre:true
      }
    },
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria,
      meta:{
        login:true
        // libre:true
      }
     
    },
    {
      path:'/cuestionario/:id',
      name:'Cuestionario',
      component:Cuestionario,
      meta:{
        login:true,
      }
      
    },
    {
      path:'/introduccion/:idCat/:id',
      name:'InstroduccionMod',
      component:InstroduccionMod,
      meta:{
        login:true,
      }
    },
    {
      path:'/cuestionarioCon/:idCat/:id',
      name:'cuestionariocon',
      component:CuestionarioCon,
      meta:{
        login:true
      }
      
    },
    
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{
        libre:true,
      },
    },
    {
    path:'/',
      name: 'Home',
      component:Home,
      meta:{
        libre:true,
      },
    },
    {
    path:'/modulos/:id',
    name:'Modulos',
    component:Modulos,
    meta:{
      login:true
    }
    },
    {
      path:'/perfil',
      name:'Perfil',
      component:Perfil,
      meta:{
        login:true
      }
    }
    
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.libre)){
    // firebase.auth().onAuthStateChanged((user) =>{
    //   if(user){
    //     console.log("ya estas logueado");
    //     next('/categoria')
    //   }
    //   else{
    //     console.log("no estas logueado");
    //     next();
    //   }
    // })
    if(store.getters.logedIn){
     
      next('/categoria')
     
    }
    else{
      next();
    }
        
  }
  else if(to.matched.some(record => record.meta.login)){
    // firebase.auth().onAuthStateChanged((user)=>{
    //   if(user){
        
    //     next();
    //   }
    //   else{
    //     console.log("No estas logueado")
    //     next('/login')
    //   }
    // })
    if(store.getters.logedIn){
      // if(['Cuestionario','InstroduccionMod'].includes(to.name)){
      //   store.getters.modInscritos(to.params.id)?next(false):next()
      // }
      // else{
      //   next()
      // }
      next()
    }
    else{
      next('/login')
    }
    
  }
  else{
    next('/login')
  }
});


export default router
