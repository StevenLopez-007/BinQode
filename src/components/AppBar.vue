<template>
  <v-app-bar
      app
      absolute
      color="white"
      
    >
    <a href="/" style="text-decoration:none; color: rgb(62, 65, 109)"><h4 class="titulo" >B1nQ0de</h4></a>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer></v-spacer>
      <v-btn v-if="ocultar() || this.Logeado =='notloged'"  :to="{path:'/login'}">LogIn </v-btn>
      <v-btn v-if="ocultar() || this.Logeado == 'isloged'" @click="logout()">LogOut</v-btn>
      
    </v-app-bar>
</template>
<script>
import firebase from 'firebase'
export default {
    data:()=>({
        Logeado:"notLoged"
    }),
    computed:{
        ocultar(){
            if(firebase.auth().currentUser){
            return true;
        }
        else{
            return false;
        }
        }
    },
    methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.$router.go("/");
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    ocultar(){
          var logeado;
           firebase.auth().onAuthStateChanged((user) =>{
             if(user){
               var logeado;
               console.log("si verifico y estas logueado");
               this.Logeado = 'isloged';
             }
             else{
               console.log("si verifico y no estas logueado");
                this.Logeado = 'notloged';
                
             }
           });
           
        },
     
    
    
  }
}
</script>
