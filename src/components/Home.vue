<style>
@font-face {
  font-family: "Ubuntu";
  src: url(../fonts/Ubuntu-Bold.ttf);
}
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
.row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
/* Card e imagenes */
.imgPlayStore {
  width: 100%;
}
.cardHome {
  width: 75%;
  box-shadow: none;
}

.cardHome h2 {
  font-family: "Dosis";
  display: inline-flex;
  color: #301b68;
  margin-top: 10px;
}
.cardHome h3 {
  font-family: "Ubuntu";
  font-weight: normal;
  font-size: 14px;
  color: rgb(176, 178, 190);
  line-height: 24px;
}

.imgHome {
  height: 300px;
}
.imgHome .v-image__image--cover {
  border-radius: 15px;
}
/* titulos */
.tituloHome {
  font-weight: normal;
  font-size: 46px;
  font-family: "Ubuntu";
  text-align: left;
  color: #301b68;
  letter-spacing: 1px;
}
.tituloHome2 {
  margin-top: 100px;
  margin-bottom: 20px;
  width: 100%;
}
.tituloHome2 h1 {
  text-align: center;
  font-size: 36px;
  font-weight: normal;
  font-family: "Ubuntu";
  color: #301b68;
  letter-spacing: 0.7px;
}
.tituloCategorias {
  text-align: start;
  font-size: 26px;
  font-weight: normal;
  font-family: "Dosis";
  color: white;
}
.descripcionCat {
  font-weight: bold;
  font-size: 14px;
  text-align: justify;
  color: #495057;
}
.tituloHome3 {
  display: none;
}
.tituloHome4 {
  font-family: "Dosis";
  color: #3c3c3c;
  line-height: 1;
}
.descripcionHome4 {
  font-weight: bold;
  font-size: 16px;
  text-align: justify;
  color: #777;
  line-height: 2;
}
/* .tituloFooter {
  font-family: "Dosis";
  font-size: 36px;
  letter-spacing: 1px;
  color: #f5f5f5;
}
.redesFooter li {
  list-style-type: none;
  color: white;
  font-weight: bold;
}
.redesFooter {
  padding-left: 0 !important;
  padding-top: 20px;
} */

.circulo {
  position: absolute;
  left: 0;
  right: 0;
  top: 0%;
  bottom: 0;
  margin: auto;
  z-index: -1000;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background-color: #fafafa;
}
#tituloHome3::after {
  content: "Principales Categorías";
  font-size: 36px;
  font-family: "Ubuntu";
  font-weight: normal;
  color: #301b68;
  position: absolute;
  left: 0;
  top: 90px;
}

