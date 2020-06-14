
<template>
  <v-container class="ma-0 pa-0" :class="darkTheme?'primaryColorDark':''" style="background-color:#f0efff; height:100%">
    <v-row v-if="error" style="height:80%;">
      <v-col
        cols="12"
        class="d-flex justify-center flex-column align-center"
      >
      <v-avatar tile size="350">
          <img :src="require('../imagenes/moduloVacio/error.svg')" alt="" />
      </v-avatar>
      <div class="text-center ma-1">
        <v-sheet :color="darkTheme?'#4f5b62':'#c5cae9'"
            class="pa-1 font-weight-bold"
            :class="darkTheme?'tituloDark':''"
            style="color:#424242;">¡Ocurrío algún error!
            
        </v-sheet>
        <v-btn @click="$router.replace('/categoria')" fab color="red darken-1" small style="color:white;font-size:10px;cursor:pointer">Salir</v-btn>
      </div>
      </v-col>
    </v-row>

    <v-row
      v-if="status"
      style="height:60px;"
      class="d-flex justify-center align-end"
    >
      <v-skeleton-loader type="text" width="50%"> </v-skeleton-loader>
    </v-row>

    <v-row class="d-flex justify-center " v-if="status">
      <v-col
        cols="6"
        lg="3"
        md="5"
        sm="4"
        v-for="n in 4"
        :key="n"
        class="ma-lg-11 ma-sm-6 d-flex flex-wrap"
      >
        <v-skeleton-loader
          class="mx-auto cardMod imgMod"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-tabs
      v-if="!status && !error"
      :style="
        $route.name == 'Modulos'
          ? 'box-shadow:0px 2px 6px 0px #00000017; position:sticky;top:0;z-index:1000;'
          : ''
      "
      grow
      color="rgb(62, 65, 109)"
      centered
      :value="isCompletados ? 0 : 1"
      background-color="#fffff"
      show-arrows
    >
      <v-tab style="transition:0.2s" :class="darkTheme?'tercerColorDark subtitleDark':''" @click="$store.commit('setCompletados', true)">Completados</v-tab>
      <v-tab style="transition:0.2s" :class="darkTheme?'tercerColorDark subtitleDark':''" @click="$store.commit('setCompletados', false)"
        >No completados</v-tab
      >
      <v-tabs-slider :color="!darkTheme?'rgb(62, 65, 109)':'#aa4b6b '"></v-tabs-slider>
    </v-tabs>

    <v-row
      v-if="!status && !error"
      class="d-flex justify-center align-center align-md-end align-sm-end align-lg-end"
    >
      <h1
        style="border:none; font-size:24px !important; text-align:center;word-break:break-word !important;"
        class="tituloModulo mt-2" :class="darkTheme?'tituloDark':''"
      >
        Modulos de {{ nombreCategoria }}
      </h1>
      <!-- <h1 v-if="!status" style="color:#f44336;font-size:40px;">¡Error!</h1> -->
    </v-row>

    <v-row
      class="d-flex justify-center mt-8 mt-md-0 mt-sm-0 mt-lg-0"
      v-if="!status && !error && modulosFilter.length > 0"
    >
      <v-col
        cols="6"
        lg="3"
        md="5"
        sm="4"
        class="ma-lg-11 ma-sm-6 d-flex flex-wrap"
        v-for="(mod, indexMod) in modulosFilter"
        :key="indexMod"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="cardMod pa-0"
            :class="darkTheme?'secondaryColorDark':''"
            :elevation="hover ? 6 : null"
            style="border-radius:25px;box-shadow:none;transition:0.25s; border-bottom:2px solid #aa4b6b;"
            :style="{transform:hover?'scale(1.05)':'scale(1)'}"
          >
            <v-hover v-slot:default="{ hover }">
              <v-img
                @click="!verificarDatos? toCuestionario(mod.id): datosInscripcion(mod.id) >=0? resetMod(mod.id): null"
                style=" cursor:pointer;"
                class="imgMod"
                :src="
                  require(`../imagenes/modulos/imagenesModulospng/${mod.img}`)
                "
              >
                <v-fade-transition
                  v-if="verificarDatos ? datosInscripcion(mod.id) >=0 : true"
                >
                  <v-overlay
                    v-if="hover"
                    absolute
                    opacity="0.60"
                    color="#263238"
                  >
                    <h4 class="mt-1 d-flex flex-column text-center">
                      <v-icon color="white" size="36">{{
                        isCompletados ? "fas fa-redo-alt" : "fas fa-play"
                      }}</v-icon>
                      {{ isCompletados ? "Volver a intentar" : "Iniciar" }}
                    </h4>
                  </v-overlay>
                </v-fade-transition>

                <v-menu
                  bottom
                  right
                  transition="fade-transition"
                  v-if="isCompletados"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      depressed
                      :small="$vuetify.breakpoint.smAndUp"
                      :x-small="$vuetify.breakpoint.xsOnly"
                      class="ma-1"
                      fab
                      color="rgba(0,0,0,0.5)"
                      style="position:relative;z-index:3000;"
                    >
                      <v-icon color="white" size="18"
                        >fas fa-ellipsis-v</v-icon
                      ></v-btn
                    >
                  </template>
                  <v-list :class="darkTheme?'secondaryColorDark':''">
                    <v-list-item>
                      <v-list-item-title
                        style="cursor:pointer;"
                        @click="
                          $router.replace({
                            name: 'cuestionariocon',
                            params: { id: mod.id, idCat: $route.params.id },
                          })
                        "
                        class="font-weight-medium"
                        :class="darkTheme?'subtitleDark':''"
                        >Ver detalle</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item
                      v-if="
                        verificarDatos ? datosInscripcion(mod.id) >=0 : null
                      "
                      @click="resetMod(mod.id)"
                    >
                      <v-list-item-title
                        style="cursor:pointer;"
                        class="font-weight-medium"
                        :class="darkTheme?'subtitleDark':''"
                        >Volver a realizar test</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-img>
            </v-hover>
            <!-- <v-badge v-if="verificarDatos" inline overlap :content="datosInscripcion(mod.id)" :value="datosInscripcion(mod.id)"></v-badge> -->
            <v-row style="position:relative;">
              <!-- <v-progress-linear :striped="true" v-if="verificarDatos" :value="datosInscripcion(mod.id)*10"> -->
              <!-- </v-progress-linear> -->
              <div style="width:100%" class="d-flex align-center">
                <div :style="{ width: verificarDatos ? '80%' : '100%' }">
                  <h1
                    ref="tituloMod"
                    class="tituloModulo mostrarmenosMod mt-lg-2 mb-lg-0 mr-lg-0 ml-lg-0 ma-md-2 ma-sm-2 ma-2"
                    :class="darkTheme?'tituloDark':''"
                  >
                    {{ mod.nombre }}
                  </h1>
                </div>
                <div style="width:20%" v-if="verificarDatos" class="d-flex justify-center align-center">
                  <v-progress-circular
                    v-if="datosInscripcion(mod.id)<1"
                    :width="$vuetify.breakpoint.xsOnly?2.5:3"
                    rotate="270"
                    color="#aa4b6b"
                    :size="$vuetify.breakpoint.xsOnly ? '25' : '40'"
                    :value="datosInscripcion(mod.id) * 100"
                  ><span :style="{'font-size':$vuetify.breakpoint.xsOnly?'xx-small':'unset'}">{{(datosInscripcion(mod.id).toFixed(1)*100)}}</span></v-progress-circular>
                  <img v-else src="https://image.flaticon.com/icons/svg/411/411830.svg" alt="" :width="$vuetify.breakpoint.xsOnly?'20px':'30px'" :height="$vuetify.breakpoint.xsOnly?'20px':'30px'">
                </div>
              </div>

              <h3 ref="DesMod" class="descripcionModulo mostrarmenosMod pa-2" :class="darkTheme?'subtitleDark':''">
                {{ mod.descripcion }}
              </h3>
              <div style="width:100%" class="d-flex justify-center botonInfo">
                <v-btn
                  @click="mostrarMas(indexMod)"
                  class="pa-0"
                  :class="darkTheme?'tituloDark':''"
                  text
                  style="font-size:12px;color:#aa4b6b;"
                  >Info</v-btn
                >
              </div>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row
      v-if="!status && !error && modulosFilter.length === 0"
      style="height:80%;"
    >
      <v-col cols="12" class="d-flex justify-center flex-column align-center">
        <v-avatar tile size="350">
          <img :src="require('../imagenes/moduloVacio/modVacio.svg')" alt="" />
        </v-avatar>
        <div class="text-center ma-1">
          <v-sheet
            :color="darkTheme?'#4f5b62':'#c5cae9'"
            class="pa-1 font-weight-bold"
            :class="darkTheme?'tituloDark':''"
            style="color:#424242;"
            >{{
              isCompletados && $store.state.buscar.length > 0
                ? "Parece que no has completado el modulo que buscas"
                : isCompletados && $store.state.buscar.length === 0
                ? "Parace que no has completado ningun módulo, ¿Por qué no comienzas alguno?"
                : "¡Parece que no tenemos el modulo que buscas!"
            }}
            <v-btn
              v-if="isCompletados && $store.state.buscar.length === 0"
              @click="$store.commit('setCompletados', false)"
              color="white"
              fab
              small
              depressed
              >OK</v-btn
            ></v-sheet
          >
        </div>
      </v-col>
    </v-row>
    <!-- <v-row
      v-if="!status && !error && modulosFilter.length>0"
      style="position: absolute; bottom:0px; left:0px; right:0px;"
    >
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="cargarMas()" color="#4d4d87" style="color:white;" rounded
          >Mostrar +</v-btn
        >
        <v-snackbar v-model="snackbar" :timeout="timeout">
          ¡No hay más modulos!
        </v-snackbar>
      </v-col>
    </v-row> -->
  </v-container>
