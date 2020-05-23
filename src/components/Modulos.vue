<style>
@font-face {
  font-family: "Ubuntu";
  src: url(../fonts/Ubuntu-Bold.ttf);
}
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
.imgmodulo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2px;
}
.container {
  max-width: 100% !important;
}
.tituloModulo {
  color: rgb(62, 65, 109);
  font-weight: normal;
  font-size: 24px;
  font-family: "Ubuntu";
  text-align: start;
  border-left: 3px solid rgb(62, 65, 109);
  padding-left: 5px;
  margin-top: 15px;
  word-break: break-all;
}
.descripcionModulo {
  color: #6a1b9a !important;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  padding-top: 8px !important;
  text-align: justify;
}
.nombreModulo {
  font-family: "Dosis";
  font-size: 20px;
  font-weight: normal;
  color: rgb(62, 65, 109);
  border-left: 2px solid rgb(62, 65, 109);
}
.mostrarmenosMod {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cardMod {
  width: 100% !important;
  background-color: #f9f9f9f9 !important;
  box-shadow: none !important;
}
.imgMod {
  height: 200px !important;
}
.selectMod {
  height: 150px !important;
}
@media screen and (max-width: 960px) {
  .tituloModulo {
    font-size: 26px;
  }
  .descripcionModulo {
    display: none;
  }
  .cardMod {
    border-radius: 10px !important;
  }
  .botonInfo .v-btn {
    display: none !important;
  }
  .mostrarmenosMod {
    white-space: normal;
    overflow: none;
    text-overflow: none;
  }
}
@media screen and (max-width: 750px) {
  .tituloModulo {
    font-size: 24px;
  }
  .descripcionModulo {
    font-size: 14px;
  }
}
@media screen and (max-width: 450px) {
  .imgMod {
    height: 100px !important;
  }
}
@media screen and (max-width: 600px) {
  .tituloModulo {
    font-size: 14px !important;
  }
}
</style>
<template>
  <v-container class="ma-0 pa-0" style="background-color:#f0efff; height:100%">
    <v-row v-if="error" style="height:100%;">
      <v-col
        cols="12"
        class="d-flex justify-center align-center red--text"
        style="height:100%;"
      >
        <h1>
          ¡Error!
        </h1>
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
      <v-tab @click="$store.commit('setCompletados', true)">Completados</v-tab>
      <v-tab @click="$store.commit('setCompletados', false)"
        >No completados</v-tab
      >
      <v-tabs-slider color="rgb(62, 65, 109)"></v-tabs-slider>
    </v-tabs>

    <v-row
      v-if="!status && !error"
      class="d-flex justify-center align-center align-md-end align-sm-end align-lg-end"
    >
      <h1
        style="border:none; font-size:24px !important; text-align:center;word-break:break-word !important;"
        class="tituloModulo mt-2"
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
            :elevation="hover ? 6 : null"
            style="border-radius:25px;box-shadow:none;transition:0.25s; border-bottom:2px solid rgb(62, 65, 109);"
            :style="{'transform':hover?'translateY(-10px)':'translateY(0)'}"
          >
            <v-hover v-slot:default="{ hover }">
              <v-img
                @click="!verificarDatos? toCuestionario(mod.id): datosInscripcion(mod.id) < 10? resetMod(mod.id): null"
                style=" cursor:pointer;"
                class="imgMod"
                :src="
                  require(`../imagenes/modulos/imagenesModulospng/${mod.img}`)
                "
              >
                <v-fade-transition
                  v-if="verificarDatos ? datosInscripcion(mod.id) < 10 : true"
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
                  <v-list>
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
                        >Ver detalle</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item
                      v-if="
                        verificarDatos ? datosInscripcion(mod.id) < 10 : null
                      "
                      @click="resetMod(mod.id)"
                    >
                      <v-list-item-title
                        style="cursor:pointer;"
                        class="font-weight-medium"
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
                  >
                    {{ mod.nombre }}
                  </h1>
                </div>
                <div style="width:20%" v-if="verificarDatos" class="d-flex justify-center align-center">
                  <v-progress-circular
                    v-if="datosInscripcion(mod.id)<10"
                    :width="$vuetify.breakpoint.xsOnly?2.5:3"
                    rotate="270"
                    color="rgb(62, 65, 109)"
                    :size="$vuetify.breakpoint.xsOnly ? '25' : '40'"
                    :value="datosInscripcion(mod.id) * 10"
                  ><span :style="{'font-size':$vuetify.breakpoint.xsOnly?'xx-small':'unset'}">{{datosInscripcion(mod.id).toFixed(1)}}</span></v-progress-circular>
                  <img v-else src="https://image.flaticon.com/icons/svg/411/411830.svg" alt="" :width="$vuetify.breakpoint.xsOnly?'20px':'30px'" :height="$vuetify.breakpoint.xsOnly?'20px':'30px'">
                </div>
              </div>

              <h3 ref="DesMod" class="descripcionModulo mostrarmenosMod pa-2">
                {{ mod.descripcion }}
              </h3>
              <div style="width:100%" class="d-flex justify-center botonInfo">
                <v-btn
                  @click="mostrarMas(indexMod)"
                  class="pa-0"
                  text
                  style="font-size:12px;color:rgb(62, 65, 109);"
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
            color="#c5cae9"
            class="pa-1 font-weight-bold"
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
export default {
  data: () => ({
    model: 1,

    snackbar: false,
    timeout: 2000,

    status: true,
    error: false,
    modulos: [],
    modulosCompletados: [
      {
        id: "5e5c0fcfafda8328a0d3c190",
        // "completado":true,
        nombre: "CSS",
        img: "css.png",
        descripcion:
          "CSS3 es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado.",
        categoria: {
          estado: false,
          _id: "5e5c0e7cafda8328a0d3c18d",
          nombre: "Desarrollo Web",
          img: "web.png",
          descripcion: "Todo los módulos relacionados al Desarrollo Web. ",
          __v: 0,
        },
      },
      {
        id: "5e5c0f8cafda8328a0d3c18f",
        // "completado":true,
        nombre: "HTML ",
        img: "html.png",
        descripcion:
          "HTML 5 es la quinta revisión importante del lenguaje básico de la World Wide Web.",
        categoria: {
          estado: false,
          _id: "5e5c0e7cafda8328a0d3c18d",
          nombre: "Desarrollo Web",
          img: "web.png",
          descripcion: "Todo los módulos relacionados al Desarrollo Web. ",
          __v: 0,
        },
      },
      {
        id: "5e5c2ab679217d212874dcda",
        // "completado":true,
        nombre: "MySQL",
        img: "database.png",
        descripcion:
          "MySQL es un sistema de gestión de bases de datos relacional desarrollado bajo licencia dual: Licencia pública general/Licencia comercial por Oracle Corporation.",
        categoria: {
          estado: false,
          _id: "5e5c2a6b79217d212874dcd9",
          nombre: "Base de datos",
          img: "db.png",
          descripcion:
            "Una base de datos es un conjunto de datos pertenecientes a un mismo contexto y almacenados sistemáticamente para su posterior uso.",
          __v: 0,
        },
      },
    ],
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
          // : this.modulosCompletados.forEach((element) => {
          //     store.commit("setModulosCompletados", element);
          //   });
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
        text: "¡Si aceptas, anularás tu inscripción al módulo!",
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
