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
          <v-btn
            @click="login()"
            color="#4d4d87"
            width="100%"
            height="50px"
            class="white--text  mt-1 botonGoogle"
            ><v-icon color="white" class="ma-3">fab fa-google</v-icon
            >{{ register ? "CONECTAR" : "INGRESAR" }} CON GOOGLE</v-btn
          >
          <h4 class="mt-2" style="text-align:center; color:#b0b2be;">
            {{
              register
                ? "Ó regístrate con tu correo"
                : "Ó continua con tu correo."
            }}
          </h4>
          <!-- Avatar -->

          <!-- <div class="d-flex justify-center">
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
          </div> -->

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
              <!-- Phone -->
              <v-row v-if="register">
                <v-col cols="5" class="pa-0">
                  <v-select
                    color="#b0b2be"
                    v-model="selectPais"
                    :items="codesPhone"
                    item-text="nombre"
                    label="País"
                    :hint="`${selectPais.iso3}`"
                    persistent-hint
                    return-object
                  >
                  </v-select>
                </v-col>
                <v-col cols="7" class="pl-2 pr-0 pt-0 pb-0">
                  <v-text-field
                    color="#b0b2be"
                    v-model="selectPais.numero"
                    :rules="phoneRules"
                    :prefix="`+${selectPais.phone_code}`"
                    outlined
                    clearable
                    label="Teléfono"
                    class="d-flex align-center"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
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
            @click="valid ? loginWidth() : null"
            id="botonLogin"
            class="white--text"
            width="100%"
            height="50px"
            style="border-radius: 24px; transition:0.25s;"
            color="#00e676"
            >{{ register ? "Crear cuenta" : "Ingresar" }}</v-btn
          >
          <h4 class="mt-2" style="text-align:center; color:#b0b2be;">
            {{ register ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?" }}
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
import firebase from "firebase";
import axios from "axios";
import decode from "jwt-decode";
import store from "../store";
import VueCookies from 'vue-cookies'
// import {config} from './helpers/firebaseConfig'
export default {
  data() {
    return {
      avatarSelected: "av-2.png",
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
          /^([a-zA-Z0-9_\.\-])+\@(([a-z-0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            v
          ) || "E-mail deber ser válido",
      ],
      nameRules: [
        (v) => (v == null ? (v = "") : !!v || "El nombre es requerido"),
        (v) =>
          v == null
            ? (v = "")
            : v.length <= 40 || "El nombre debe ser menos de 40 carácteres",
      ],
      passwordRules: [
        (v) => !!v || "La contraseña es requerida",
        (v) =>
          this.register
            ? v.length >= 5 || "Contraseña demasiado corta"
            : v.length >= 0,
      ],
      phoneRules: [
        (v) => !!v || "Teléfono es requerido",
        (v) => /^([0-9])*$/.test(v) || "Teléfono Invalido",
      ],
      emailIncorrecto: false,
      cargando: false,
      error: false,
      avatars: [
        { src: "avatar1.svg" },
        { src: "avatar2.svg" },
        { src: "avatar3.svg" },
        { src: "av-2.png.svg" },
      ],
      codesPhone: [
        {
          nombre: "El Salvador",
          name: "ElSalvador",
          nom: "ElSalvador",
          iso2: "SV",
          iso3: "SLV",
          phone_code: "503",
        },
        {
          nombre: "Estados Unidos de América",
          name: "UnitedStatesofAmerica",
          nom: "États-Unisd'Amérique",
          iso2: "US",
          iso3: "USA",
          phone_code: "1",
        },
        {
          nombre: "Guatemala",
          name: "Guatemala",
          nom: "Guatemala",
          iso2: "GT",
          iso3: "GTM",
          phone_code: "502",
        },
        {
          nombre: "Honduras",
          name: "Honduras",
          nom: "Honduras",
          iso2: "HN",
          iso3: "HND",
          phone_code: "504",
        },
        {
          nombre: "Nicaragua",
          name: "Nicaragua",
          nom: "Nicaragua",
          iso2: "NI",
          iso3: "NIC",
          phone_code: "505",
        },
        {
          nombre: "Costa Rica",
          name: "CostaRica",
          nom: "CostaRica",
          iso2: "CR",
          iso3: "CRI",
          phone_code: "506",
        },
      ],
      selectPais: {
        nombre: "El Salvador",
        name: "ElSalvador",
        nom: "ElSalvador",
        iso2: "SV",
        iso3: "SLV",
        phone_code: "503",
        numero: "",
      },
    };
  },
  created: function() {
    this.getToken();
  },
  mounted() {
    this.windowWidth();
  },
  watch: {
    register() {
      this.limpiar();
    },
  },
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
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
          // if (result.credential) {
          //   // This gives you a Google Access Token. You can use it to access the Google API.
          //   var token = result.credential.accessToken;
          //    me.$router.go({ path: "/categoria" });
          //   // ...
          // }
          // The signed-in user info.
          var user = result.user;
          user != null ? me.redirectGoogle(user.email, user.displayName) : null;
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
    redirectGoogle(email, nombre) {
      axios
        .post("estudiante/createGoogleAccount/", {
          nombre: nombre,
          email: email,
          avatar: this.avatarSelected,
        })
        .then((response) => {
          if(response.data.ok){
            this.$store.dispatch("guardarToken", response.data.token);
          if (VueCookies.isKey(`user${nombre}`)) {
            this.$router.go()
          }
          else{
            VueCookies.set(`user${nombre}`,'firstTime',Infinity)
            this.$router.replace('/bienvenida')
            this.$router.go(1);
          }
          }
        })
        .catch((error) => {
          firebase.auth().signOut();
        });
    },
    loginWidth() {
      this.cargando = true;
      if (this.register) {
        axios
          .post("estudiante/create", {
            nombre: this.nombre,
            password: this.password,
            email: this.email,
            avatar: this.avatarSelected,
            phone: `+${this.selectPais.phone_code}${this.selectPais.numero}`,
          })
          .then((response) => {
            console.log(response.data.ok);
            if (response.data.ok) {
              this.$store.dispatch("guardarToken", response.data.token);
              this.emailIncorrecto = false;
              this.$router.replace("/bienvenida");
              this.$router.go(1);
            } else {
              console.log("Error");
              this.emailIncorrecto = false;
              this.error = true;
            }
          })
          .catch((error) => {
            (this.error = true), (this.emailIncorrecto = false);
          })
          .finally(() => (this.cargando = false));
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
          )
          .finally(() => (this.cargando = false));
      }
    },
    windowWidth() {
      this.width = window.outerWidth;
    },
    validate() {
      this.$refs.form.validate();
    },
    limpiar() {
      this.nombre = "";
      this.password = "";
      this.email = "";
      this.selectPais.numero != undefined
        ? (this.selectPais.numero = "")
        : null;
    },
  },
};
</script>