</template>
<script>
import router from "../router";
import axios from "axios";
import store from "../store";
import Swal from "sweetalert2";
import "../styles/stylesmin/modulos.min.scss"
export default {
  data: () => ({
    model: 1,

    snackbar: false,
    timeout: 2000,

    status: true,
    error: false,
    modulos: [],
    // nombreCategoria: "",
    pagina: 1,
    indexAnt: 0,
    diferentes: [],
  }),
  created() {
    this.getInscripciones();
  },
  watch: {},
  computed: {
    modulosFilter() {
      return store.getters.modulosFil;
    },
    isCompletados() {
      return this.$store.getters.completado;
    },
    verificarDatos() {
      return !this.error && this.isCompletados && this.modulosFilter.length > 0;
    },
    nombreCategoria() {
      return store.state.modBuscar[0].categoria.nombre;
    },
    darkTheme(){
      return store.getters.darkTheme
    }
  },
  methods: {
    getModulos() {
      axios
        .get("modulo/getModulosPorCategoria/" + this.$route.params.id)
        .then((response) => {
          // this.modulos = response.data.modulosEdit;
          if(response.data.modulosEdit != undefined){
          if (response.data.modulosEdit.length > 0 ) {
            // this.nombreCategoria =
            //   response.data.modulosEdit[0].categoria.nombre;
            store.commit("buscarMod", response.data.modulosEdit);
            
          }
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {
          this.status = false;
          store.state.modBuscar.length == 0 ? (this.error = true) : null;
        });
    },
    getInscripciones() {
      axios
        .get(`inscripcion/getInscrip/${store.state.currentUser.usuario._id}`)
        .then((response) => {
          response.data.inscripcions != undefined || response.data.inscripcions.length>0
            ? (store.commit("setModulosCompletados", response.data.inscripcions),this.getModulos())
            : null;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cargarMas() {
      let me = this;
      this.pagina++;
      axios
        .get("modulo/?pagina=" + this.pagina)
        .then((response) => {
          if (response.data.modulosEdit <= 0) {
            console.log("Esta pagina no tiene mas modulos");
            this.pagina--;
            this.snackbar = true;
            console.log(this.pagina);
          } else {
            store.commit("setMoreModulos", response.data.modulosEdit);
          }
        })
        .catch((error) => {
          this.error = true;
          console.log(error);
        })
        .finally(() => (this.status = false));
    },
    toCuestionario(id,idCat) {
      this.$router.replace({
        name: "InstroduccionMod",
        params: {
          id: id,
          idCat: this.$route.params.id || idCat,
        },
      });
    },
    mostrarMas(index) {
      // var elementosTitulos = this.$refs.tituloMod;
      // var elementosDes= this.$refs.DesMod;
      // elementosTitulos.reverse();
      // elementosDes.reverse();
      // console.log(index, this.indexAnt)
      if (this.indexAnt == index) {
        this.$refs.tituloMod[this.indexAnt].classList.toggle("mostrarmenosMod");
        this.$refs.DesMod[this.indexAnt].classList.toggle("mostrarmenosMod");
      } else {
        this.$refs.tituloMod[index].classList.remove("mostrarmenosMod");
        this.$refs.DesMod[index].classList.remove("mostrarmenosMod");

        this.$refs.tituloMod[this.indexAnt].classList.add("mostrarmenosMod");
        this.$refs.DesMod[this.indexAnt].classList.add("mostrarmenosMod");

        this.indexAnt = index;
      }
      // console.log(this.$refs)
      // console.log(elementosDes)
      // console.log(elementosTitulos)
      // console.log('////////////////////')
      // console.log(elementosDes[index])
      // console.log(elementosTitulos[index])
    },
    datosInscripcion(id) {
      var datosIns = store.getters.getDatosIns(id);
      return datosIns[0].calificacion;
    },
    resetMod(idMod) {
      var idCat = this.$route.params.id
      Swal.fire({
        icon: "warning",
        title: "¿Reintentar módulo?",
        text: this.datosInscripcion(idMod)>=1?'Ya tienes el 100% de este módulo, ¿Seguro quieres anular tu inscripción?':'¡Si aceptas, anularás tu inscripción al módulo!',
        showCancelButton: true,
        confirmButtonColor: "#00b248",
        cancelButtonColor: "#ef5350",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          axios
            .get(
              `cuestionarioRes/reiniciarModulo/${idMod}/${store.state.currentUser.usuario._id}`,{headers:{"x-token":store.state.token}}
            )
            .then((response) => {
              response.data.ok?this.toCuestionario(idMod,idCat):this.$store.dispatch("logout")
            })
            .catch((error) => {
              this.$router.push({ name: "Categoria" });
            });
        }
      });
    },
  },
};
</script>
