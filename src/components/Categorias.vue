<template>
  <v-container
    class="ma-0 pa-0"
    :class="darkTheme ? 'primaryColorDark' : ''"
    style="background-color:#f0efff; height:100%"
  >
    <v-row v-if="error" style="height:80%;">
      <v-col cols="12" class="d-flex justify-center flex-column align-center">
        <v-avatar tile size="350">
          <img :src="require('../imagenes/moduloVacio/error.svg')" alt="" />
        </v-avatar>
        <div class="text-center ma-1">
          <v-sheet
            :color="darkTheme ? '#4f5b62' : '#c5cae9'"
            class="pa-1 font-weight-bold"
            :class="darkTheme ? 'tituloDark' : ''"
            style="color:#424242;"
            >¡Ocurrío algún error!
          </v-sheet>
        </div>
      </v-col>
    </v-row>

    <v-row
      v-if="!status && !error"
      class="d-flex justify-center align-center align-md-end align-sm-end align-lg-end"
    >
      <h1
        style="border:none; font-size:24px;"
        class="tituloCat mt-2"
        :class="darkTheme ? 'tituloDark' : ''"
      >
        Categorias
      </h1>
    </v-row>

    <v-row
      v-if="status"
      style="height:60px;"
      class="d-flex justify-center align-end"
    >
      <v-skeleton-loader type="text" width="50%"> </v-skeleton-loader>
    </v-row>

    <v-row class="d-flex justify-center" v-if="status">
      <v-col
        cols="6"
        lg="3"
        md="5"
        sm="4"
        v-for="n in 4"
        :key="n"
        class="ma-lg-11 ma-sm-6  d-flex flex-wrap"
      >
        <v-skeleton-loader
          class="mx-auto imgCat cardCat"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row
      class="d-flex justify-center mt-8 mt-md-0 mt-sm-0 mt-lg-0"
      v-if="!status && !error"
    >
      <v-col
        cols="6"
        lg="3"
        md="5"
        sm="4"
        class="ma-lg-11 ma-sm-6  d-flex flex-wrap"
        v-for="(cat, indexCat) in catFilter"
        :key="indexCat"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            style="border-radius:25px; box-shadow:none; transition:0.25s;"
            class="cardCat pa-0"
            :class="darkTheme ? 'secondaryColorDark' : ''"
            :elevation="hover ? 6 : null"
            :style="{ transform: hover ? 'scale(1.05)' : 'scale(1)' }"
          >
            <v-img
              @click="toModulo(cat.id)"
              style=" cursor:pointer; background-color:white !important;"
              class="imgCat"
              :src="require('../imagenes/categorias/' + cat.img + '.svg')"
              contain
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute opacity="0.60" color="#000000">
                  <h4 class="d-flex flex-column-reverse text-center">
                    Explorar módulos<v-icon color="white" size="36"
                      >fas fa-eye</v-icon
                    >
                  </h4>
                </v-overlay>
              </v-fade-transition>
            </v-img>
            <!-- </div> -->

            <h1
              ref="tituloCategoria"
              class="tituloCat mostrarmenos mt-lg-2 mb-lg-0 mr-lg-0 ml-lg-0 ma-md-2 ma-sm-2 ma-2"
              :class="darkTheme ? 'tituloDark' : ''"
            >
              {{ cat.nombre }}
            </h1>
            <h3
              ref="DesCategoria"
              class="descripcionCategoria mostrarmenos ml-2"
              :class="darkTheme ? 'subtitleDark' : ''"
            >
              {{ cat.descripcion }}
            </h3>

            <div
              style="width:100%"
              class="d-flex justify-center descripcionCategoria botonInfoCat"
            >
              <v-btn
                @click="mostrarMas(indexCat)"
                class="pa-0"
                :class="darkTheme ? 'tituloDark' : ''"
                text
                style="font-size:12px;color:#aa4b6b;"
                >Info</v-btn
              >
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row
      v-if="!status && !error && catFilter.length === 0"
      style="height:80%;"
    >
      <v-col cols="12" class="d-flex justify-center flex-column align-center">
        <v-avatar tile size="350">
          <img :src="require('../imagenes/moduloVacio/modVacio.svg')" alt="" />
        </v-avatar>
        <div class="text-center ma-1">
          <v-sheet
            :color="darkTheme ? '#4f5b62' : '#c5cae9'"
            class="pa-1 font-weight-bold"
            :class="darkTheme ? 'tituloDark' : ''"
            style="color:#424242;"
            >¡Parece que no tenemos la categoria que buscas!
          </v-sheet>
        </div>
      </v-col>
    </v-row>
    <!-- mostrar + -->
    <v-row v-if="!status && !error && catFilter.length > 0">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn
          :disabled="desacticarMas"
          @click="cargarMas()"
          color="#aa4b6b"
          style="color:white;position: absolute; bottom:0px; left:0px; right:0px;margin:auto;"
          rounded
          >Mostrar +</v-btn
        >
        <v-snackbar v-model="snackbar" :timeout="timeout">
          ¡No hay más categorias!
        </v-snackbar>
      </v-col>
    </v-row>
    <!-- <pre>{{$store.getters['categoriasFil']}}</pre> -->
  </v-container>
