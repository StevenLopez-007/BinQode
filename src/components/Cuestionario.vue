<style>
/* .imagen {
  background-size: cover;
} */
/* .contenido-imagen {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
} */
.chip {
  width: 100%;
}
/* .imagen {
  max-width: 100%;
  height: auto;
} */
/* .v-slide-group__content {
  white-space: normal;
  flex-wrap: wrap;
  max-width: 100%;
}
@media screen and(max-width: 600px) {
.v-slide-group__content {
    white-space: normal;
    flex-wrap: nowrap;
    max-width: 100%;
  }
} */
.chipsColumn .v-slide-group__content {
  white-space: normal;
  flex-wrap: nowrap;
  max-width: 100%;
}

@media screen and (max-width: 800px) {
  .chipsColumn .v-slide-group__content {
    white-space: normal;
    flex-wrap: wrap;
    max-width: 100%;
  }
}
.v-snack__content {
  padding: 0px 6px !important;
  justify-content: center !important;
}
.v-snack__wrapper {
  min-width: 30% !important;
}
/* @media screen and (max-width: 2000px) {
  .botones {
  margin-top: 4%;
}
  }
  @media screen and (max-width: 1100px) {
  .botones {
  margin-top: 5%;
}
  } */
</style>
<template>
  <div>
    <v-progress-linear
      :buffer-value="progresoBuffer"
      :value="progreso"
      :color="colorBarra"
      height="10"
    ></v-progress-linear>
    <v-stepper v-model="e1" :vertical="vertical" style="box-shadow:none;">
      <template>
        <v-stepper-items class="stepper">
          <v-stepper-content
            v-for="(detaCon, n) in cuestionario"
            :key="`${n + 1}-content`"
            :step="n + 1"
            class="stepeercontent"
          >
            <v-card height="100%" elevation="0">
              <v-card-title class="Medium 20sp pt-0 pb-2 ">
                {{ detaCon.enunciadoContenido }}
                {{ n }}
              </v-card-title>
              <prism language="javascript">{{
                detaCon.ejemploContenido
              }}</prism>

              <v-chip-group
                v-model="detaCon.respuestaseleccionada"
                active-class="white--text text--accent-10 blue"
                class="chipsColumn mt-5 mb-5"
              >
                <v-chip
                  v-for="(x, index) in detaCon.respuestasOrdenadas"
                  :key="x"
                  :value="x"
                  class="chip font-weight-bold  "
                  color="deep-purple darken-1"
                  text-color="white"
                >
                  {{ index + 1 }}) {{ x }}
                </v-chip>
              </v-chip-group>
            </v-card>

            <div class="d-flex justify-space-between botones ">
              <v-btn
                color="error"
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
               
              <!-- <button class="bubbly-button" >Click me!</button> -->
              <v-btn
                color="error"
                fab
                large
                dark
                elevation="0"
                @click="nextStep(n + 1)"
              >
                <v-icon>arrow_forward_ios</v-icon>
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </template>
      <!-- <pre>{{ $data | json }}</pre> -->
    </v-stepper>
  </div>
</template>
<script src="D:\Escritorio\testapp\src\js\animacionBoton.js"></script>
<script>
export default {
  data() {
    return {
      e1: 1,

      snackbar: false,
      timeout: 2000,

      steps: 2,
      vertical: false,
      editable: true,
      cuestionario: [
        {
          enunciadoContenido: "enunciado1",
          ejemploContenido: `var n1 = n;
      if (this.cuestionario[n1 - 1].respuestaseleccionada == "") {
        this.e1 = n;
      } else {
        if (n === this.cuestionario.length) {
          this.e1 = n;
        } else {
          this.e1 = n + 1;
        }
      }`,
          respuestas: ["respuesta1C1", "op1C1", "op2C1", "op3C1"],
          respuestasOrdenadas: [],
          // respuesta: "respuesta1C1",
          // opcion1: "op1C1",
          // opcion2: "op2C1",
          // opcion3: "op3C1",
          idDetalleContenido: "1",
          respuestaseleccionada: ""
        },
        {
          enunciadoContenido: "enunciado2Py",
          ejemploContenido: `var n1 = n;
      if (this.cuestionario[n1 - 1].respuestaseleccionada == "") {
        this.e1 = n;
      } else {
        if (n === this.cuestionario.length) {
          this.e1 = n;
        } else {
          this.e1 = n + 1;
        }
      }`,
          respuestas: ["respuesta1C2", "op1C2", "op2C2", "op3C2"],
          respuestasOrdenadas: [],
          // respuesta: "respuesta1C2",
          // opcion1: "op1C2",
          // opcion2: "op2C",
          // opcion3: "op3C2",
          idDetalleContenido: "2",
          respuestaseleccionada: ""
        },
        {
          enunciadoContenido: "enunciado3Py",
          ejemploContenido: `var n1 = n;
      if (this.cuestionario[n1 - 1].respuestaseleccionada == "") {
        this.e1 = n;
      } else {
        if (n === this.cuestionario.length) {
          this.e1 = n;
        } else {
          this.e1 = n + 1;
        }
      }`,
          respuestas: ["respuesta1C3", "op1C3", "op2C3", "op3C3"],
          respuestasOrdenadas: [],
          // respuesta: "respuesta1C3",
          // opcion1: "op1C3",
          // opcion2: "op2C3",
          // opcion3: "op3C3",
          idDetalleContenido: "3",
          respuestaseleccionada: ""
        },
        {
          enunciadoContenido: "enunciado4Py",
          ejemploContenido: `var n1 = n;
      if (this.cuestionario[n1 - 1].respuestaseleccionada == "") {
        this.e1 = n;
      } else {
        if (n === this.cuestionario.length) {
          this.e1 = n;
        } else {
          this.e1 = n + 1;
        }
      }`,
          respuestas: ["respuesta1C4", "op1C4", "op2C4", "op3C4"],
          respuestasOrdenadas: [],
          // respuesta: "respuesta1C4",
          // opcion1: "op1C4",
          // opcion2: "op2C4",
          // opcion3: "op3C4",
          idDetalleContenido: "4",
          respuestaseleccionada: ""
        }
      ],
      respuestasSeleccionadas: []
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
    }
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
      console.log(this.progreso);
      return this.progreso < 33
        ? "red"
        : this.progreso > 33 && this.progreso < 66
        ? "orange"
        : "green";
    }
  },
  created: function() {
    this.ordenarPreguntas();
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
          this.e1 = n + 1;
        }
      }
    },
    previousStep(n) {
      if (this.cuestionario[n - 1].respuestaseleccionada == undefined) {
        this.cuestionario[n - 1].respuestaseleccionada = "";

        this.e1 = n - 1;
      } else {
        if (n == 1) {
          this.e1 = n;
        } else {
          this.e1 = n - 1;
        }
      }
    },
    generarRamdon() {
      if (this.respuestasSeleccionadas.length != 4) {
        while (repetido != false) {
          var numberrandom = Math.floor(Math.random() * 4) + 0;
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
        for (var j = 0; j < 4; j++) {
          var respuestaOr = this.cuestionario[i].respuestas[
            this.generarRamdon()
          ];
          // console.log(respuestaOr);
          this.cuestionario[i].respuestasOrdenadas.push(respuestaOr);
        }
      }
    }
  }
};
</script>
