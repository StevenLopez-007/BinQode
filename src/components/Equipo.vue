<template>
  <v-container style="background:#fff;height:100%;">
    <v-row class="mt-12 pt-10">
      <v-col lg="12" class="pt-0 pb-0">
        <h1 id="tituloContacto">
          B1nQ0de, <span>{{ palabra }}</span
          ><span ref="typedCursor" class="cursorTyped">|</span> por Programming
          Solutions
        </h1>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" class="d-flex justify-center mb-5">
      <v-tab href="#tab-1">Equipo</v-tab>
      <v-tab href="#tab-2">Contactanos</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <v-row class=" mt-4 pt-4 d-flex justify-center">
          <v-col lg="3" md="4" sm="12" cols="12" class="d-flex justify-center">
            <div>
              <v-img
                id="imagenGrupo"
                style="border-radius:5px;"
                src="../imagenes/imagenesEquipo/imagen1.png"
              ></v-img>
            </div>
          </v-col>
          <v-col lg="6" md="6" sm="12" cols="12" class="nuestraHistoria">
            <h1 class="text-center text-sm-center text-md-left text-lg-left">
              Nuestra Historia
            </h1>
            <p>
              Somos un grupo de estudiantes que vimos una necesidad dentro de
              nuestra institución educativa, estudiantes que aun tenían esa
              pequeña dificultad en algunas áreas dentro del mundo de la
              programación y/o informática, entonces decidimos crear una
              plataforma que ayudara a reforzar esas áreas en los que los
              estudiantes tienen dificutades.
              <br /><br />
              Y así nació BinQode, un proyecto que primero estuvo orientado a
              los estudiantes dentro de la universidad donde realizabamos
              nuestros estudios, pero que ahora es abierta a todo publico,
              interesado en el mundo de la informática.
            </p>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
          <v-col lg="5">
            <div class="mt-2 mt-sm-2 mt-md-8 mt-lg-12 d-flex justify-center">
              <v-list style="background:transparent;" class="listaMiembros">
                <h1 id="tituloNuestro" class="text-center">Equipo B1nQ0de</h1>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-avatar size="100">
                    <img src="../imagenes/avatars/avatar1.svg" alt="" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      ><h1>
                        Ing. Gerson David López Menjívar
                      </h1></v-list-item-title
                    >
                    <v-list-item-subtitle
                      ><h3>Proyect Manager</h3></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-right"
                      ><h1>Ing. Edgar Steven Alas Rivera</h1></v-list-item-title
                    >
                    <v-list-item-subtitle class="text-right"
                      ><h3>Analísta</h3></v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-avatar size="100">
                    <img src="../imagenes/avatars/avatar1.svg" alt="" />
                  </v-list-item-avatar>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar size="100">
                    <img src="../imagenes/avatars/avatar1.svg" alt="" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      ><h1>
                        Ing. William Adonay Rosa Ramírez
                      </h1></v-list-item-title
                    >
                    <v-list-item-subtitle><h3>Tester</h3></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-right"
                      ><h1>
                        Ing. Gerardo Bladimir Tobar Ramos
                      </h1></v-list-item-title
                    >
                    <v-list-item-subtitle class="text-right"
                      ><h3>Programador</h3></v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-avatar size="100">
                    <img src="../imagenes/avatars/avatar1.svg" alt="" />
                  </v-list-item-avatar>
                </v-list-item>

                <v-list-item>
                  <v-list-item-avatar size="100">
                    <img src="../imagenes/avatars/avatar1.svg" alt="" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      ><h1>
                        Ing. Steven Alexander López Gálvez
                      </h1></v-list-item-title
                    >
                    <v-list-item-subtitle
                      ><h3>Programador</h3></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col lg="6" md="6" sm="0" cols="0" class="d-flex align-center ">
            <v-img
              id="robot"
              src="../imagenes/imagenesHome/bot.gif"
              class="hidden-sm-and-down"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-row class="d-flex justify-center">
          <v-col lg="6" class="d-flex justify-center flex-column align-center">
             <h1 style="color:rgb(62, 65, 109);font-family:Dosis-semi" class="text-center">
            ¿Deseas contratar nuestros servicios?
          </h1>
            <v-avatar class="ma-5" tile size="200">
              <img src="../imagenes/imagenesEquipo/contact.svg" alt="" />
            </v-avatar>
            <p class="text-center font-weight-medium mt-6" style="font-family:Dosis-medium">
              Estamos para ayudarte, presiona
              <a target="_blank" href="https://forms.gle/nvUGiRZ53agv38xP8" style="color:#aa4b6b;">aquí</a> para poder contactarte
              con nosotros.
            </p>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import "../styles/Equipo.scss";
export default {
  data() {
    return {
      tab: null,
      palabra: "diseñado",
      palabras: ["diseñado", "desarrollado", "y mantenido"],
      intervalEl: {},
      intervalEs: {},
      numeroPalabra: 0,
    };
  },
  mounted() {
    this.eliminarPalabra();
  },
  beforeDestroy(){
    clearInterval(this.intervalEs)
    clearInterval(this.intervalEl)
  },
  methods: {
    eliminarPalabra() {
      try{
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
      }catch(error){}
    },
    escribirPalabra() {
      try{
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
      }catch(error){}
    },
  },
};
</script>
