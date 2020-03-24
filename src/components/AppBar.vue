<template>
  <v-app-bar app absolute color="white">
    <a href="/" style="text-decoration:none; color: rgb(62, 65, 109)"
      ><h4 class="titulo">B1nQ0de</h4></a
    >
    <v-spacer></v-spacer>
    <v-btn v-if="!ocultar" :to="{ path: '/login' }">LogIn</v-btn>
    <v-btn v-if="ocultar" @click="logout()">LogOut</v-btn>
  </v-app-bar>
</template>
<script>
import firebase from 'firebase'
export default {
    data:()=>({
        isLogged:false
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
    methods:{
         logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    }
}
</script>
