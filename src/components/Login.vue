<style >
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
@font-face {
  font-family: "Ubuntu";
  src: url(../fonts/Ubuntu-Bold.ttf);
}
 .cardLogin{
   width:400px;
   height: 550px;
   border-radius: 10px !important;
 }
 .titulo1{
   font-weight: normal;
   font-family: "Dosis";
   letter-spacing: 0.6px;
   font-size: 36px;
   text-align: center;
   color: #514e95;
    border-bottom: 2px solid #514e95;
 }
 .content{
   background-color: #f0efff;
   padding-top: 12px !important;
   height: 100%;
 }
 .titulo2{
   color:#fb6e5c;
   font-weight: normal;
   font-size: 26px;
   letter-spacing: 0.2px;
   text-align: center;
   font-family: "Dosis";
 }
 .botonGoogle{
   font-size: 16px !important;
   font-weight: 3em;
   letter-spacing: 1px;
   
 }
 @media screen and (max-width: 500px){
   .cardLogin{
     width: 100% !important;
     height: 100%;
     box-shadow: none !important;
     border-radius: 0px !important;
   }
   .content{
     height: 100%;
     padding-top: 0px !important;
   }
 }
</style>
<template>
  <v-content class="content ">
    <div class="d-flex justify-center content align-center">
    <v-card class="cardLogin " >
      <div class="pa-5">
      <v-img style="height:300px;" src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/imagenlogin2.jpg?alt=media&token=7f6d19b3-c37f-4693-a8b5-b72125bc27f6"></v-img>
      
      <h2 class="titulo1">B1nQ0de</h2>
      <h4 class="titulo2 pa-4">Inicia sesión para continuar</h4>
      <v-btn @click="login()" color="#4d4d87" width="100%" height="50px" class="white--text pa-2 mt-4 botonGoogle"><v-icon color="white" class="ma-3">fab fa-google</v-icon>INGRESAR CON GOOGLE</v-btn>
      
      </div>
    </v-card>
    </div>
  </v-content>
</template>
<script>
import firebase from "firebase";
// import {config} from './helpers/firebaseConfig'
export default {
  created:function() {
      this.getToken();
  },
  methods: {
    login() {
      const me = this;
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function() {})
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error);
          // ...
        });
    },
    getToken() {
      let me = this;
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
             me.$router.go({ path: "/categoria" });
            // ...
          }
          // The signed-in user info.
          var user = result.user;
         
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error);
          // ...
        });
    }
  }
};
</script>
