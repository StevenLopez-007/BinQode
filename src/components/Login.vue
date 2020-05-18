<style>
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
@font-face {
  font-family: "Ubuntu";
  src: url(../fonts/Ubuntu-Bold.ttf);
}
.cardLogin {
  width: 400px;
  height: auto;
  border-radius: 10px !important;
}
.cardLogin a {
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
.titulo1 {
  font-weight: normal;
  font-family: "Dosis";
  letter-spacing: 0.6px;
  font-size: 36px;
  text-align: center;
  color: #514e95;
  border-bottom: 2px solid #514e95;
}
.content {
  background-color: #f0efff;
  /* padding-top: 12px !important; */
  height: 100%;
}
.titulo2 {
  color: #fb6e5c;
  font-weight: normal;
  font-size: 26px;
  letter-spacing: 0.2px;
  text-align: center;
  font-family: "Dosis";
}
.botonGoogle {
  font-size: 16px !important;
  font-weight: 3em;
  letter-spacing: 1px;
}
#botonBack .v-icon {
  color: rgba(81, 78, 149, 0.15) !important;
}
#botonBack:hover .v-icon {
  color: #4d4d87 !important;
}
#botonLogin:hover {
  background-color: #00b248 !important;
}
@media screen and (max-width: 500px) {
  .cardLogin {
    height: 100%;
    box-shadow: none !important;
    border-radius: 0px !important;
  }
  .content {
    height: 100%;
    padding-top: 0px !important;
  }
}
</style>
<template>
  <div class="content mb-10">
    <div class="d-flex justify-center content align-center">
      <v-card
        class="cardLogin d-flex align-center"
        v-resize="windowWidth"
        :width="width <= 500 ? width + 'px' : '400px'"
      >
        <a
          id="botonBack"
          @click="$router.push('/')"
          style="position:absolute; left:0px;top:10px; z-index:1000;"
          class="ml-3"
        >
          <v-icon size="30">fas fa-arrow-left</v-icon></a
        >
        <div
          class="pa-5"
          :style="{ width: width <= 500 ? width + 'px' : 400 + 'px' }"
        >
          <v-img
            style="height:300px;"
            src="../imagenes/imagenesHome/imagenlogin.jpg"
          ></v-img>

          <h2 class="titulo1">B1nQ0de</h2>
          <h4 class="titulo2 pa-4">
            {{ register ? "¡Creá una cuenta!" : "Inicia con una cuenta" }}
          </h4>
          <!-- <v-btn  color="#4d4d87" width="100%" height="50px" class="white--text  mt-1 botonGoogle"><v-icon color="white" class="ma-3">fab fa-google</v-icon>{{register?'CONECTAR':'INGRESAR'}} CON GOOGLE</v-btn> -->
          <!-- <h4 class="mt-2" style="text-align:center; color:#b0b2be;" >{{register?'Ó regístrate con tu correo':'Ó continua con tu correo.'}}</h4> -->
          <div class="d-flex justify-center">
            <v-dialog
              v-model="dialog"
              style="width:auto;"
              max-width="400"
              v-if="register && valid"
            >
              <template v-slot:activator="{ on }">
                <v-avatar v-on="on" size="100" style="cursor:pointer;">
                  <img
                    :src="require(`../imagenes/avatars/${avatarSelected}`)"
                    alt="alt"
                  />
                </v-avatar>
              </template>
              <v-card>
                <v-card-title
                  style="font-family:Dosis;font-size:28px"
                  class="text--secondary text-center d-flex justify-center text-break"
                  >Selecciona tu avatar</v-card-title
                >
                <v-divider></v-divider>
                <v-container class="pa-1">
                  <v-row>
                    <v-col
                      v-for="(avatar, i) in avatars"
                      :key="i"
                      cols="6"
                      md="6"
                      class="d-flex justify-center"
                    >
                      <v-avatar
                        style="cursor:pointer;"
                        @click="
                          (avatarSelected = avatar.src), (dialog = !dialog)
                        "
                        :size="$vuetify.breakpoint.xsOnly ? '100' : '150'"
                      >
                        <img
                          :src="require(`../imagenes/avatars/${avatar.src}`)"
                          alt=""
                        />
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-dialog>
          </div>
          <div class="mt-2">
            <v-form ref="form" v-model="valid">
              <v-text-field
                :counter="40"
                :rules="nameRules"
                v-if="register"
                v-model="nombre"
                color="#b0b2be"
                label="Nombre de usuario"
                outlined
                clearable
              ></v-text-field>
              <v-text-field
                :rules="emailRules"
                v-model="email"
                color="#b0b2be"
                label="E-mail"
                outlined
                clearable
              ></v-text-field>
              <v-text-field
                @keyup.enter="valid ? loginWidth() : null"
                :rules="passwordRules"
                v-model="password"
                color="#b0b2be"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                outlined
              ></v-text-field>
            </v-form>
            <span v-if="emailIncorrecto" class="red--text"
              >E-mail ó contraseña incorrectos</span
            >
            <span v-if="error" class="red--text"
              >Hubo error al iniciar sesión, intentalo de nuevo</span
            >
          </div>
          <v-btn
            :disabled="!valid"
            :loading="cargando"
            @click="loginWidth()"
            id="botonLogin"
            class="white--text"
            width="100%"
            height="50px"
            style="border-radius: 24px; transition:0.25s;"
            color="#00e676"
            >{{ register ? "Crear cuenta" : "Ingresar" }}</v-btn
          >
          <h4 class="mt-2" style="text-align:center; color:#b0b2be;">
            {{
              register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"
            }}
            <span
              @click="register ? (register = false) : (register = true)"
              style="color:#4d4d87; text-decoration:underline; cursor:pointer;  "
              >{{ register ? "Inicia Sesión" : "Regístrate" }}</span
            >
          </h4>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
