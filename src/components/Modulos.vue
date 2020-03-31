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
  font-size: 34px;
  font-family: "Ubuntu";
  text-align: start;
  border-left: 3px solid rgb(62, 65, 109);
  padding-left: 5px;
  margin-top: 15px;
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
.cardMod {
  width: 100% !important;
  background-color: #f9f9f9f9 !important;
  box-shadow: none !important;
}
.imgMod {
  height: 300px !important;
}
.selectMod {
  height: 150px !important;
}
@media screen and (max-width: 960px) {
  .tituloModulo {
    font-size: 26px;
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
@media screen and (max-width: 600px) {
  .descripcionModulo {
    display: none;
  }
  .tituloModulo {
    font-size: 14px !important;
  }
  .cardMod {
    border-radius: 0px;
  }
}
</style>
<template>
  <v-container class="ma-0 pa-0" style="background-color:#f0efff; height:100%">
    <v-row v-if="error">
      <v-col cols="12" class="d-flex justify-center red--text">
            <h1>
              ¡Error!
            </h1>
      </v-col>
    </v-row>

    <v-row v-if="status" >
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>

     <v-row  class="d-flex justify-center" v-if="status">
      <v-col cols="7" lg="3" md="5" sm="4" v-for="n in 3" :key="n">
        <v-skeleton-loader
          class="mx-auto"
          width="100%"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-if="!status && !error">
      <v-col cols="12" class="d-flex justify-center">
        <h1 style="border:none; font-size:26px !important; text-align:center" class="tituloModulo">
          Modulos de {{ nombreCategoria }}
        </h1>
        <!-- <h1 v-if="!status" style="color:#f44336;font-size:40px;">¡Error!</h1> -->
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center " v-if="!status && !error">
      <v-col
        cols="8"
        lg="3"
        md="5"
        sm="4"
        class="ma-11 mt-2 d-flex flex-wrap"
        v-for="(mod, indexMod) in modulos"
        :key="indexMod"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card class="cardMod pa-2" :elevation="hover ? 6 :null" @click="toCuestionario(mod._id)" style="border-radius:25px;box-shadow:none;">
            <div
              style="width:100%; height:auto; background-color: transparent !important; border-radius:15px;"
            >
              <v-img class="imgMod" :src="mod.img"> </v-img>
            </div>

            <v-row>
              <h1 class="tituloModulo">{{ mod.nombre }}</h1>

              <h3 class="descripcionModulo ">{{ mod.descripcion }}</h3>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    
    <v-row v-if="!status && !error">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="cargarMas()" color="#4d4d87" style="color:white;"
          >Mostrar +</v-btn
        >
      </v-col>
    </v-row>
    <!-- <pre>{{$data }}</pre> -->
  </v-container>
</template>
<script>
import router from "../router";
import axios from "axios";
export default {
  data: () => ({
    model: null,
    status: true,
    error: false,
    modulos: [],
    nombreCategoria: "",
    pagina: 1
  }),
  created() {
    this.getModulos();
  },
  watch: {
    status: function() {}
  },
  methods: {
    getModulos() {
      axios
        .get("modulo/getModulosPorCategoria/" + this.$route.params.id)
        .then(response => {
          this.modulos = response.data.modulos;
          if (this.modulos.length > 0) {
            this.nombreCategoria = response.data.modulos[0].categoria.nombre;
          }
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {this.status = false; this.modulos.length ==0 ? this.error = true : null;});
    },
    cargarMas() {
      let me = this;
      this.pagina++;
      axios
        .get("modulo/?pagina=" + this.pagina)
        .then(response => {
          if (response.data.modulos <= 0) {
            console.log("Esta pagina no tiene mas modulos");
            this.pagina--;
            console.log(this.pagina);
          } else {
            response.data.modulos.forEach(element => {
              me.modulos.push(element);
            });
          }
        })
        .catch(error => {
          this.error = true;
        })
        .finally(() => (this.status = false));
    },
    toCuestionario(id){
      this.$router.push({
        name:'InstroduccionMod',
        params:{
          id:id
        }
      })
    }
  }
};
</script>
