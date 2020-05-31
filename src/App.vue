<template>
  <v-app id="inspire">
    <v-app-bar
      elevation="none"
      ref="appBarSticky"
      :class="[
        ruta != 'Home' ? 'app-barfixed' : 'app-barabsolute',
        darkTheme && ruta!='Home' ? 'tercerColorDark' : '',
      ]"
      v-if="['Categoria', 'Modulos', 'Home'].indexOf(ruta) > -1"
      :style="
        ruta == 'Categoria'
          ? 'position:sticky;'
          : ruta == 'Modulos'
          ? 'position:relative;box-shadow:none !important;'
          : ''
      "
    >
      <a
        @click="
          !['Categoria', 'Home'].includes(ruta)
            ? $router.push({ name: 'Categoria' })
            : null
        "
        style="text-decoration:none; color: rgb(62, 65, 109);cursor:pointer;"
        ><h4 class="titulo ma-2" :class="darkTheme && ruta!='Home' ? 'tituloDark' : ''">
          B1nQ0de
        </h4></a
      >

      <div class="lineaVertical"></div>

      <a
        class="ma-2"
        id="login"
        v-if="!loggedIn"
        @click="$router.push('/login')"
        >LOG IN</a
      >

      <div
        style="max-height:70%;"
        v-if="['Categoria', 'Modulos'].includes(ruta)"
      >
        <v-text-field
          :dark="darkTheme == true || false"
          clearable
          v-model="buscar"
          @input="filtrarCat()"
          rounded
          :prepend-inner-icon="
            $vuetify.breakpoint.xsOnly ? '' : 'fas fa-search'
          "
          placeholder="Buscar"
        ></v-text-field>
      </div>
      <!-- Desktop------------- -->
      <v-menu
        v-if="loggedIn"
        transition="slide-y-transition"
        bottom
        offset-overflow
      >
        <template v-slot:activator="{ on }">
          <v-progress-circular
            color="#aa4b6b"
            :value="progresoCat()"
            size="48"
            :width="9"
            class="hidden-xs-only"
          >
            <v-avatar v-on="on" style="cursor:pointer;" size="40">
              <v-img
                :src="require(`@/imagenes/avatars/${datosUser.avatar}.svg`)"
                alt="avatar"
              ></v-img>
            </v-avatar>
          </v-progress-circular>
        </template>
        <v-list :class="darkTheme ? 'secondaryColorDark' : ''">
          <v-list-item>
            <v-list-item-avatar border>
              <img
                :src="require(`@/imagenes/avatars/${datosUser.avatar}.svg`)"
                alt="Avatar"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title :class="darkTheme ? 'tituloDark' : ''">{{
                datosUser.nombre
              }}</v-list-item-title>
              <v-list-item-subtitle :class="darkTheme ? 'subtitleDark' : ''">{{
                datosUser.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            href="https://forms.gle/RKe6ZLZ5gKpJnEjd9"
            target="_blank"
            class="items-list"
          >
            <v-list-item-title class="list-items-title"
              ><v-icon class="ma-2 iconos-list">fas fa-edit</v-icon
              >Feedback</v-list-item-title
            >
          </v-list-item>
          <v-list-item class="items-list" v-if="ruta == 'Modulos'">
            <v-list-item-title class="list-items-title"
              ><v-icon class="ma-2 iconos-list">fas fa-layer-group</v-icon
              >Modulos Completados</v-list-item-title
            >
            <v-list-item-action
              ><v-switch
                @change="$store.commit('setCompletados', !isCompletados)"
                absolute
                inset
                color="green"
                :value="isCompletados"
                :input-value="isCompletados"
                hide-details
              ></v-switch
            ></v-list-item-action>
          </v-list-item>
          <v-list-item class="items-list">
            <v-list-item-title class="list-items-title"
              ><v-icon class="ma-2 iconos-list">fas fa-moon</v-icon>Modo
              Oscuro</v-list-item-title
            >
            <v-list-item-action
              ><v-switch
                @change="$store.commit('setDarkTheme', !darkTheme)"
                absolute
                inset
                color="green"
                :value="darkTheme"
                :input-value="darkTheme"
                hide-details
              ></v-switch
            ></v-list-item-action>
          </v-list-item>
          <v-list-item
            @click="$router.push('/perfil')"
            target="_blank"
            class="items-list"
          >
            <v-list-item-title class="list-items-title"
              ><v-icon class="ma-2 iconos-list">fas fa-user</v-icon
              >Perfil</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout()" class="items-list">
            <v-list-item-title class="list-items-title"
              ><v-icon class="ma-2 iconos-list">fas fa-lock</v-icon> Cerrar
              Sesión</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Mobile --------- -->
      <v-dialog
        v-if="loggedIn"
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on }">
          <v-progress-circular
            color="rgb(62, 65, 109)"
            :value="progresoCat()"
            style="min-width:48px;min-height:48px;"
            :width="9"
            class="hidden-sm-and-up"
          >
            <v-avatar class="hidden-sm-and-up" v-on="on" size="40">
              <v-img
                :src="require(`@/imagenes/avatars/${datosUser.avatar}.svg`)"
                alt="avatar"
              ></v-img>
            </v-avatar>
          </v-progress-circular>
        </template>
        <v-card :class="darkTheme ? 'secondaryColorDark' : ''">
          <v-toolbar
            dark
            :color="!darkTheme ? 'primary' : ''"
            :class="darkTheme ? 'tercerColorDark' : ''"
          >
            <v-btn icon dark @click="dialog = false">
              <v-icon>fas fa-times</v-icon>
            </v-btn>
            <v-toolbar-title>Cuenta</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items> -->
          </v-toolbar>
          <v-list
            subheader
            class="mt-6"
            :class="darkTheme ? 'secondaryColorDark' : ''"
          >
            <!-- <v-subheader>User Controls</v-subheader> -->
            <v-list-item>
              <v-list-item-avatar border size="60">
                <img
                  :src="require(`@/imagenes/avatars/${datosUser.avatar}.svg`)"
                  alt="Avatar"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title :class="darkTheme ? 'tituloDark' : ''">{{
                  datosUser.nombre
                }}</v-list-item-title>
                <v-list-item-subtitle
                  :class="darkTheme ? 'subtitleDark' : ''"
                  >{{ datosUser.email }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title :class="darkTheme ? 'tituloDark' : ''"
                  >Información</v-list-item-title
                >
                <v-list-item-subtitle :class="darkTheme ? 'subtitleDark' : ''"
                  >Tu cuenta de BinQode está vinculada
                  correctamente</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list
            two-line
            subheader
            :class="darkTheme ? 'secondaryColorDark' : ''"
          >
            <v-subheader :class="darkTheme ? 'tituloDark' : ''"
              >Opciones</v-subheader
            >
            <v-list-item
              href="https://forms.gle/RKe6ZLZ5gKpJnEjd9"
              target="_blank"
            >
              <v-icon class="ma-3" :class="darkTheme ? 'tituloDark' : ''"
                >fas fa-edit</v-icon
              >
              <v-list-item-title
                :class="[darkTheme ? 'tituloDark' : 'text--disabled']"
                class="font-weight-medium "
                >FeedBack</v-list-item-title
              >
              <!-- <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle> -->
            </v-list-item>
            <v-list-item v-if="ruta == 'Modulos'">
              <v-icon :class="darkTheme ? 'tituloDark' : ''" class="ma-3"
                >fas fa-layer-group</v-icon
              >
              <v-list-item-title
                :class="[darkTheme ? 'tituloDark' : 'text--disabled']"
                class="font-weight-medium "
                >Modulos Completados</v-list-item-title
              >
              <v-list-item-action>
                <v-switch
                  @change="$store.commit('setCompletados', !isCompletados)"
                  absolute
                  inset
                  :value="isCompletados"
                  color="green"
                  hide-details
                ></v-switch>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                :class="[darkTheme ? 'tituloDark' : 'text--disabled']"
                ><v-icon :class="darkTheme ? 'tituloDark' : ''" class="ma-3"
                  >fas fa-moon</v-icon
                >Modo Oscuro</v-list-item-title
              >
              <v-list-item-action
                ><v-switch
                  @change="$store.commit('setDarkTheme', !darkTheme)"
                  absolute
                  inset
                  color="green"
                  :value="darkTheme"
                  :input-value="darkTheme"
                  hide-details
                ></v-switch
              ></v-list-item-action>
            </v-list-item>
            <v-list-item @click="$router.push('/perfil')">
              <v-icon :class="darkTheme ? 'tituloDark' : ''" class="ma-3"
                >fas fa-user</v-icon
              >
              <v-list-item-title
                :class="[darkTheme ? 'tituloDark' : 'text--disabled']"
                class="font-weight-medium"
                >Perfil</v-list-item-title
              >
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout()">
              <v-icon :class="darkTheme ? 'tituloDark' : ''" class="ma-3"
                >fas fa-lock</v-icon
              >
              <v-list-item-title
                :class="[darkTheme ? 'tituloDark' : 'text--disabled']"
                class="font-weight-medium "
                >Cerrar Sesión</v-list-item-title
              >
            </v-list-item>
          </v-list>
          <div
            style="position:fixed; bottom:0;width:100%; background-color:white;"
            class="d-flex flex-row justify-center"
            :class="darkTheme ? 'secondaryColorDark' : ''"
          >
            <v-card-subtitle class="pa-0" :class="darkTheme ? 'tituloDark' : ''"
              >&copy;BinQode App</v-card-subtitle
            >
            <v-card-subtitle
              class="pa-0"
              :class="darkTheme ? 'tituloDark' : ''"
              id="mobile-footer"
              >{{ new Date().getFullYear() }}</v-card-subtitle
            >
          </div>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content v-scroll="onScroll">
      <router-view></router-view>
    </v-content>
    <v-row
      style="background-color:#041d31"
      class="d-flex justify-center"
      v-if="$route.name == 'Home' || $route.name == 'Login'"
    >
      <v-col lg="3" class="imgFooter">
        <v-img src="./imagenes/imagenesHome/logorobotlampara.png"></v-img>
      </v-col>
      <v-col
        lg="2"
        cols="12"
        class="d-flex align-lg-center align-md-center justify-md-center align-sm-center justify-sm-center justify-center align-center"
      >
        <h1 class="tituloFooter">B1nQ0de</h1>
      </v-col>
      <v-col
        lg="3"
        cols="6"
        class="pt-10 pl-11 d-flex  justify-center flex-column align-center"
      >
        <h3 style="color:white;">Síguenos</h3>
        <ul class="redesFooter">
          <li class="mt-3">
            <v-icon class="mr-2" style="width:21px; color:white"
              >fab fa-facebook-f</v-icon
            >
            Facebook
          </li>
          <li class="mt-3">
            <v-icon class="mr-2" style="width:21px; color:white"
              >fab fa-instagram</v-icon
            >
            Instagram
          </li>
          <li class="mt-3">
            <v-icon class="mr-2" style="width:21px; color:white"
              >fab fa-twitter</v-icon
            >
            Twitter
          </li>
        </ul>
      </v-col>
      <v-col
        lg="3"
        cols="6"
        class="pt-10 pl-11 d-flex justify-center flex-column align-center"
      >
        <h3 style="color:white;">Sobre Nosotros</h3>
        <ul class="redesFooter">
          <li class="mt-3">¿Quiénes Somos?</li>
          <li class="mt-3">Equipo</li>
          <li class="mt-3">Trabajo</li>
          <li class="mt-3">Contáctanos</li>
        </ul>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-col lg="10">
          <hr style="height:0px; border: 1px solid #e5e5e5; width:100%;  " />
          <div class="d-flex justify-space-between">
            <span style="font-size:12px; color:white;">&copy;BinQode App</span>
            <span style="font-size:12px; color:white;">{{
              new Date().getFullYear()
            }}</span>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import firebase from "firebase";
import store from "./store";
import { mapMutations } from "vuex";
export default {
  props: {
    source: String,
    overlay: false,
  },
  data: () => ({
    items: [
      {
        title: "Feedback",
        icon: "fas fa-edit",
        src: "https://forms.gle/RKe6ZLZ5gKpJnEjd9",
      },
    ],

    dialog: false,
    buscar: "",
  }),
  created: function() {
    if (this.$store.getters.logedIn) {
      // var user = decode(store.state.token);
      this.nameUser = this.datosUser.nombre;
      this.emailUser = this.datosUser.email;
      this.avatar = this.datosUser.avatar;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.logedIn;
    },
    isCompletados() {
      return this.$store.getters.completado;
    },
    ruta() {
      return this.$route.name;
    },
    datosUser() {
      return store.state.currentUser.usuario;
    },
    darkTheme() {
      return store.getters.darkTheme;
    },
  },
  watch: {
    $route(to, from) {
      store.commit("setBuscar", "");
      this.buscar = "";
      this.dialog = false;
    },
  },
  methods: {
    logout() {
      // firebase
      //   .auth()
      //   .signOut()
      //   .then(function() {
      //     // Sign-out successful.
      //     this.$router.push("/");
      //   })
      //   .catch(function(error) {
      //     // An error happened.
      //   });
      this.$store.dispatch("logout");
      firebase
        .auth()
        .signOut()
        .then(() => {})
        .catch((error) => {});
    },
    onScroll() {
      if (this.$route.name === "Home") {
        if (this.$refs.appBarSticky.currentScroll > 45) {
          this.$refs.appBarSticky.$el.classList.remove("app-barabsolute");
          this.$refs.appBarSticky.$el.classList.add("app-barfixed");
          // console.log(this.$refs.appBarSticky.$el.setAttribute('style','transform:trnas'));
        } else {
          this.$refs.appBarSticky.$el.classList.remove("app-barfixed");
          this.$refs.appBarSticky.$el.classList.add("app-barabsolute");
        }
      }
    },
    filtrarCat() {
      store.commit("setBuscar", this.buscar == null ? "" : this.buscar);
      // ...mapMutations(['setBuscar'])
    },
    progresoCat() {
      var progreso = 0;
      var modsIns = store.getters.getProgresoporCat(this.$route.params.id);
      modsIns.forEach((item) => {
        progreso += (item.calificacion * 100) / (modsIns.length * 10);
      });

      return store.state.modBuscar.length === 0 || this.ruta != "Modulos"
        ? 0
        : progreso.toFixed(1) / store.state.modBuscar.length;
    },
    // ocultar(){
    //       //  firebase.auth().onAuthStateChanged((user) =>{
    //       //    if(user){
    //       //      var logeado;
    //       //      console.log("si verifico y estas logueado");
    //           //  this.Logeado = 'isloged';

    //       //      this.avatarUser = user.photoURL
    //       //      this.nameUser = user.displayName;
    //       //      this.emailUser = user.email;
    //       //    }
    //       //    else{
    //       //      console.log("si verifico y no estas logueado");
    //             // this.Logeado = 'notloged';

    //       //    }
    //       //  });
    //       if(localStorage.tokenUser){
    //         this.Logeado ='isloged'

    //         try{
    //         var user = decode(localStorage.tokenUser)
    //         // this.avatarUser = user.usuario.avatar;
    //         this.nameUser = user.usuario.nombre;
    //         this.emailUser = user.usuario.email;
    //         }catch(error){this.logout()}
    //       }
    //       else{
    //         this.Logeado = 'notloged';
    //       }

    //     },
  },
};
</script>
