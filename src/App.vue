<style>
@font-face {
  font-family: "Dosis";
  src: url(fonts/Dosis-Bold.ttf);
}
@font-face {
  font-family: "Ubuntu";
  src: url(fonts/Ubuntu-Bold.ttf);
}

.titulo {
  font-size: 26px;
  font-weight: normal;
  font-family: "Dosis";
  letter-spacing: 0.6px;
  cursor: pointer;
}
.list-items-title{
display:contents;
font-family:Dosis;
font-size:18px !important;
cursor:pointer;
color:#b0b2be
}
.iconos-list{
  height: 24px !important;
  width: 27px !important;
  color: #b0b2be !important;
}
.items-list:hover .list-items-title {
  color:rgb(103, 58, 183) !important;
}
.items-list:hover .iconos-list {
  color:rgb(103, 58, 183) !important;
}
#login{
  transition:0.15s;
  text-decoration:none;
}
#login:hover{
  color:rgb(103, 58, 183) !important;
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
      style="position:sticky;top:0px;z-index:2000; max-height:60px;box-shadow:0px 2px 6px 0px #00000017;"
      
      color="white"
      v-if="['Categoria','Modulos','Home'].indexOf($route.name) > -1"
    >
    <a  href="/" style="text-decoration:none; color: rgb(62, 65, 109)"><h4 class="titulo ma-2" >B1nQ0de</h4></a>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer></v-spacer>
      <!-- <v-btn style="font-family:Dosis; letter-spacing:2px;" text v-if="ocultar() || this.Logeado =='notloged' "  :to="{path:'/login'}"> LogIn </v-btn> -->
      <!-- <v-btn v-if="ocultar() || this.Logeado == 'isloged'" @click="logout()">LogOut</v-btn> -->
        <a class="ma-2" id="login" style="font-family:Dosis; letter-spacing:2px; color:#b0b2be" v-if="ocultar() || this.Logeado =='notloged' "  href="/login">LOG IN</a>
      <v-menu
      v-if="ocultar() || this.Logeado == 'isloged'"
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on }">
        
        <v-avatar class="mr-2" v-on="on" style="cursor:pointer;" size="40">
          <v-img :src="avatarUser"></v-img>
        </v-avatar>
       
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="avatarUser" alt="Avatar">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{nameUser}}</v-list-item-title>
            <v-list-item-subtitle>{{emailUser}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-list>
        <v-list-item
          href="https://forms.gle/RKe6ZLZ5gKpJnEjd9" target="_blank" class="items-list"
        >
          <v-list-item-title class="list-items-title"><v-icon class="ma-2 iconos-list">fas fa-edit</v-icon>Feedback</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout()" class="items-list">
         <v-list-item-title class="list-items-title"><v-icon class="ma-2 iconos-list">fas fa-lock</v-icon> Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      
    </v-app-bar>

    <v-content >
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
    Logeado:"notLoged",
    avatarUser:"",
    nameUser:"",
    emailUser:"",
    items: [
        { title: 'Feedback', icon:"fas fa-edit", src:"https://forms.gle/RKe6ZLZ5gKpJnEjd9"},
        
      ],
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
          this.$router.push("/");
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
               
               this.avatarUser = user.photoURL
               this.nameUser = user.displayName;
               this.emailUser = user.email;
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
