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
import ChangePassword from '../components/ChangePassword.vue'
import Equipo from '../components/Equipo.vue'

import store from '../store'
import decode from 'jwt-decode'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path:'/resetPassword/:token',
      name:'ResetPassword',
      component:ChangePassword,
      meta:{
        libre:true
      }
    },
    {
      path:'/equipo',
      name:'Equipo',
      component:Equipo,
      meta:{
        libre:true
      }
    },
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
    if(store.getters.logedIn){
     
      next('/categoria')
     
    }
    else{
      if(to.name =='ResetPassword')
      {
        try{
          decode(to.params.token)
          next()
        }catch(error){
          next('/')
        }
      }
      else{
        next();
      }
    }
        
  }
  else if(to.matched.some(record => record.meta.login)){
    if(store.getters.logedIn){
      if(['Cuestionario','InstroduccionMod'].includes(to.name)){
          store.getters.modInscritos(to.params.id).then((result)=>{
            if(!result){
              next();
            }
            else{
              next('/categoria')
            }
          })
      }
      else{
        next();
      }
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
