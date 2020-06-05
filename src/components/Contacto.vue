<template>
  <v-container class="mt-12 pt-12">
    <h1 id="tituloContacto">
      B1nQ0de, <span>{{ palabra }}</span
      ><span ref="typedCursor" class="cursorTyped">|</span> por Programming
      Solutions
    </h1>
    <v-row>
        <v-col lg="12">
            <h2 style="font-family:Dosis;color:rgb(62, 65, 109);" class="text-center">¿Deseas contratar nuestros servicios?</h2>
            <v-row class="d-flex justify-center">
            <v-col lg="3" >
                <v-img src="../imagenes/imagenesEquipo/logoEmpresa.png"> </v-img>
            </v-col>
            </v-row>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
import "../styles/Contacto.scss";
export default {
  data() {
    return {
      palabra: "diseñado",
      palabras: ["diseñado", "desarrollado","y mantenido"],
      interval: {},
      intervalEs: {},
      numeroPalabra: 0,
    };
  },
  mounted() {
    this.eliminarPalabra();
  },
  methods: {
    eliminarPalabra() {
      this.$refs.typedCursor.classList.remove("cursorTyped");
      var palabrasize = this.palabra.length;
      var contador = 1;
      this.intervalEl = setInterval(() => {
        if (contador > palabrasize) {
          clearInterval(this.intervalEl);
          this.escribirPalabra();
        } else {
          this.palabra = this.palabra.slice(0, -1);
          contador++;
        }
      }, 110);
    },
    escribirPalabra() {
      var palabrasize = this.palabras[this.numeroPalabra].length;
      var palabra = this.palabras[this.numeroPalabra];
      var contador = 0;
      this.intervalEs = setInterval(() => {
        if (contador == palabrasize) {
          clearInterval(this.intervalEs);
          this.numeroPalabra == this.palabras.length - 1
            ? (this.numeroPalabra = 0)
            : this.numeroPalabra++;
          this.$refs.typedCursor.classList.add("cursorTyped");
          setTimeout(() => {
            this.eliminarPalabra();
          }, 3000);
        } else {
          this.palabra += palabra[contador];
          contador++;
        }
      }, 110);
    },
  },
};
</script>
