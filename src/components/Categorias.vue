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
.tituloCat {
  color: rgb(62, 65, 109);
  font-weight: normal;
  font-size:36px;
  font-family: "Ubuntu";
}
.descripcionModulo {
  color: #6a1b9a;
  font-size: 16px;
  font-weight: 1em;
  line-height: 24px;
}
.nombreModulo {
  font-family: "Dosis";
  font-size: 20px;
  font-weight: normal;
  color: rgb(62, 65, 109);
  border-left: 2px solid rgb(62, 65, 109);
}
.cardMod {
  width: 250px !important;
}
.imgMod {
  height: 150px !important;
}
.selectMod {
  height: 150px !important;
}
@media screen and (max-width: 770px) {
  .tituloCat {
    font-size: 34px;
  }
  .nombreModulo {
    font-size: 18px;
  }
  .descripcionModulo {
    font-size: 14px;
  }
  .imgMod {
    height: 100px !important;
  }
  .cardMod {
    width: 200px !important;
  }
}
@media screen and (max-width: 500px) {
  .tituloCat {
    font-size: 26px;
  }
}
</style>
<template>
  <v-container class="ma-0 pa-0" style="background-color:#f0efff">
    <div v-for="(cat, indexCat) in categorias" :key="indexCat" class="pt-2">
      <v-sheet class="ma-0" max-width="100%" height="auto" color="#f0efff">
        <h1 class="pl-4 tituloCat">
          {{ cat.nombreCategoria }}
        </h1>
        <!-- <hr class="linea-hor" /> -->
        <v-slide-group class="pa-1" center-active show-arrows >
          <v-slide-item v-for="(n, indexMod) in modulos" :key="indexMod" >
            <div class="d-flex justify-space-between flex-no-wrap">
              <v-card
                @click="toModulo"
                color="white"
                class="ma-4 cardMod"
                elevation="4"
                v-if="cat.nombreCategoria == n.nombreCategoria"
                style="position:relative;border-radius:7px;"
              >
                    <v-img  class="white--text align-end imgMod" :src="n.imagenModulo">
                    </v-img>
                  <!-- <v-fab-transition>
                    <v-btn
                      color="pink"
                      dark
                      small
                      absolute
                      bottom
                      right
                      fab
                    >
                      <v-icon >play_arrow</v-icon>
                    </v-btn>
                  </v-fab-transition> -->
               
                <h2 class="ma-0 mt-1 pl-1 nombreModulo">
                  {{ n.nombreModulo }}
                </h2>
                <h3 class="mt-1 pa-0 pl-1 descripcionModulo">
                  {{ n.descripcionModulo }}
                </h3>
              </v-card>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
    <!-- <pre>{{$data| json}}</pre> -->
  </v-container>
</template>
<script>
import router from "../router";
import axios from "axios";
export default {
  data: () => ({
    model: null,
    dialog: false,
    
    categorias: [
    ],
    modulos: [
    ],
    idModulo: 0
  }),
  created(){
    // this.getCategorias();
    // this.getModulos();
  },
  methods: {
    // getCategorias(){
    //   axios.get('Categorias/listarCat').then(response => {
    //     this.categorias = response.data;
    //   }).catch(error => {
    //     console.log(error)
    //   });
    // },
    // getModulos(){
    //   axios.get('Moduloes/listarMod').then(response => {
    //     this.modulos = response.data;
    //   }).catch(error => {
    //     console.log(error)
    //   });
    // },
    toModulo(){
      this.$router.push({path:'/cuestionario'})
    }
  }
};
</script>
