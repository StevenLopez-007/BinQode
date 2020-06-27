<template>
  <div class="content">
    <div class="d-flex justify-center content align-center">
      <v-row
        class="d-flex justify-center align-center contenidoLogin"
        style="height:450px"
      >
        <v-col
          cols="12"
          lg="3"
          sm="3"
          md="3"
          class="seccion1 ma-0 pa-0 hidden-sm-and-down"
        >
          <v-window
            v-model="onboarding"
            class="fill-height window-arrow"
            show-arrows
            prev-icon="fas fa-chevron-left"
            next-icon="fas fa-chevron-right"
          >
            <v-window-item class="fill-height">
              <div
                class=" pt-8 fill-height d-flex align-center justify-start flex-column"
              >
                <div style="width:100%;height:auto;" class="mb-8">
                  <a
                    id="botonBack"
                    @click="$router.push('/')"
                    style="position:absolute; left:0px;top:10px; z-index:1000;"
                    class="ml-3"
                  >
                    <v-icon size="30">fas fa-arrow-left</v-icon></a
                  >
                  <h1
                    style="font-family:Dosis;"
                    class="text-center white--text mb-2"
                  >
                    B1nQ0de
                  </h1>
                  <div style="width:100%;" class="d-flex justify-center">
                    <v-avatar size="200">
                      <img src="../imagenes/icon1.png" alt="" />
                    </v-avatar>
                  </div>
                </div>
                <v-btn
                  rounded
                  @click="login()"
                  color="#aa4b6b"
                  width="75%"
                  height="45px"
                  class="white--text  mt-1 botonGoogle"
                  style="font-size:10px !important;"
                  ><v-icon color="white" class="ma-3">fab fa-google</v-icon
                  >{{ register ? "CONECTAR" : "INGRESAR" }} CON GOOGLE</v-btn
                >
                <h4 class="mt-2 text-center white--text">
                  {{
                    register
                      ? "Ó regístrate con tu correo"
                      : "Ó continua con tu correo."
                  }}
                </h4>
                <h5
                  v-if="!register && !resetPassword"
                  @click="
                    !register
                      ? ((resetPassword = !resetPassword), animation())
                      : null
                  "
                  style="text-align:center; color:#aa4b6b;text-decoration:underline;cursor:pointer"
                >
                  Olvide mi contraseña
                </h5>
              </div>
            </v-window-item>
          </v-window>
        </v-col>
        <v-col
          cols="12"
          lg="5"
          sm="8"
          md="5"
          class="seccion2 pa-0 ma-0 pl-lg-12 pl-md-12 pl-sm-0"
        >
          <div
            v-if="resetPassword && !success"
            style="width:100%;"
            class="d-flex justify-center tabs"
          >
            <v-icon
              @click="(resetPassword = !resetPassword), animation()"
              style="cursor:pointer;"
              color="#aa4b6b"
              >fas fa-times</v-icon
            >
          </div>
          <div
            v-if="!resetPassword"
            class="tabs"
            :class="$vuetify.breakpoint.xsOnly ? 'tabsSticky' : ''"
          >
            <v-tabs
              class="d-flex justify-center"
              :value="register ? 1 : 0"
              color="#aa4b6b"
              style="background:white;"
            >
              <v-tab
                @click="
                  (register = false),
                    animation(),
                    (error, (emailIncorrecto = false))
                "
                >Ingresar</v-tab
              >
              <v-tab
                @click="
                  (register = true),
                    animation(),
                    (error, (emailIncorrecto = false))
                "
                >Registrarse</v-tab
              >
            </v-tabs>
            <a
              id="botonBack"
              @click="$router.push('/')"
              style="position:absolute; left:0px;top:10px; z-index:1000;"
              class="ml-3"
            >
              <v-icon size="30">fas fa-arrow-left</v-icon></a
            >
          </div>
          <div style="height:85%" ref="seccion2">
            <v-card
              elevation="0"
              class="d-flex flex-column align-center"
              :class="
                register
                  ? 'justify-center'
                  : $vuetify.breakpoint.xsOnly
                  ? 'justify-start'
                  : 'justify-end'
              "
            >
              <v-avatar
                :style="{
                  display:
                    $vuetify.breakpoint.smAndUp && register
                      ? 'none'
                      : 'inherit',
                }"
                :size="$vuetify.breakpoint.xsOnly ? '190' : '270'"
              >
                <img src="../imagenes/imagenesHome/bot.gif" alt="" />
              </v-avatar>
              <h4
                style="color:#aa4b6b;"
                class="text-center"
                v-if="resetPassword && !success"
              >
                Ingresa el <b>E-mail</b> que usaste para registrarte. Enviaremos
                un correo con un enlace para que puedas restablecer tu
                contraseña.
              </h4>
              <h4
                style="color:#aa4b6b;"
                class="text-center"
                v-if="resetPassword && success"
              >
                ¡Correo enviado con éxito!
              </h4>
              <v-btn
                @click="(resetPassword = false), (success = false)"
                class="ma-5"
                v-if="resetPassword && success"
                color="#aa4b6b"
                rounded
                style="color:white;"
                >OK</v-btn
              >
              <h1
                :class="$vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''"
                v-if="$vuetify.breakpoint.smAndDown && !resetPassword"
                style="color:#aa4b6b;font-family:Dosis;"
              >
                B1nQ0de
              </h1>
              <v-btn
                v-if="$vuetify.breakpoint.xsOnly && !resetPassword"
                rounded
                @click="login()"
                color="#aa4b6b"
                width="75%"
                height="45px"
                class="white--text  mt-1 botonGoogle"
                :class="$vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''"
                ><v-icon color="white" class="ma-3">fab fa-google</v-icon
                >{{ register ? "CONECTAR" : "INGRESAR" }} CON GOOGLE</v-btn
              >
              <h4
                v-if="$vuetify.breakpoint.xsOnly && !resetPassword"
                class="mt-2 text-center"
                style="color:#514e95;"
              >
                {{
                  register
                    ? "Ó regístrate con tu correo"
                    : "Ó continua con tu correo."
                }}
              </h4>
              <v-form
                ref="form"
                v-model="valid"
                class="form mb-2"
                v-if="!success"
              >
                <v-text-field
                  :class="$vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''"
                  :counter="30"
                  :rules="nameRules"
                  v-if="register"
                  v-model="nombre"
                  color="#aa4b6b"
                  label="Nombre de usuario"
                  clearable
                ></v-text-field>
                <v-text-field
                  :class="$vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''"
                  :rules="emailRules"
                  v-model="email"
                  color="#aa4b6b"
                  label="E-mail"
                  clearable
                ></v-text-field>
                <v-text-field
                  v-if="!resetPassword"
                  :class="$vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''"
                  @keyup.enter="valid ? loginWidth() : null"
                  :rules="passwordRules"
                  v-model="password"
                  color="#aa4b6b"
                  @click:append="showPassword = !showPassword"
                  :append-icon="
                    showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'
                  "
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                ></v-text-field>
                <span
                  v-if="emailIncorrecto"
                  class="red--text"
                  style="font:size:12px;"
                  >E-mail ó contraseña incorrectos</span
                >
                <span v-if="error" class="red--text" style="font:size:12px;"
                  >Hubo error al iniciar sesión, intentalo de nuevo</span
                >
                <h5
                  v-if="!register && !resetPassword"
                  @click="
                    !register
                      ? ((resetPassword = !resetPassword), animation())
                      : null
                  "
                  style="text-align:right; color:#aa4b6b;text-decoration:underline;cursor:pointer"
                  class="hidden-md-and-up"
                >
                  Olvide mi contraseña
                </h5>
                <v-row v-if="register">
                  <v-col cols="5" class="pa-0">
                    <v-select
                      :class="
                        $vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''
                      "
                      color="#aa4b6b"
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
                      :class="
                        $vuetify.breakpoint.xsOnly && !register ? 'mb-4' : ''
                      "
                      color="#aa4b6b"
                      v-model="selectPais.numero"
                      :rules="phoneRules"
                      :prefix="`+${selectPais.phone_code}`"
                      clearable
                      label="Teléfono"
                      class="d-flex align-center"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-btn
                v-if="!resetPassword"
                :disabled="!valid"
                @click="valid ? loginWidth() : null"
                id="botonLogin"
                class="white--text mb-4"
                width="75%"
                height="50px"
                style="border-radius: 24px; transition:0.25s;"
                color="#aa4b6b"
                >{{ register ? "Crear cuenta" : "Ingresar" }}</v-btn
              >
              <!-- Enviar Email -->
              <v-btn
                v-if="resetPassword && !success"
                :disabled="!valid"
                @click="valid ? enviarEmail() : null"
                id="botonLogin"
                class="white--text mb-4"
                width="75%"
                height="50px"
                style="border-radius: 24px; transition:0.25s;"
                color="#aa4b6b"
                >{{
                  errorEnviarEmail
                    ? "Ocurrio un error, volver a enviar"
                    : "Enviar"
                }}</v-btn
              >
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      style="z-index:3000 !important;"
      persistent
      width="300"
      v-model="dialogGoogle"
    >
      <v-card color="#aa4b6b">
        <v-card-text class="white--text text-center font-weight-medium pa-4"
          >Por favor, espere...</v-card-text
        >
        <v-progress-linear indeterminate color="white"></v-progress-linear>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import firebase from "firebase";
