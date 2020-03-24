<style>
@font-face {
  font-family: "Dosis";
  src: url(fonts/Dosis-Bold.ttf);
}
@font-face {
  font-family: "Ubuntu";
  src: url(fonts/Ubuntu-Bold.ttf);
}
.v-toolbar {
  box-shadow: none !important;
}
.titulo {
  font-size: 26px;
  font-weight: normal;
  font-family: "Dosis";
  letter-spacing: 0.6px;
  cursor: pointer;
}
</style>

<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

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

    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    Logeado:"notLoged"
  }),
  created: function() {
  },
  computed:{

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
};
</script>
