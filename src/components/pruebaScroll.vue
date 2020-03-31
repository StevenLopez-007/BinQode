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
}
.descripcionModulo {
  color: #6a1b9a !important;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  padding-top: 8px !important;
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
  background-color: transparent !important;
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
@media screen and (max-width: 450px) {
  .tituloModulo {
    font-size: 20px;
  }
  .descripcionModulo {
    font-size: 14px;
  }
}
</style>
<template>
  <v-container class="ma-0 pa-0" style="background-color:#f0efff; height:100%">
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h1 v-if="status" style="border:none; font-size:38px" class="tituloCat">
          Modulos de {{ nombreCategoria }}
        </h1>
        <!-- <h1 v-if="!status" style="color:#f44336;font-size:40px;">¡Error!</h1> -->
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center ">
      <v-col
        cols="8"
        lg="3"
        md="5"
        sm="5"
        class="ma-11 mt-2 d-flex flex-wrap"
        v-for="(mod, indexMod) in modulos"
        :key="indexMod"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card class="cardMod pa-2" :elevation="hover ? 4 : 0">
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
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="cargarMas()" color="#4d4d87" style="color:white;">Mostrar +</v-btn>
      </v-col>
    </v-row>
    <!-- <pre>{{$data }}</pre> -->
  </v-container>
</template>
<script src="jquery.min.js"></script>
<script>
import router from "../router";
import axios from "axios";
import $ from "jquery";
export default {
  data: () => ({
    model: null,
    status: false,
    modulos: [],
    nombreCategoria: "",
    pagina:1
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
        .get("modulo/?pagina="+this.pagina)
        .then(response => {
          this.modulos =(response.data.modulos);
          if (this.modulos.length > 0) {
            this.status = true;
            
            // this.nombreCategoria.push(response.data.modulos[0].categoria.nombre);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },
    cargarMas(){
      let me = this;
      this.pagina++;
      axios.get("modulo/?pagina="+this.pagina).then(response =>{
        if(response.data.modulos <=0){
          console.log("Esta pagina no tiene mas modulos");
          this.pagina--;
          console.log(this.pagina)
        }
        else{
          response.data.modulos.forEach(element => {
            me.modulos.push(element);
          });
        }
      })
    }
    
    // scroll() {
    //   let me = this;
      
    //   $(window).scroll(function() {
    //     if ($(document).scrollTop()+$(window).height()>=$(document).height()) {
          
    //       console.log("llegaste al final");
    //       axios
    //       .get("modulo/?pagina=1")
    //       .then(response => {
    //       response.data.modulos.forEach(element => {
    //         me.modulos.push(element);
    //       });
          
          
    //        })
    //        .catch(error => {
    //       console.log(error);
    //        })
          
    //     }
    //   });
    // }
  }
};
</script>