@media screen and (max-width: 1264px) {
  .tituloHome {
    font-size: 36px;
  }
  .avatarHome {
    width: 90px !important;
    height: 90px !important;
  }
  /* .imgFooter {
    display: none;
  } */
}
@media screen and (max-width: 1050px) {
  .tituloHome {
    font-size: 26px;
  }
  .imgPlayStore {
    width: 70%;
  }
  /* .iconosRedes a i {
    font-size: 26px !important;
  } */
  #tituloHome3::after {
    /* display:none; */
    font-size: 30px;
  }
}
@media screen and (max-width: 960px) {
  .imagenHome {
    display: none;
  }
  .tituloHome {
    text-align: center;
  }
  .imgPlayStore {
    width: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .tituloHome2 {
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .tituloHome3 {
    display: block;
  }
  .tituloHome3 h1 {
    text-align: center;
    font-size: 36px;
    font-weight: normal;
    font-family: "Ubuntu";
    color: #301b68;
    letter-spacing: 0.7px;
  }
  #tituloHome3::after {
    display: none;
  }
  .circulo {
    display: none;
  }
  .avatarHome4 {
    width: 150px !important;
    height: 150px !important;
    min-width: 150px !important;
  }
  .tituloHome4 {
    font-size: 26px;
  }
  .descripcionHome4 {
    font-size: 14px;
  }
}
@media screen and (max-width: 600px) {
  .imgPlayStore {
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .tituloHome {
    font-size: 20px;
  }
  .tituloHome2 h1 {
    font-size: 26px;
  }
  .tituloHome3 h1 {
    font-size: 26px;
  }
  .tituloHome4 {
    text-align: center;
  }
  .contenidoHome4 {
    flex-direction: column-reverse;
  }
}
</style>
<template>
  <div v-resize="windowWidth">
    <v-row style="background-color:#e2e2fe;" :style="{'padding-top': width>960 ? 0:64+'px'}">
      <v-col
        cols="12"
        sm="12"
        lg="6"
        md="6"
        class="d-flex  justify-lg-center align-lg-center  justify-sm-center align-sm-center justify-center"
      >
        <v-col cols="12" lg="6" md="6" sm="6">
          <div class="d-flex justify-sm-center justify-md-start justify-center">
            <v-avatar size="100" class="ma-1 avatarHome">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/logorobot2.jpg?alt=media&token=29fe8256-7433-4e18-a4d2-3ad9a4ef2280"
                alt=""
              />
            </v-avatar>
          </div>
          <h1 class="tituloHome">
            Refuerza tus conocimientos básicos en la programación
          </h1>
          <div class="mt-3 ">
            <a href="#"
              ><img
                class="imgPlayStore"
                src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/google-play-badge.png?alt=media&token=82ffb9aa-4829-45dd-9ddb-75ea71a709a5"
                alt=""
            /></a>
          </div>
          <!-- <div class="d-flex justify-space-around mt-4">
            <div class="iconosRedes">
              <a href="#"
                ><v-icon size="30px" color="#404074"
                  >fab fa-facebook-f</v-icon
                ></a
              >
            </div>
            <div>
              <a href="#"
                ><v-icon size="30px" color="#404074"
                  >fab fa-instagram</v-icon
                ></a
              >
            </div>
            <div>
              <a href="#"
                ><v-icon size="30px" color="#404074">fab fa-twitter</v-icon></a
              >
            </div>
          </div> -->
        </v-col>
      </v-col>
      <v-col cols="6" lg="6" class="pa-0 imagenHome">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/imagenhome2.jpg?alt=media&token=fdf499d9-cf05-497c-9015-7922940f9362"
        >
        </v-img>
      </v-col>
    </v-row>
    <!-- ------------ -->
    <v-row>
      <v-col cols="12">
        <div class="tituloHome2">
          <h1>Diviértete mientras aprendes</h1>
        </div>
      </v-col>
    </v-row>
    <!-- ----- -->
    <!-- Seccion 2 ---------------------------------->
    <v-row>
      <v-col
        cols="12"
        lg="4"
        md="4"
        xl="4"
        sm="12"
        class="d-flex justify-center"
      >
        <v-col
          cols="12"
          lg="12"
          md="12"
          xl="12"
          sm="6"
          class="d-flex justify-center"
        >
          <v-card class="cardHome">
            <v-img
              class="imgHome"
              src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Captura2.JPG?alt=media&token=84531dd3-61ea-4ed2-979a-7e127d947a3a"
            ></v-img>
            <h2 class="tituloSeccion2">
              <v-icon color="rgb(252, 88, 115)" class="ma-2"
                >fas fa-th-list</v-icon
              >
              Categorías
            </h2>
            <h3>
              Toda una variedad de módulos sobre diferentes áreas, solo pulsa
              sobre uno para comenzar.
            </h3>
          </v-card>
        </v-col>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        md="4"
        xl="4"
        sm="12"
        class="d-flex justify-center"
      >
        <v-col
          cols="12"
          lg="12"
          md="12"
          xl="12"
          sm="6"
          class="d-flex justify-center"
        >
          <v-card class="cardHome">
            <v-img
              class="imgHome"
              src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Captura1.JPG?alt=media&token=b1804dc5-878f-475d-b93e-e72cb1235a6a"
            ></v-img>
            <h2 class="tituloSeccion2">
              <v-icon class="ma-2" color="rgb(98, 215, 107)"
                >fas fa-question-circle</v-icon
              >
              Cuestionarios
            </h2>
            <h3>
              Refuerza tus conocimientos con los cuestionarios, lee, analiza y
              responde.
            </h3>
          </v-card>
        </v-col>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        md="4"
        xl="4"
        sm="12"
        class="d-flex justify-center"
      >
        <v-col
          cols="12"
          lg="12"
          md="12"
          xl="12"
          sm="6"
          class="d-flex justify-center"
        >
          <v-card class="cardHome">
            <v-img
              class="imgHome"
              src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Captura2.JPG?alt=media&token=84531dd3-61ea-4ed2-979a-7e127d947a3a"
            ></v-img>
            <h2 class="tituloSeccion2">
              <v-icon class="ma-2" color="#fcd839">fas fa-layer-group</v-icon>
              Módulos completados
            </h2>
            <h3>
              Puedes consultar los módulos que has completado, pero recuerda de
              los errores se aprende.
            </h3>
          </v-card>
        </v-col>
      </v-col>
      
    </v-row>
    <!-- Seccion3-------------------------------- -->
    <v-row>
      <v-col cols="12">
        <div class="tituloHome3">
          <h1>Principales categorías</h1>
        </div>
      </v-col>
    </v-row>
    <!--  -->
    <v-row class="mt-7">
      <v-col
        lg="12"
        class="d-flex justify-lg-center justify-sm-center justify-md-center justify-start"
      >
        <v-col
          cols="12"
          lg="10"
          md="10"
          sm="10"
          style="position:relative; z-index:1000;"
        >
          <div class="circulo"></div>
          <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :color="item.color"
              :icon="item.icon"
              fill-dot
              :id="'tituloHome' + (i + 3)"
            >
              <v-card :color="item.color" dark elevation="4">
                <h1 class="tituloCategorias pa-2">{{ item.titulo }}</h1>
                <v-card-text class="white text--primary">
                  <p class="descripcionCat">
                    {{ item.descripcion }}
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-col>
    </v-row>
    <!-- Seccion4----------------- -->
    <v-row class="mt-12">
      <v-col cols="12" class="d-flex justify-center">
        <v-col lg="10">
          <hr style="height:0px; border: 1px solid #e5e5e5; width:100%;  " />
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        lg="3"
        md="3"
        sm="3"
        cols="12"
        class="d-flex justify-lg-end justify-md-center justify-sm-center justify-center"
      >
        <v-avatar size="250" class="avatarHome4">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/LogosRobot%2Flogorobot5.jpg?alt=media&token=ec808fb5-9f34-4da5-a598-1f1239caeea3"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-col lg="9" class="d-flex align-center">
        <v-col lg="10">
          <div class="ml-3">
            <h1 class="tituloHome4">
              Retroalimenta tus conocimientos básicos de programación
            </h1>
            <p class="descripcionHome4 mt-7">
              En B1nQ0de te ayudamos a mejorar tu lógica básica en programación,
              ¿Que esperas para probar B1nQ0de?
            </p>
          </div>
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-col lg="10">
          <hr style="height:0px; border: 1px solid #e5e5e5; width:100%;  " />
        </v-col>
      </v-col>
    </v-row>

    <v-row class="contenidoHome4">
      <v-col lg="9" class="d-flex align-center justify-end">
        <v-col lg="10">
          <div class="ml-3">
            <h1 class="tituloHome4">
              Obtiene una calificación al terminar el cuestionario
            </h1>
            <p class="descripcionHome4 mt-7">
              Al finalizar un módulo obtendrás una calificacion en base a las
              respuestas que acertaste, pero recuerda una calificación no define tu
              inteligencia.
            </p>
          </div>
        </v-col>
      </v-col>
      <v-col
        lg="3"
        md="3"
        sm="3"
        cols="12"
        class="d-flex justify-lg-start justify-md-center justify-sm-center justify-center"
      >
        <v-avatar size="200" class="avatarHome4">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/LogosRobot%2Flogorobot6.jpg?alt=media&token=934db329-4e36-49d7-9d2e-d035b142f3a4"
          ></v-img>
        </v-avatar>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-col lg="10">
          <hr style="height:0px; border: 1px solid #e5e5e5; width:100%;  " />
        </v-col>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        lg="3"
        md="3"
        sm="3"
        cols="12"
        class="d-flex justify-lg-end justify-md-center justify-sm-center justify-center"
      >
        <v-avatar size="200" class="avatarHome4">
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/LogosRobot%2Flogorobot7.jpg?alt=media&token=41c78303-f975-4dd8-a692-c543c287d7d5"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-col lg="9" class="d-flex align-center">
        <v-col lg="10">
          <div class="ml-3">
            <h1 class="tituloHome4">Revisa tus módulos completados</h1>
            <p class="descripcionHome4 mt-7">
              Puedes revisar tu historial de módulos, puedes ver las respuestas que
              seleccionaste y tu calificación obtenida en los cuestionarios
            </p>
          </div>
        </v-col>
      </v-col>
    </v-row>

    <!--Seccion5 ---------------------- -->
    <!-- <v-row style="background-color:#041d31" class="d-flex justify-center" >
      <v-col lg="3" class="imgFooter">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/LogosRobot%2Flogorobot8.png?alt=media&token=3a065154-5c0f-460a-9d51-4159c3674f2f"
        ></v-img>
      </v-col>
      <v-col
        lg="2"
        cols="12"
        class="d-flex align-lg-center align-md-center justify-md-center align-sm-center justify-sm-center justify-center align-center"
      >
        <h1 class="tituloFooter">B1nQ0de</h1>
      </v-col>
      <v-col lg="3" cols="6" class="pt-10 pl-11 ">
        <h3 style="color:white;">Síguenos</h3>
        <ul class="redesFooter">
          <li class="mt-3">
            <v-icon class="mr-2" style="width:21px; color:white"
              >fab fa-facebook-f</v-icon
            >
            Facebook
          </li>
          <li class="mt-3">
            <v-icon class="mr-2" style="width:21px; color:white"
              >fab fa-instagram</v-icon
            >
            Instagram
          </li>
          <li class="mt-3">
            <v-icon class="mr-2" style="width:21px; color:white"
              >fab fa-twitter</v-icon
            >
            Twitter
          </li>
        </ul>
      </v-col>
      <v-col lg="3" cols="6" class="pt-10 pl-11 ">
        <h3 style="color:white;">Sobre Nosotros</h3>
        <ul class="redesFooter">
          <li class="mt-3">¿Quiénes Somos?</li>
          <li class="mt-3">Equipo</li>
          <li class="mt-3">Trabajo</li>
          <li class="mt-3">Contáctanos</li>
        </ul>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-col lg="10">
          <hr style="height:0px; border: 1px solid #e5e5e5; width:100%;  " />
          <div class="d-flex justify-space-between">
            <span style="font-size:12px; color:white;">&copy;BinQode App</span>
            <span style="font-size:12px; color:white;">{{
              new Date().getFullYear()
            }}</span>
          </div>
        </v-col>
      </v-col>
    </v-row> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          titulo: "Diseño Web",
          descripcion:
            "Prueba tus dotes en el diseño web con los difrerentes módulos reservados para esta área",
          color: "rgb(252, 88, 115)",
          icon: "fab fa-css3"
        },
        {
          titulo: "Programación",
          descripcion:
            "Módulos donde pondrás en práctica y aprenderás lo básico pero importante sobre los distintos lenguajes de programación que hemos reservado para  tí.",
          color: "purple darken-1",
          icon: "fas fa-code"
        },
        {
          titulo: "Bases de Datos",
          descripcion:
            "Si el desarrollo web ni programacion de alguna otra área es lo tuyo, entonces prueba las bases de datos, elige entre la variedad de módulos.",
          color: "rgb(98, 215, 107)",
          icon: "fas fa-database"
        }
      ],
      width:0
    };
  },
  methods:{
    windowWidth(){
      this.width = window.outerWidth;
    }
  }
};
</script>