import axios from "axios";
import decode from "jwt-decode";
import store from "../store";
import VueCookies from "vue-cookies";
import "../styles/stylesmin/login.min.scss";
// import {config} from './helpers/firebaseConfig'
export default {
  data() {
    return {
      dialogGoogle: false,
      onboarding: 0,
      avatarSelected: "av-2.png",
      dialog: false,
      valid: true,
      width: 0 + "px",
      register: false,
      resetPassword: false,
      showPassword: false,
      nombre: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) =>
          /^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            v
          ) || "E-mail deber ser válido",
      ],
      nameRules: [
        (v) => (v == null ? (v = "") : !!v || "El nombre es requerido"),
        (v) =>
          v == null
            ? (v = "")
            : v.length <= 30 || "El nombre debe ser menos de 30 carácteres",
        (v) => /^[a-zA-Z\s]+$/g.test(v) || "El nombre solo debe tener letras",
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
      errorEnviarEmail: false,
      success: false,
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
        .catch(function(error) {});
    },
    getToken() {
      let me = this;
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          var user = result.user;
          user != null
            ? me.redirectGoogle(
                user.email,
                user.displayName
              )((me.dialogGoogle = true))
            : null;
        })
        .catch(function(error) {});
    },
    redirectGoogle(email, nombre) {
      axios
        .post("estudiante/createGoogleAccount/", {
          nombre: nombre,
          email: email,
          avatar: this.avatarSelected,
        })
        .then((response) => {
          if (response.data.ok) {
            this.$store.dispatch("guardarToken", response.data.token);
            if (VueCookies.isKey(`user${email}`)) {
              localStorage.setItem("loginSuccess", true);
              this.$router.go();
            } else {
              VueCookies.set(`user${email}`, "firstTime", Infinity);
              this.$router.replace("/bienvenida");
              this.$router.go(1);
            }
          }
        })
        .catch((error) => {
          firebase.auth().signOut();
          this.dialogGoogle = false;
        });
    },
    loginWidth() {
      this.cargando = true;
      this.dialogGoogle = true;
      if (this.register) {
        axios
          .post("estudiante/create", {
            nombre: this.nombre
              .toLowerCase()
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            password: this.password,
            email: this.email,
            avatar: this.avatarSelected,
            phone: `+${this.selectPais.phone_code}${this.selectPais.numero}`,
          })
          .then((response) => {
            if (response.data.ok) {
              this.$store.dispatch("guardarToken", response.data.token);
              this.emailIncorrecto = false;
              this.$router.replace("/bienvenida");
              this.$router.go(1);
            } else {
              this.emailIncorrecto = false;
              this.error = true;
            }
          })
          .catch((error) => {
            (this.error = true), (this.emailIncorrecto = false);
          })
          .finally(() => (this.cargando = false)((this.dialogGoogle = false)));
      } else {
        axios
          .post("estudiante/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.ok) {
              this.$store.dispatch("guardarToken", response.data.token);
              localStorage.setItem("loginSuccess", true);
              this.emailIncorrecto = false;
              this.$router.go("/categoria");
            } else {
              this.error = false;
              this.emailIncorrecto = true;
              this.password = "";
            }
          })
          .catch((error) => {
            this.error = true;
            this.emailIncorrecto = false;
          })
          .finally(() => {
            this.cargando = false;
            this.dialogGoogle = false;
          });
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
    animation() {
      this.$refs.seccion2.classList.add("fadeIn");
      setTimeout(() => {
        this.$refs.seccion2.classList.remove("fadeIn");
      }, 250);
      // console.log(this.$refs.seccion2.$el)
    },
    enviarEmail() {
      if (this.resetPassword) {
        this.cargando = true;
        this.dialogGoogle = true;
        var datosEmail = {
          to: this.email,
          subject: "Cambio de contraseña",
          message: "",
        };
        axios
          .post("mail/", datosEmail)
          .then((result) => {
            if (!result.data.ok) {
              this.errorEnviarEmail = true;
            } else {
              //  this.resetPassword = false
              this.limpiar();
              this.success = true;
            }
          })
          .finally(() => {
            this.cargando = false;
            this.dialogGoogle = false;
          });
      }
    },
  },
};
</script>
