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
 .cardLogin a{
    color: transparent !important;
 }
 /* .cardLogin:before{
   content: "";
   width:150px;
   height: 150px;
   background-color: black;
   position: absolute;
   left: -100px;
   top: -50px;
   border-radius: 50%;
   z-index: -1;
 } */
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
 #botonBack .v-icon{
   color:rgba(81, 78, 149,0.15) !important;
 }
 #botonBack:hover .v-icon {
   color:#4d4d87 !important;
 }
 @media screen and (max-width: 500px){
   .cardLogin{
     
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
  <div class="content ">
    
    <div class="d-flex justify-center content align-center">
    <v-card class="cardLogin d-flex align-center" v-resize="windowWidth" :width="width <=500 ? width+'px':'400px'">
      
      <a id="botonBack" href="/" style="position:absolute; left:0px;top:10px; z-index:1000;" class="ml-3" > <v-icon size="30">fas fa-arrow-left</v-icon></a>
      <div class="pa-5" :style="{width: width<=500? width+'px': 400+'px'}">
      <v-img style="height:300px;" src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/imagenlogin2.jpg?alt=media&token=7f6d19b3-c37f-4693-a8b5-b72125bc27f6"></v-img>
      
      <h2 class="titulo1">B1nQ0de</h2>
      <h4 class="titulo2 pa-4">Inicia sesión para continuar</h4>
      <v-btn @click="login()" color="#4d4d87" width="100%" height="50px" class="white--text  mt-4 botonGoogle"><v-icon color="white" class="ma-3">fab fa-google</v-icon>INGRESAR CON GOOGLE</v-btn>
      
      </div>
      
    </v-card>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
// import {config} from './helpers/firebaseConfig'
export default {
 data() {
    return {
      width:0+'px'
    };
  },
  created:function() {
      this.getToken();
  },
  mounted(){
    this.windowWidth()
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
    },
    windowWidth(){
      this.width = window.outerWidth;
    }
  },
};
</script>
