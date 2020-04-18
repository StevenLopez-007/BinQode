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
  border-radius: 25px !important;
}

@media screen and (max-width: 960px) {
  .tituloCat {
    font-size: 26px;
  }
  .cardCat {
    border-radius: 10px !important;
  }
  .descripcionCategoria {
    display: none;
  }
  .botonInfoCat .v-btn{
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
    margin-top: 10px;
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

    <!-- <v-row v-if="status" style="height:100%;">
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="height:100%;"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row> -->

    <v-row
      v-if="!status && !error"
      class="d-flex justify-center align-center align-md-end align-sm-end align-lg-end"
    >
      <h1 style="border:none; font-size:24px;" class="tituloCat mt-2">
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
        v-for="(cat, indexCat) in categorias"
        :key="indexCat"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card style="border-radius:25px; box-shadow:none;" class="cardCat pa-2" :elevation="hover ? 6 : null">
            <div
               @click="toModulo(cat._id)"  style="cursor:pointer;width:100%; height:auto; background-color: transparent !important; border-radius:15px;"
            >
              <v-img class="imgCat" :src="imagenes[indexCat]"> </v-img>
            </div>
            <h1 ref="tituloCategoria" class="tituloCat mostrarmenos">
              {{ cat.nombre }}
            </h1>
            <h3 ref="DesCategoria" class="descripcionCategoria mostrarmenos">
              {{ cat.descripcion }}
            </h3>
            <div style="width:100%" class="d-flex justify-center descripcionCategoria botonInfoCat">
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
        <v-btn @click="cargarMas()" color="#4d4d87" style="color:white;"
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
export default {
  data: () => ({
    model: null,

    snackbar: false,
    timeout: 2000,

    status: true,
    error: false,
    categorias: [],
    imagenes: [
      "https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Categorias%2Fbase-de-datos.svg?alt=media&token=cf59da26-fc06-45eb-b06e-8ab658415907",
      "https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Categorias%2Fprogramador.svg?alt=media&token=f00bbcff-943e-416a-a678-8b800298dc19",
      "https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Categorias%2Finterfaz.svg?alt=media&token=b67518c3-42a8-40c5-85b5-4a841c07d4ae",
    ],
    pagina: 1,
    indexAnt: 0,

    mas: true,
    menos: false,
  }),
  created() {
    this.getCategorias();
  },
  watch: {
    status: function() {},
  },
  methods: {
    getCategorias() {
      axios
        .get("categoria/?pagina=1")
        .then((response) => {
          this.categorias = response.data.categorias;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {
          this.status = false;
          this.categorias.length == 0 ? (this.error = true) : null;
        });
    },
    cargarMas() {
      let me = this;
      this.pagina++;
      axios
        .get("categoria/?pagina=" + this.pagina)
        .then((response) => {
          if (response.data.categorias <= 0) {
            console.log("Esta pagina no tiene mas categorias");
            this.pagina--;
            this.snackbar = true;
            console.log(this.pagina);
          } else {
            response.data.categorias.forEach((element) => {
              me.categorias.push(element);
            });
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
      this.menos = true;
      this.mas = false;
      
      if (this.indexAnt == index) {
        this.$refs.tituloCategoria[this.indexAnt].classList.toggle("mostrarmenos");
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
