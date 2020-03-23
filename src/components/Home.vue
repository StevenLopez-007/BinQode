<style>
@font-face {
  font-family: "Ubuntu";
  src: url(../fonts/Ubuntu-Bold.ttf);
}
@font-face {
  font-family: "Dosis";
  src: url(../fonts/Dosis-Bold.ttf);
}
.tituloHome {
  font-weight: normal;
  font-size: 46px;
  font-family: "Ubuntu";
  text-align: left;
  color: #301b68;
  letter-spacing: 1px;
}
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
@media screen and (max-width: 1300px) {
  .tituloHome {
    font-size: 36px;
  }
  .avatarHome {
    width: 90px !important;
    height: 90px !important;
  }
}
@media screen and (max-width: 1050px) {
  .tituloHome {
    font-size: 26px;
  }
  .imgPlayStore {
    width: 70%;
  }
  .iconosRedes a i {
    font-size: 26px !important;
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
  
}
@media screen and (max-width: 600px) {
  .imgPlayStore {
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .tituloHome {
    font-size: 22px;
  }
  .tituloHome2 h1 {
  font-size: 26px;
}
}
</style>
<template>
  <div>
    <v-row style="background-color:#e2e2fe;">
      <v-col
        cols="12"
        sm="12"
        lg="6"
        md="6"
        class="d-flex  justify-lg-center align-lg-center  justify-sm-center align-sm-center justify-center"
      >
        <v-col cols="6" lg="6" md="6" sm="6">
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
          <div class="d-flex justify-space-around mt-4">
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
          </div>
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
        <h1>Diviertete mientras aprendes</h1>
      </div>
      </v-col>
    </v-row>
    <!-- ----- -->
    <!-- Seccion 2 ---------------------------------->
    <v-row>
      <v-col cols="12" lg="4" md="4" xl="4" sm="12" class="d-flex justify-center">
        <v-col cols="12" lg="12" md="12" xl="12" sm="6" class="d-flex justify-center">
          <v-card class="cardHome">
            <v-img
              class="imgHome"
              src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Captura2.JPG?alt=media&token=84531dd3-61ea-4ed2-979a-7e127d947a3a"
            ></v-img>
            <h2 class="tituloSeccion2">
              <v-icon color="rgb(98, 215, 107)" class="ma-2"
                >fas fa-th-list</v-icon
              >
              Categorias
            </h2>
            <h3>
              Toda una variedad de modulos sobre diferentes áreas, solo pulsa
              sobre uno para iniciarlo
            </h3>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="12" lg="4" md="4" xl="4" sm="12" class="d-flex justify-center">
        <v-col cols="12" lg="12" md="12" xl="12" sm="6" class="d-flex justify-center">
        <v-card class="cardHome">
          <v-img
            class="imgHome"
            src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Captura1.JPG?alt=media&token=b1804dc5-878f-475d-b93e-e72cb1235a6a"
          ></v-img>
          <h2 class="tituloSeccion2">
            <v-icon class="ma-2" color="#fc5873">fas fa-question-circle</v-icon>
            Cuestionarios
          </h2>
          <h3>
            Refuerza tus conocimientos con los cuestionarios, lee, analiza y
            responde.
          </h3>
        </v-card>
        </v-col>
      </v-col>
      <v-col cols="12" lg="4" md="4" xl="4" sm="12" class="d-flex justify-center">
        <v-col cols="12" lg="12" md="12" xl="12" sm="6" class="d-flex justify-center">
        <v-card class="cardHome">
          <v-img
            class="imgHome"
            src="https://firebasestorage.googleapis.com/v0/b/binqode.appspot.com/o/Captura2.JPG?alt=media&token=84531dd3-61ea-4ed2-979a-7e127d947a3a"
          ></v-img>
          <h2 class="tituloSeccion2">
            <v-icon class="ma-2" color="#fcd839">fas fa-th-list</v-icon> Modulos
            contestados
          </h2>
          <h3>
            Puedes consultar los modulos que has terminado, pero recuerda de los
            errores se aprende.
          </h3>
        </v-card>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
