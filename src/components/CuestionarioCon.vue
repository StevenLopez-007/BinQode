<style>
.chipCon {
  width: 100%;
  pointer-events: none;
  user-select: none;
}

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

</style>
<template>
  <div style="height:100%;">
    
    <v-stepper v-model="e1" :vertical="vertical" style="box-shadow:none;background-color:#f0efff;height:100%;">
      <template>
        <v-stepper-items class="stepper">
          <v-stepper-content
            v-for="(detaCon, n) in cuestionario"
            :key="`${n + 1}-content`"
            :step="n + 1"
            class="stepeercontent"
          >
            <v-card  height="100%" elevation="0" style="background-color:#f0efff;">
              <!-- <v-card-title class="Medium 20sp pt-0 pb-2 ">
                {{ detaCon.enunciadoContenido }}
                {{ n }}
              </v-card-title> -->
              <h3 class="enunciadoTitulo">{{ detaCon.enunciadoContenido }}{{ n }}</h3>
              <prism language="javascript">{{
                detaCon.ejemploContenido
              }}</prism>

              <v-chip-group
               
                class="chipsColumn mt-5 mb-5"
                
              >
                <v-chip
                  v-for="(x, index) in detaCon.respuestasOrdenadas"
                  :key="x"
                  :value="x"
                  class="chipCon font-weight-medium"
                  :class="{'green':detaCon.respuestaseleccionada == x, 'deep-purple darken-1':detaCon.respuestaseleccionada != x}"
                  text-color="white"
                  
                >
                  {{ index + 1 }}) {{ x }}
                </v-chip>
              </v-chip-group>
            </v-card>
            
              <div class="d-flex justify-space-between botones ">
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
                <v-btn color="#ff4f5a" fab large dark elevation="0" @click="nextStep(n + 1)">
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
<script>
export default {
  data() {
    return {
      e1: 1,
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
          respuestaseleccionada: "respuesta1C1"
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
          respuestaseleccionada: "op1C2"
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
          respuestaseleccionada: "op1C3"
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
          respuestaseleccionada: "respuesta1C4"
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
 computed:{
   
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
        if (n === this.cuestionario.length) {
          this.e1 = n;
        } else {
          this.$vuetify.goTo(-1000, 5)
          this.e1 = n + 1;
        }
      
    },
    previousStep(n) {
        if (n == 1) {
          this.e1 = n;
        } else {
          this.$vuetify.goTo(-1000, 5)
          this.e1 = n - 1;
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