</template>
<script>
import router from "../router";
import axios from "axios";
import store from "../store";
import "../styles/stylesmin/categorias.min.scss";
// import firebase from 'firebase';
import Swal from "sweetalert2";
export default {
  data: () => ({
    model: null,
    userName: store.state.currentUser.usuario.nombre,
    desacticarMas: false,

    snackbar: false,
    timeout: 2000,

    status: true,
    error: false,
    categorias: [],
    imagenes: [],
    pagina: 1,
    indexAnt: 0,

    buscar: "",
  }),
  created() {
    this.getCategorias();
  },
  mounted() {
    if(localStorage.loginSuccess && localStorage.loginSuccess != undefined){
      Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
    }).fire({
      icon: "success",
      title: `¡Hola!, ${store.state.currentUser.usuario.nombre}`,
    });
      localStorage.removeItem("loginSuccess")
    }
  },
  watch: {
    status: function() {},
  },
  computed: {
    catFilter() {
      return store.getters["categoriasFil"];
    },
    darkTheme() {
      return store.getters.darkTheme;
    },
  },
  methods: {
    getCategorias() {
      axios
        .get("categoria/?pagina=1")
        .then((response) => {
          // this.categorias = response.data.categorias;

          store.commit("bucarCat", response.data.categorias);
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {
          this.status = false;
          store.state.catBuscar.length == 0 ? (this.error = true) : null;
        });
    },
    cargarMas() {
      this.desacticarMas = true;
      let me = this;
      var pagina = 0;
      pagina = store.state.paginaCat;
      //  store.commit("paginaCat",pagina+1)
      //  console.log(store.state.paginaCat)
      axios
        .get("categoria/?pagina=" + pagina + 1)
        .then((response) => {
          if (response.data.categorias.length <= 0) {
            
            this.snackbar = true;
            
          } else {
            store.commit("paginaCat", pagina + 1);
            store.commit("setMoreCategorias", response.data.categorias);
          }
        })
        .catch((error) => {
          this.error = true;
        })
        .finally(() => ((this.status = false), (this.desacticarMas = false)));
    },
    toModulo(id) {
      this.$router.push({ name: "Modulos", params: { id: id } });
    },
    mostrarMas(index) {
      if (this.indexAnt == index) {
        this.$refs.tituloCategoria[this.indexAnt].classList.toggle(
          "mostrarmenos"
        );
        this.$refs.DesCategoria[this.indexAnt].classList.toggle("mostrarmenos");
      } else {
        this.$refs.tituloCategoria[index].classList.remove("mostrarmenos");
        this.$refs.DesCategoria[index].classList.remove("mostrarmenos");

        this.$refs.tituloCategoria[this.indexAnt].classList.add("mostrarmenos");
        this.$refs.DesCategoria[this.indexAnt].classList.add("mostrarmenos");

        this.indexAnt = index;
      }
    },
  },
};
</script>
