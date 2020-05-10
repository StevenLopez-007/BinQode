<style>
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
.chip {
  width: 100%;
}
.chip::-webkit-scrollbar {
  display: none;
}

.chipsColumn .v-slide-group__content {
  white-space: normal;
  flex-wrap: nowrap;
  max-width: 100%;
}
.enunciadoTitulo {
  font-family: "Dosis";
  font-weight: normal;
  font-size: 22px;
  text-align: justify;
  color: rgb(62, 65, 109);
}
.stepeercontentCues {
  padding: 0px !important;
}

@media screen and (max-width: 800px) {
  .chipsColumn .v-slide-group__content {
    white-space: normal;
    flex-wrap: wrap;
    max-width: 100%;
  }
  .enunciadoTitulo {
    font-size: 18px;
  }
}
@media screen and (max-width: 600px) {
  .enunciadoTitulo {
    font-size: 16px;
  }
  .v-btn--fab.v-size--large {
    width: 54px !important;
    height: 54px !important;
  }
}
@media screen and (max-width: 400px) {
  .enunciadoTitulo {
    font-size: 14px;
  }
}
.v-snack__content {
  padding: 0px 6px !important;
  justify-content: center !important;
}
.v-snack__wrapper {
  min-width: 30% !important;
}
.v-chip--disabled{
  opacity: 1 !important;
}
</style>
<template>
  <div style="background-color: #f0efff; height: 100%;">
    <v-row
      v-if="error"
      style="height: 100%;"
      class="d-flex justify-center align-center red--text"
    >
      <h1>
        ¡Error!
      </h1>
    </v-row>

    <v-row
      v-if="status"
      style="height: 100%;"
      class="d-flex justify-center align-center red--text"
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>

    <v-container
      class="pa-0"
      style="height: 100%; width:100%;"
      v-if="!status && !error"
    >
      <v-stepper
       
        v-model="e1"
        style="
          box-shadow: none;
          background-color: #f0efff;
          height:100%;
        "
        class="pr-1 pl-1"
      >
        <template>
          <v-stepper-items class="stepper" style="height: 100%;">
            <v-stepper-content
              v-for="(detaCon, n) in cuestionario"
              :key="`${n + 1}-content`"
              :step="n + 1"
              class="stepeercontentCues"
              style="height: 100%;"
            >
              <v-row class="d-flex flex-column" style="height: 100%;">
                <v-row style="width: 100%;">
                  <v-col cols="12" class="d-flex flex-column align-self-center">
                    <v-card
                      height="auto"
                      elevation="0"
                      style="background-color: #f0efff;"
                    >
                      <h3 class="enunciadoTitulo">
                        {{ detaCon.enunciadoContenido }}
                      </h3>
                      <prism
                        v-if="detaCon.respuesta === detaCon.respuestaSeleccionada"
                        :language="detaCon.type"
                        style="height:45vh; overflow:auto; border-radius:10px;"
                        >{{ detaCon.ejemploContenido }}</prism
                      > 
                    </v-card>
                    <v-row class="mt-8">
                      <v-col cols="12">
                        <h3 class="enunciadoTitulo">
                          Pregunta: <br />
                          {{ detaCon.pregunta }}
                        </h3>
                        <v-chip-group
                          class="chipsColumn mt-5 mb-5"
                          
                        >
                          <v-chip
                            v-for="(x, index) in detaCon.opciones"
                            :key="x"
                            class="chip font-weight-bold"
                            :color="x===detaCon.respuestaSeleccionada?'blue':'#514e95'"
                            text-color="white"
                            style="overflow-x:auto;"
                          >
                          <v-icon class="mr-1" v-if="detaCon.respuesta == x && x===detaCon.respuestaSeleccionada" size="16">fas fa-check</v-icon>
                            {{ index + 1 }}) {{ x }}
                          </v-chip>
                        </v-chip-group>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                    class="d-flex align-end justify-space-between"
                  >
                    <v-btn
                      class="botones"
                      color="#ff4f5a"
                      fab
                      large
                      dark
                      elevation="0"
                      @click="previousStep(n + 1)"
                    >
                      <v-icon>arrow_back_ios</v-icon>
                    </v-btn>
                    <v-btn @click="$router.replace({name:'Modulos',params:{id:$route.params.id}})" fab icon color="red darken-1"><v-icon>fas fa-times-circle</v-icon></v-btn>
                    <v-btn
                      class="botones"
                      color="#ff4f5a"
                      fab
                      large
                      dark
                      elevation="0"
                      @click="nextStep(n + 1)"
                    >
                      <v-icon>arrow_forward_ios</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </template>
        <!-- <pre>{{ $data.cuestionario }}</pre> -->
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  data() {
    return {
      e1: 1,
      timeout: 2000,

      status: true,
      error: false,
      steps: 2,
      cuestionario: [],
    };
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    vertical() {
      this.e1 = 2;
      requestAnimationFrame(() => (this.e1 = 1)); // Workarounds
    },
  },
  created: function() {
     this.getCuestionario();
  },
  methods: {
    onInput(val) {
      this.cuestionario.length = parseInt(val);
    },
    nextStep(n) {
      // console.log(n);
      
        if (n === this.cuestionario.length) {
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
    getCuestionario() {
      axios
        .get(`modulo/contenidoRespCuestPorModuloEstu/${this.$route.params.id}/${store.state.currentUser.usuario._id}`)
        .then((response) => {
          response.data.cursor.length===0?this.error=true:
          response.data.cursor.map(obj=>{
            var cuestionario ={}
             cuestionario.respuestaSeleccionada = obj.cuestionariorespuestas.respuestaSeleccionada
             cuestionario.enunciadoContenido = obj.contenidos.enunciadoContenido
             cuestionario.ejemploContenido = obj.contenidos.ejemploContenido
             cuestionario.type = obj.contenidos.type
             cuestionario.pregunta = obj.cuestionarios.pregunta
             cuestionario.respuesta = obj.cuestionarios.respuesta
             cuestionario.opciones = [obj.cuestionarios.opt1,obj.cuestionarios.opt2,obj.cuestionarios.opt3]
            this.cuestionario.push(cuestionario);
          })
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => {
          this.status = false;
          this.cuestionario.length == 0 ? (this.error = true) : null;
        });
    },
  },
};
</script>