// import firebase from "firebase";
import axios from "axios";
import decode from "jwt-decode";
import store from "../store";
// import {config} from './helpers/firebaseConfig'
export default {
  data() {
    return {
      avatarSelected: "avatar1.svg",
      dialog: false,
      valid: true,
      width: 0 + "px",
      register: false,
      showPassword: false,
      nombre: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) =>
          /^([a-z-0-9_\.\-])+\@(([a-z-0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            v
          ) || "E-mail deber ser válido",
      ],
      nameRules: [
        (v) => (v == null ? (v = "") : !!v || "El nombre es requerido"),
        (v) =>v == null? (v = ""): v.length <= 40 || "El nombre debe ser menos de 40 carácteres",
      ],
      passwordRules: [
        (v) => !!v || "La contraseña es requerida",
        (v) =>this.register ? v.length >= 5 || "Contraseña demasiado corta" : v.length>=0,
      ],
      emailIncorrecto: false,
      cargando: false,
      error: false,
      avatars: [
        { src: "avatar1.svg" },
        { src: "avatar2.svg" },
        { src: "avatar3.svg" },
      ],
    };
  },
  created: function() {
    // this.getToken();
  },
  mounted() {
    this.windowWidth();
  },
  watch:{
    register(){
      this.limpiar()
    }
  },
  methods: {
    // login() {
    //   const me = this;
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   firebase
    //     .auth()
    //     .signInWithRedirect(provider)
    //     .then(function() {})
    //     .catch(function(error) {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // The email of the user's account used.
    //       var email = error.email;
    //       // The firebase.auth.AuthCredential type that was used.
    //       var credential = error.credential;
    //       console.log(error);
    //       // ...
    //     });
    // },
    // getToken() {
    //   let me = this;
    //   firebase
    //     .auth()
    //     .getRedirectResult()
    //     .then(function(result) {
    //       if (result.credential) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //          me.$router.go({ path: "/categoria" });
    //         // ...
    //       }
    //       // The signed-in user info.
    //       var user = result.user;

    //     })
    //     .catch(function(error) {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // The email of the user's account used.
    //       var email = error.email;
    //       // The firebase.auth.AuthCredential type that was used.
    //       var credential = error.credential;
    //       console.log(error);
    //       // ...
    //     });
    // },
    loginWidth() {
      this.cargando = true;
      if (this.register) {
        axios
          .post("estudiante/create", {
            nombre: this.nombre,
            password: this.password,
            email: this.email,
            avatar: this.avatarSelected,
          })
          .then((response) => {
            console.log(response.data.ok);
            if (response.data.ok) {
              this.$store.dispatch("guardarToken", response.data.token);
              this.emailIncorrecto = false;
              this.$router.replace('/bienvenida')
              this.$router.go(1);
            } else {
              console.log("Error");
              this.emailIncorrecto = false;
              this.error = true;
              
            }
          })
          .catch((error) => {
            (this.error = true),
              
              (this.emailIncorrecto = false);
          }).finally(()=>this.cargando = false);
      } else {
        axios
          .post("estudiante/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.ok) {
              this.$store.dispatch("guardarToken", response.data.token);
              this.emailIncorrecto = false;
              
              this.$router.go("/categoria");
            } else {
              this.error = false;
              this.emailIncorrecto = true;
              this.password = "";
              
            }
          })
          .catch(
            () => (this.error = true),
            
            (this.emailIncorrecto = false)
          ).finally(()=>this.cargando = false);
      }
    },
    windowWidth() {
      this.width = window.outerWidth;
    },
    validate() {
      this.$refs.form.validate();
    },
    limpiar(){
      this.nombre =''
      this.password = ''
      this.email =''
    }
  },
};
</script>
