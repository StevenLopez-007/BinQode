<style>
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}

.enunciadoTituloCon {
  font-family: "Dosis";
  font-weight: normal;
  font-size: 22px;
  text-align:justify;
  word-break: normal;
}
.v-stepper__wrapper {
  height: 100% !important;
}

@media screen and (max-width: 800px) {
  .enunciadoTituloCon {
    font-size: 18px;
  }
}
@media screen and (max-width: 600px) {
  .enunciadoTituloCon {
    font-size: 16px;
  }
  .v-btn--fab.v-size--large {
    width: 54px !important;
    height: 54px !important;
  }
}
@media screen and (max-width: 400px) {
  .enunciadoTituloCon {
    font-size: 14px;
  }
}
</style>
<template>
  <div style="height:100%;background-color:#f0efff;height:100%;">
     <v-row v-if="error">
      <v-col cols="12" class="d-flex justify-center red--text">
            <h1>
              ¡Error!
            </h1>
      </v-col>
    </v-row>
    <v-row v-if="status">
      <v-col cols="12" class="d-flex justify-center">
          <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-stepper
      v-if="!status && !error"
      v-model="e1"
      style="box-shadow:none;background-color:#f0efff;height:100%; "
    >
      <template>
        <v-stepper-items class="stepper" style="height:100%">
          <v-stepper-content
            v-for="(detaCon, n) in contenido"
            :key="`${n + 1}-content`"
            :step="n + 1"
            style="height:100%;"
            class="pb-0"
          >
            <v-row style="height:100%; " class="d-flex flex-column">
              <v-row style="width:100%;">
                <v-col cols="12" >
                  <v-card
                    height="100%"
                    elevation="0"
                    style="background-color:#f0efff;"
                  >
                    <v-card-title class="Medium 20sp pt-0 pb-2 px-0 enunciadoTitulo">
                      <h3 class="enunciadoTituloCon">
                        {{ detaCon.enunciadoContenido }}
                      </h3>
                    </v-card-title>
                    <prism :language="modulo">{{
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
              <v-row class="d-flex align-end" style="width:100%;">
                <v-col cols="12" lg="12" md="12" sm="12">
                  <div class="d-flex justify-space-between align-center ">
                    <v-btn
                      color="#ff4f5a"
                      fab
                      large
                      dark
                      elevation="0"
                      @click="previousStep(n + 1)"
                    >
                      <v-icon>arrow_back_ios</v-icon>
                    </v-btn>

                    <v-btn @click="dialog = !dialog, idModulo=detaCon.modulo._id"  style="background-color:rgb(77, 77, 135);color:white;" v-if="!overlay" >Omitir / Empezar Cuestionario <v-icon class="ml-2">fas fa-forward</v-icon> </v-btn>
                    <!-- <button class="bubbly-button" >Click me!</button> -->
                    <v-btn
                      color="#ff4f5a"
                      fab
                      large
                      dark
                      elevation="0"
                      @click="nextStep(n + 1)"
                    >
                      <v-icon>arrow_forward_ios</v-icon>
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
    <v-overlay :value="overlay" opacity="0.55" >
      <div class="d-flex flex-column align-center">
      <h1 class="pl-2" style="font-family:'Dosis';font-size:36px;text-align:center;">Introducción</h1>
      <p class="pl-2" style="text-align:justify;">Antes de empezar el test, echa un vistazo de algunas cosas básicas sobre {{modulo2}}</p>
      <v-btn

        icon
        @click="overlay = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </div>
      
    </v-overlay>
    <!-- Dialog -->
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title style="word-break: normal;" class="headline">¿Desea comenzar el cuestionario sobre {{modulo2}}?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="toCuestionario()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      e1: 1,
      steps: 2,
      status: true,
      error:false,
      dialog:false,

      altLabels: false,
      editable: true,

      contenido: [],
      idModulo:"",
      modulo:"",
      modulo2:"",

      overlay:false,
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
    }
  },

  methods: {
    nextStep(n) {
      // console.log(n);

      if (n === this.contenido.length) {
        this.e1 = n;
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
        .then(response => {
          this.contenido = response.data.contenidos;
          (response.data.contenidos.length==0) ? console.log("No hay contenido para este modulo"):(this.modulo = response.data.contenidos[0].modulo.nombre.replace(/[0-9]/,"").toLowerCase().trim(), this.modulo2 =response.data.contenidos[0].modulo.nombre, this.overlay = true);
          console.log(this.modulo);
          
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {this.status = false; this.contenido.length ==0 ? this.error = true : null;});
    },
    toCuestionario(id){
      this.$router.push({name:"Cuestionario",params:{id:this.idModulo}})
    }
  }
};
</script>
