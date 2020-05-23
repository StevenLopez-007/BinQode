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
      <v-toolbar
        color="#fafafa"
        style="z-index:2000;position:relative"
        elevation="3"
      >
        <v-row class="pt-1" v-if="!status && !error">
          <v-col cols="1" class="d-flex justify-center align-center">
            <v-btn icon @click="$router.replace('/categoria')">
              <v-icon color="red darken-1">fas fa-times-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10" class="d-flex justify-center align-center">
            <v-progress-linear
              :buffer-value="progresoBuffer"
              :value="progreso"
              :color="colorBarra"
              height="10"
              rounded
            ></v-progress-linear>
          </v-col>
          <v-col cols="1" class="d-flex justify-center align-center">
            <v-btn
              icon
              :disabled="progreso == 100 ? false : true"
              @click="progreso==100?registrarCues():null"
            >
              <v-icon color="green">fas fa-flag</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-stepper
        v-if="!status"
        v-model="e1"
        :vertical="vertical"
        style="
          box-shadow: none;
          background-color: #f0efff;
          height: calc(100% - 52px);
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
                      <!-- <v-card-title class="Medium 20sp pt-0 pb-2 enunciadoTitulo"> -->
                      <h3 class="enunciadoTitulo">
                        {{ detaCon.enunciadoContenido }}
                      </h3>
                      <!-- <prism
                        language="html"
                        style="height:50vh; overflow:auto; border-radius:10px;"
                        >{{ detaCon.ejemploContenido }}</prism
                      > -->

                      <!-- </v-card-title> -->
                    </v-card>
                    <v-row class="mt-8">
                      <v-col cols="12">
                        <h3 class="enunciadoTitulo">
                          Pregunta: <br />
                          {{ detaCon.preguntaCuestionario }}
                        </h3>
                        <v-chip-group
                          v-model="detaCon.respuestaseleccionada"
                          active-class="white--text text--accent-10 blue"
                          class="chipsColumn mt-5 mb-5"
                        >
                          <v-chip
                            v-for="(x, index) in detaCon.respuestasOrdenadas"
                            :key="x"
                            :value="x"
                            class="chip font-weight-bold"
                            color="#514e95"
                            text-color="white"
                            style="overflow-x:auto;"
                          >
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
                    <v-snackbar v-model="snackbar" :timeout="timeout">
                      ¡Seleccione una respuesta!
                    </v-snackbar>
                    <v-btn
                      @click="progreso==100?registrarCues():null"
                      color="#78c800"
                      fab
                      :disabled="progreso == 100 ? false : true"
                      ><v-icon color="white">fas fa-trophy</v-icon></v-btn
                    >
                    <!-- <v-btn @click="registrarCuesRes()" color="#78c800" fab
                      >RegistrarCues</v-btn
                    >
                    <v-btn @click="verCuesRes()" color="#78c800" fab
                      >ver</v-btn
                    > -->
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
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card
          class="d-flex justify-center flex-column align-center pa-2 pt-3"
        >
          <div>
            <v-progress-circular
              color="#4d4d87"
              size="150"
              width="10"
              :value="calificacion"
              ><div class="d-flex align-center flex-column-reverse">
                {{ Math.round(calificacion) }}/100<img
                  v-if="calificacion >= 85"
                  width="50px"
                  height="50px"
                  src="https://image.flaticon.com/icons/svg/411/411830.svg"
                  alt=""
                /></div
            ></v-progress-circular>
          </div>
          <v-card-title
            style="font-family:Dosis; font-weight:1em; font-size:26px;"
            >Tus Resultados</v-card-title
          >
          <hr style="height:0px; border:1px solid black;width:100%" />
          <v-card-text class="mt-2">
            <h4>Total de preguntas : {{ cuestionario.length }}</h4>
            <h4>Respuestas Correctas : {{ respuestasCorrectas }}</h4>
            <h4>Tu calificación : {{ Math.round(calificacion) }}/100</h4>
          </v-card-text>
          <v-card-actions style="width:100%">
            <v-spacer></v-spacer>
            <v-btn
              v-if="botonContinuar && !botonReintentar"
              style="width:100%;background-color:#78c800;font-family:Dosis; color:white !important;"
              color="white"
              text
              :disabled="activarBoton"
              depressed
              :loading="activarBoton"
              @click="$router.push('/categoria')"
              >Continuar</v-btn
            >
            <v-btn
              v-if="botonContinuar && botonReintentar"
              style="width:100%;background-color:#78c800;font-family:Dosis; color:white !important;"
              color="white"
              text
              :disabled="activarBotonRetry"
              depressed
              :loading="activarBotonRetry"
              @click="regisCues()"
              >Reintentar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import decode from "jwt-decode";
