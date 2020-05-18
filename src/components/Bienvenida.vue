<style>
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
@media screen and (max-width: 600px) {
  #imagenes {
    width: 300px !important;
    height: 300px !important;
  }
}
</style>
<template>
  <v-window
    v-model="onboarding"
    :show-arrows="$vuetify.breakpoint.smAndUp"
    class="fill-height"
    :touch="{ left: () => next(), right: () => prev() }"
  >
    <v-window-item
      v-for="(item, n) in length"
      :key="`card-${n}`"
      class="fill-height"
    >
      <v-card color="#fff" class="fill-height" elevation="0">
        <v-row class="fill-height" align="center" justify="center">
          <!-- <h1 style="font-size: 5rem;" class="black--text">Slide {{ n }}</h1> -->
          <div
            class="d-flex flex-column align-center justify-center"
            style="height:90%;"
          >
            <h1
              style="text-align:center; font-size: 2rem;font-family:Dosis;font-weight: inherit; color:#37474f;"
            >
              {{ item.title }}
            </h1>
            <div
              id="imagenes"
              class="mt-11 mb-11 d-flex align-center justify-center"
              style="width:350px;height:350px;"
            >
              <v-img
                :src="require(`../imagenes/bienvenida/${item.img}`)"
              ></v-img>
            </div>
            <h4 style="text-align:center;color:#37474f;">{{ item.text }}</h4>
            <!-- <v-btn v-if="onboarding===5" rounded color="#6a1b9a" style="color:white;font-family:Dosis;">Comenzar</v-btn> -->
          </div>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item class="fill-height">
      <v-card color="#fff" class="fill-height" elevation="0">
        <v-row class="fill-height" align="center" justify="center">
          <div
            class="d-flex flex-column align-center justify-center"
            style="height:90%;"
          >
            <h1
              style="text-align:center; font-size: 2rem;font-family:Dosis;font-weight: inherit; color:#37474f;"
            >
              Explorar B1nQ0de
            </h1>
            <div
              id="imagenes"
              class="mt-11 mb-11 d-flex align-center justify-center"
              style="width:350px;height:350px;"
            >
              <v-img src="../imagenes/bienvenida/image6.svg"></v-img>
            </div>

            <v-btn
             @click="$router.go()"
              rounded
              color="#6a1b9a"
              style="color:white;font-family:Dosis;"
              >Comenzar</v-btn
            >
          </div>
        </v-row>
      </v-card>
    </v-window-item>
    <v-item-group
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="onboarding"
      class="text-center"
      mandatory
      style="position:absolute;bottom:0;left:0;right:0;"
    >
      <v-item
        v-for="(item, n) in length"
        :key="`btn-${n}`"
        v-slot:default="{ active, toggle }"
      >
        <v-btn
          color="rgb(62, 65, 109)"
          :input-value="active"
          icon
          @click="toggle"
        >
          <v-icon size="14">mdi-record</v-icon>
        </v-btn>
      </v-item>
      <v-item v-slot="{ active, toggle }">
        <v-btn
          color="rgb(62, 65, 109)"
          :input-value="active"
          icon
          @click="toggle"
        >
          <v-icon size="14">mdi-record</v-icon>
        </v-btn>
      </v-item>
    </v-item-group>
  </v-window>
</template>
<script>
import store from '../store'
export default {
  data() {
    return {
      dialog: true,
      length: [
        {
          title: "Bienvenido a B1nQ0de",
          img: "image1.svg",
          text:
            "Es un placer darte la bienvenida a nuestra plataforma web, veamos que te depara en B1nQ0de",
        },
        {
          title: "Categorías y módulos",
          img: "image2.svg",
          text:
            "En B1nQ0de encontrarás una variedad de categorías para elegir y explorar sus módulos",
        },
        {
          title: "Cuestionarios",
          img: "image3.svg",
          text: "Realiza los cuestionarios que tenemos disponibles para tí.",
        },
        {
          title: "Detalle de cuestionarios",
          img: "image4.svg",
          text:
            "Puedes consultar tus módulos ya contestados y ver tus respuestas.",
        },
        {
          title: "App Móvil",
          img: "image5.svg",
          text: "Puedes echar un vistazo a nuestra app móvil de B1nQ0de.",
        },
        // {title:'Explorar B1nQ0de',img:'image6.svg',text:''},
      ],
      onboarding: 0,
    };
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? 5 : this.onboarding - 1;
    },
  },
};
</script>
