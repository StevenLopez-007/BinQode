<style>
@font-face {
  font-family: "Ubuntu";
  src: url(../fonts/Ubuntu-Bold.ttf);
}
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}

.container {
  max-width: 100% !important;
}
.tituloCat {
  color: rgb(62, 65, 109);
  font-weight: normal;
  font-size: 24px;
  font-family: "Ubuntu";
  text-align: start;
  border-left: 3px solid rgb(62, 65, 109);
  padding-left: 5px;
}
.descripcionCategoria {
  color: #6a1b9a !important;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  padding-top: 8px !important;
}
.mostrarmenos {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nombreCat {
  font-family: "Dosis";
  font-size: 20px;
  font-weight: normal;
  color: rgb(62, 65, 109);
  border-left: 2px solid rgb(62, 65, 109);
}
.v-application .elevation-0 {
  box-shadow: none !important;
}
.cardCat {
  width: 100% !important;
  background-color: #f9f9f9f9 !important;
  box-shadow: none !important;
}
.imgCat {
  height: 200px !important;
  /* border-radius: 25px ; */
}
@media screen and (max-width: 960px) {
  .tituloCat {
    font-size: 26px;
  }
  .cardCat {
    border-radius: 10px !important;
  }
  .imgCat {
    border-radius: 10px;
  }
  .descripcionCategoria {
    display: none;
  }
  .botonInfoCat .v-btn {
    display: none !important;
  }
  .mostrarmenos {
    white-space: normal;
    overflow: none;
    text-overflow: none;
  }
}
@media screen and (max-width: 750px) {
  .tituloCat {
    font-size: 24px;
  }
  .descripcionCategoria {
    font-size: 14px;
  }
}
@media screen and (max-width: 450px) {
  .tituloCat {
    font-size: 20px;
  }
  .descripcionCategoria {
    font-size: 14px;
  }
  .imgCat {
    height: 100px !important;
  }
}
@media screen and (max-width: 600px) {
  .tituloCat {
    font-size: 14px;
    /* margin-top: 10px; */
  }
  .bienvenida h1 {
    font-size: 24px;
    text-align: start;
  }
  .bienvenida {
    height: 40vh !important;
  }
}

.bienvenida {
  height: 40vh;
  /* background-color: salmon; */
  background: linear-gradient(
    90deg,
    rgba(39, 39, 82, 1) 0%,
    rgba(78, 13, 122, 1) 33%,
    rgba(255, 0, 232, 1) 100%
  );
  border-bottom-left-radius: 80px;
  box-shadow: 0px 1px 15px gray;
}
.bienvenida .v-text-field {
  width: 50%;
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

    <!-- <v-row class="bienvenida d-flex justify-center align-center align-content-center">
      <v-col lg="4" md="6" sm="8" cols="12" class="d-flex align-self-center align-center justify-center flex-column ml-5">
        <h1 class="white--text font-weight-medium" style="font-family:Dosis" >Bienvenido/a, {{userName}}</h1>
        <v-text-field background-color="white" rounded color="white" v-model="buscar" append-icon="fas fa-search" placeholder="Buscar categoria"></v-text-field>
      </v-col>
      <v-col lg="4">
           <img style="background-size:cover;" src="https://image.flaticon.com/icons/svg/2210/2210153.svg" alt=""> -->
    <!-- </v-col> -->
    <!-- </v-row> -->

    <v-row
      v-if="!status && !error"
      class="d-flex justify-center align-center align-md-end align-sm-end align-lg-end"
    >
      <h1 style="border:none; font-size:24px;" class="tituloCat mt-2">
        Categorias {{urlImg}}
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
            style="border-radius:25px; box-shadow:none;"
            class="cardCat pa-0"
            :elevation="hover ? 6 : null"
          >
            <!-- <v-btn fab absolute top right color="#38006b"><v-icon color="white">fas fa-play</v-icon></v-btn> -->
            <!-- <div
               @click="toModulo(cat._id)" class="pa-0"  style="cursor:pointer;width:100%; height:auto; background-color: transparent !important; border-radius:15px;"
            > -->
            <v-img
              @click="toModulo(cat._id)"
              style=" cursor:pointer;"
              class="imgCat"
              :src="require('../imagenes/categorias/'+cat.img+'.svg')"
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute opacity="0.60" color="#000000">
                  <h4 class="d-flex flex-column-reverse text-center">Explorar módulos<v-icon color="white" size="36">fas fa-eye</v-icon></h4>
                </v-overlay>
              </v-fade-transition>
            </v-img>
            <!-- </div> -->

            <h1
              ref="tituloCategoria"
              class="tituloCat mostrarmenos mt-lg-2 mb-lg-0 mr-lg-0 ml-lg-0 ma-md-2 ma-sm-2 ma-2"
            >
              {{ cat.nombre }}
            </h1>
            <h3
              ref="DesCategoria"
              class="descripcionCategoria mostrarmenos ml-2"
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
                text
                style="font-size:12px;color:rgb(62, 65, 109);"
                >Info</v-btn
              >
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!-- mostrar + -->
    <v-row
      v-if="!status && !error"
      style="position: absolute; bottom:0px; left:0px; right:0px;"
    >
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="cargarMas()" color="#4d4d87" style="color:white;" rounded
          >Mostrar +</v-btn
        >
        <v-snackbar v-model="snackbar" :timeout="timeout">
          ¡No hay más categorias!
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "../router";
import axios from "axios";
import store from '../store';
import firebase from 'firebase';
export default {
  data: () => ({
    model: null,
    userName:store.state.currentUser.usuario.nombre,

    snackbar: false,
    timeout: 2000,

    status: true,
    error: false,
    categorias: [],
    imagenes: [],
    pagina: 1,
    indexAnt: 0,

    buscar:''

  }),
  created() {
    this.getCategorias();
  },
  watch: {
    status: function() {},
  },
  computed:{
    catFilter(){
        return store.getters['categoriasFil'];
    },
    urlImg(){
        return 
    }
    
  },
  methods: {
    getCategorias() {
      axios
        .get("categoria/?pagina=1")
        .then((response) => {
          // this.categorias = response.data.categorias;

          store.commit("bucarCat",response.data.categorias)
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {
          this.status = false;
          store.state.catBuscar.length == 0 ? (this.error = true) :null;
        });
    },
    cargarMas() {
      let me = this;
      this.pagina++;
      axios
        .get("categoria/?pagina=" + this.pagina)
        .then((response) => {
          if (response.data.categorias.length <= 0) {
            console.log("Esta pagina no tiene mas categorias");
            this.pagina--;
            this.snackbar = true;
            console.log(this.pagina);
          } else {
            store.commit("setMoreCategorias",response.data.categorias);
          }
        })
        .catch((error) => {
          this.error = true;
        })
        .finally(() => (this.status = false));
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