import store from "../store";
export default {
  data() {
    return {
      e1: 1,

      dialog: false,
      snackbar: false,
      timeout: 2000,

      status: true,
      error: false,
      steps: 2,
      vertical: false,
      editable: true,
      cuestionario: [],
      respuestasSeleccionadas: [],
      calificacion: 0,
      interval: {},
      rating: 0,
      activarBoton: true,
      respuestasCorrectas: 0,
      botonReintentar: false,
      botonContinuar: true,
      activarBotonRetry: true,

      cuestionarioRes: [],
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.dialog == true) {
      next();
    } else {
      Swal.fire({
        title: "¿Seguro quieres salir?",
        text: "Perderás el progreso del test.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00b248",
        cancelButtonColor: "#ef5350",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          next();
        } else {
          next(false);
        }
      });
    }
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
    status() {
      this.ordenarPreguntas();
    },
  },
  computed: {
    progreso() {
      var respuestas = 0;
      for (var i = 0; i < this.cuestionario.length; i++) {
        this.cuestionario[i].respuestaseleccionada != "" &&
        this.cuestionario[i].respuestaseleccionada != undefined
          ? (respuestas += 100)
          : null;
      }

      return respuestas / this.cuestionario.length;
    },
    progresoBuffer() {
      return this.progreso + (100 / (this.cuestionario.length * 100)) * 100;
    },
    colorBarra() {
      // console.log(this.progreso);
      return this.progreso < 33
        ? "red"
        : this.progreso > 33 && this.progreso < 66
        ? "orange"
        : "green";
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
      var n1 = n;
      if (
        this.cuestionario[n1 - 1].respuestaseleccionada == "" ||
        this.cuestionario[n1 - 1].respuestaseleccionada == undefined
      ) {
        this.snackbar = true;
        this.e1 = n;
      } else {
        if (n === this.cuestionario.length) {
          this.e1 = n;
        } else {
          this.$vuetify.goTo(-1000, 5);
          this.e1 = n + 1;
        }
      }
    },
    previousStep(n) {
      if (this.cuestionario[n - 1].respuestaseleccionada == undefined) {
        this.cuestionario[n - 1].respuestaseleccionada = "";
        this.$vuetify.goTo(-1000, 5);
        this.e1 = n - 1;
      } else {
        if (n == 1) {
          this.e1 = n;
        } else {
          this.$vuetify.goTo(-1000, 5);
          this.e1 = n - 1;
        }
      }
    },
    generarRamdon() {
      if (this.respuestasSeleccionadas.length != 3) {
        while (repetido != false) {
          var numberrandom = Math.floor(Math.random() * 3) + 0;
          var repetido = this.comprobarnumeroGanador(numberrandom);
        }
        this.respuestasSeleccionadas.push(numberrandom);
        return numberrandom;
      } else {
        return null;
      }
    },
    comprobarnumeroGanador(numberrandom) {
      var repetido = false;

      for (var i = 0; i < this.respuestasSeleccionadas.length; i++) {
        if (numberrandom == this.respuestasSeleccionadas[i]) {
          repetido = true;
        }
      }
      return repetido;
    },
    ordenarPreguntas() {
      let me = this;
      for (var i = 0; i < this.cuestionario.length; i++) {
        this.respuestasSeleccionadas = [];
        for (var j = 0; j < this.cuestionario[i].respuestas.length; j++) {
          var respuestaOr = this.cuestionario[i].respuestas[
            this.generarRamdon()
          ];
          // console.log(respuestaOr);
          this.cuestionario[i].respuestasOrdenadas.push(respuestaOr);
        }
      }
    },
    getCuestionario() {
      axios
        .get("modulo/contenidoCuestPorModulo/" + this.$route.params.id)
        .then((response) => {
          response.data.cursor.map((obj) => {
            var contenido = {};
            contenido.idModulo = obj.contenido.modulo;
            contenido.idContenido = obj.contenido.id;
            contenido.idCuestionario = obj.cuestionario.id;
            contenido.enunciadoContenido = obj.contenido.enunciadoContenido;
            contenido.ejemploContenido = obj.contenido.ejemploContenido;
            contenido.preguntaCuestionario = obj.cuestionario.pregunta;
            contenido.respuestas = [
              obj.cuestionario.opt1,
              obj.cuestionario.opt2,
              obj.cuestionario.opt3,
            ];
            contenido.respuestasOrdenadas = [];
            contenido.respuestaCorrecta = obj.cuestionario.respuesta;
            contenido.respuestaseleccionada = "";
            this.cuestionario.push(contenido);
          });
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
    registrarCues() {
      this.dialog = true;
      var i = 0;
      var notaPorPregunta = 100 / this.cuestionario.length;
      var duracion = 1400 / this.cuestionario.length;
      this.interval = setInterval(() => {
        if (i == this.cuestionario.length) {
          clearInterval(this.interval);
          this.regisCues();
          this.registrarCuesRes();
        } else if (
          this.cuestionario[i].respuestaseleccionada ===
          this.cuestionario[i].respuestaCorrecta
        ) {
          this.calificacion += notaPorPregunta;
          this.respuestasCorrectas++;
        }
        i++;
      }, duracion);
    },
    regisCues() {
      this.activarBotonRetry = true;
      var usuarioActivo = decode(store.state.token);
      var data = {
        calificacion: this.calificacion / 10,
        estudiante: usuarioActivo.usuario._id,
        modulo: this.$route.params.id,
        completado: true,
      };
      var headers = {
        headers: {
          "x-token": store.state.token,
        },
      };

      axios
        .post("inscripcion/", data, headers)
        .then((result) => {
          // if (!result.data.ok) {
          //   this.botonReintentar = true;
          //   this.activarBotonRetry = false;
          // } else {
          //   this.activarBoton = false;
          //   this.botonReintentar = false;
          //   this.registrarCuesRes();
          // }
          result.data.ok?null:this.$store.dispatch("logout")
        })
        .finally(() => {
          this.activarBoton = false;
          this.botonReintentar = false;
        });
      // .catch(
      //   (error) => (
      //     (this.botonReintentar = true),
      //     ((this.activarBotonRetry = false), console.log(error))
      //   )
      // );
    },
    verCuesRes() {
      this.cuestionarioRes = [];
      var id = decode(store.state.token);
      // this.cuestionarioRes.push(id.usuario._id)
      this.cuestionario.forEach((element) => {
        var cuesRes = {};

        cuesRes.estudiante = id.usuario._id;
        cuesRes.contenido = element.idContenido;
        cuesRes.cuestionario = element.idCuestionario;
        cuesRes.respuestaSeleccionada = element.respuestaseleccionada;
        cuesRes.modulo = this.$route.params.id
        this.cuestionarioRes.push(cuesRes);
      });
    },
    registrarCuesRes() {
      this.verCuesRes();
      axios({
        method: "post", //put
        url: "cuestionarioRes/",
        headers: {
          "content-type": "application/json",
          "x-token": store.state.token,
        },
        data: this.cuestionarioRes,
      })
        .then((result) => {
          // console.log(result);
          result.data.ok?null:this.$store.dispatch("logout")
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
