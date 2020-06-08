
<template>
  <div class="pa-5" :class="darkTheme?'secondaryColorDark':''" style="height: 100%; background-color: #f0efff; height: 100%;">
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

    <v-row v-if="status" style="height: 100%;">
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        style="height: 100%;"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
  <a :id="!darkTheme?'botonBack':''" @click="$router.replace({name:'Modulos',params:{id:$route.params.idCat}})" style="position:absolute; left:0px;top:10px; z-index:1000;" class="ml-3" > <v-icon :class="darkTheme?'tituloDark':''"  size="30">fas fa-times-circle</v-icon></a>
    <v-stepper
      v-if="!status && !error"
      v-model="e1"
      style="box-shadow: none; background-color: #f0efff; height: 100%;"
      :class="darkTheme?'secondaryColorDark':''"
      
    >
      <template>
        <v-stepper-items class="stepper" style="height: 100%;">
          <v-stepper-content
            v-for="(detaCon, n) in contenido"
            :key="`${n + 1}-content`"
            :step="n + 1"
            style="height: 100%;"
            class="pb-0 stepeercontentIntro"
          >
            <v-row style="height: 100%;">
              <v-row style="width: 100%; height:80%" >
                <v-col cols="12" style="height:100%">
                  <v-card
                    height="100%"
                    elevation="0"
                    style="background-color: #f0efff;"
                    :class="darkTheme?'secondaryColorDark':''"
                  >
                    <v-card-title
                      class="Medium 20sp pt-0 pb-2 px-0 enunciadoTitulo"
                    >
                      <h3 :class="darkTheme?'tituloDark':''" class="enunciadoTituloCon">
                        {{ detaCon.enunciadoContenido }}
                      </h3>
                    </v-card-title>
                    
                    <prism :language="detaCon.type==='text'?'textile':detaCon.type" class="ma-0" style="height:60vh; overflow:auto;border-radius:10px;">{{
                      detaCon.ejemploContenido
                    }}</prism>
                   
                    <!-- <pre>
                      <code :class="'language-'+ modulo" >
                        {{detaCon.ejemploContenido}}
                      </code>
                    </pre> -->
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="d-flex align-end" style="width: 100%; max-height:90px;">
                <v-col cols="12" lg="12" md="12" sm="12">
                  <div class="d-flex justify-space-between align-center">
                    <v-btn
                      color="#ff4f5a"
                      fab
                      large
                      dark
                      elevation="0"
                      @click="previousStep(n + 1)"
                    >
                      <v-icon>fas fa-angle-left</v-icon>
                    </v-btn>

                    <v-btn
                      fab
                      @click="showAlert(),(idModulo = detaCon.modulo._id)"
                      style="
                        background-color: rgb(77, 77, 135);
                        color: white;
                        z-index: 6;
                      "
                      v-if="botonPlay"
                    >
                      <v-icon class="ml-2">fas fa-play</v-icon>
                    </v-btn>
                    <!-- <button class="bubbly-button" >Click me!</button> -->
                    <v-btn
                      color="#ff4f5a"
                      fab
                      large
                      dark
                      elevation="0"
                      @click="nextStep(n + 1)"
                    >
                      <v-icon>fas fa-angle-right</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
    <!-- OverLay -->
    <v-overlay :value="overlay" opacity="0.80">
      <div style="display:flex;flex-direction:column !important;align-items:center !important;">
        <h1
          class="pl-2"
          style="font-family: 'Dosis'; font-size: 36px; text-align: center;"
        >
          Introducción
        </h1>
        <p class="pl-2" style="text-align: justify;">
          Antes de empezar el test, echa un vistazo de algunas cosas básicas
          sobre {{ modulo2 }}.
        </p>
        <v-btn icon @click="(overlay = false)">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </div>
    </v-overlay>

    <v-overlay :value="overlay2" opacity="0.80">
      <div class="d-flex flex-column align-center">
        <p class="pl-2" style="text-align: justify;">
          Pulsa play para comenzar el cuestionario.
        </p>
        <v-btn icon @click="overlay2 = false">
          <v-icon>fas fa-check</v-icon>
        </v-btn>
      </div>
    </v-overlay>

    <!-- Dialog -->
    <!-- <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title style="word-break: normal;" class="headline"
          >¿Desea comenzar el cuestionario sobre {{ modulo2 }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>

          <v-btn color="green darken-1" text @click="toCuestionario()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/stylesmin/introduccionmodulo.min.scss"
export default {
  data() {
    return {
      e1: 1,
      steps: 2,
      status: true,
      error: false,
      dialog: false,

      altLabels: false,
      editable: true,

      contenido: [],
      idModulo: "",
      modulo: "",
      modulo2: "",

      overlay: false,
      overlay2: false,
      botonPlay:false,
    };
  },
  created() {
    this.getContenido();
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },
  computed:{
    darkTheme(){
      return this.$store.getters.darkTheme
    }
  },

  methods: {
    nextStep(n) {
      // console.log(n);

      if (n === this.contenido.length) {
        this.e1 = n;
        this.overlay2 = true;
        this.botonPlay = true;
      } else {
        this.$vuetify.goTo(-1000, 5);
        this.e1 = n + 1;
      }
    },
    previousStep(n) {
      if (n == 1) {
        this.e1 = n;
      } else {
        this.$vuetify.goTo(-1000, 5);
        this.e1 = n - 1;
      }
    },
    getContenido() {
      axios
        .get("contenido/getContenidoPorModulo/" + this.$route.params.id)
        .then((response) => {
          this.contenido = response.data.contenidosEdit;
          // response.data.contenidosEdit.length == 0
          //   ? null
          //   : ((this.modulo = response.data.contenidosEdit[0].modulo.nombre
          //       .replace(/[0-9]/, "")
          //       .toLowerCase()
          //       .trim()),
          //     (this.modulo2 = response.data.contenidosEdit[0].modulo.nombre)),
              
              (this.overlay = true);
            //  this.$store.commit("setType",response.data.contenidosEdit[0].type)
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.status = false;
          this.contenido.length == 0 ? (this.error = true) : null;
        });
    },
    toCuestionario(id) {
      this.$router.replace({
        name: "Cuestionario",
        params: { id: this.idModulo },
      });
    },

    showAlert() {
      Swal.fire({
        title: "¿Desea comenzar el cuestionario sobre "+this.modulo2+"?",
        // text: "You won't be able to revert this!",
        // icon: "question",
        imageUrl:require("../imagenes/empezarCues/cuestionario.svg"),
        imageWidth:200,
        imageHeight:200,
        showCancelButton: true,
        confirmButtonColor: "#00b248",
        cancelButtonColor: "#ef5350",
        confirmButtonText: "Aceptar",
        cancelButtonText:"Cancelar",
      }).then((result) => {
        if (result.value) {
          this.toCuestionario();
        }
      });
    },
  },
};
</script>
