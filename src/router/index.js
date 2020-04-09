import Vue from 'vue'
import VueRouter from 'vue-router'
import Categoria from '../components/Categorias.vue'
import Cuestionario from '../components/Cuestionario.vue'
import CuestionarioCon from '../components/CuestionarioCon.vue'
import InstroduccionMod from '../components/IntroduccionModulo.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Modulos from '../components/Modulos.vue'

import firebase, { firestore } from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/categoria',
      name: 'Categoria',
      component: Categoria,
      meta:{
        login:true
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
      path:'/introduccion/:id',
      name:'InstroduccionMod',
      component:InstroduccionMod,
      meta:{
        login:true,
      }
    },
    {
      path:'/cuestionarioCon',
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
    
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.libre)){
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        console.log("ya estas logueado");
        next('/categoria')
      }
      else{
        console.log("no estas logueado");
        next();
      }
    })
        
  }
  else if(to.matched.some(record => record.meta.login)){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        // if(to.matched.some(record=> record.meta.admin))
        // {
        //   var usercurrent = firebase.auth().currentUser;
        //   var encontrado = false;
        //   firebase.database().ref('/admins').once('value').then((snapshot)=>{
        //     snapshot.forEach(element => {
        //       if(element.node_.value_ === usercurrent.email){
        //         encontrado = true;
        //         console.log("Eres admin");
        //         next();
        //       }
        //     })
        //   });
        //   if(!encontrado){
        //     console.log("No tiene permisos de Admin")
        //     next('/categoria');
        //   }


        // }
        // else{
        //   console.log("no necesitas permisos")
        //   next()
        // }
        next();
      }
      else{
        console.log("No estas logueado")
        next('/login')
      }
    })
    
  }
  else{
    next('/login')
  }
});


export default router
