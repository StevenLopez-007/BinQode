<template>
  <v-container
    :class="darkTheme ? 'primaryColorDark' : ''"
    class="pa-0 ma-0"
    style="height:100%;background:#f0efff;"
  >
    <v-row class="bannerPerfil d-flex ">
      <v-icon style="position:absolute;top:10px; left:10px; cursor:pointer;z-index:200;" @click="$router.replace('/categoria')" color="white"
          >fas fa-arrow-left</v-icon
        >
      <v-col lg="12" class="infoUser d-flex justify-start">
        <v-list class="lista">
          <v-list-item>
            <v-list-item-avatar :size="$vuetify.breakpoint.smAndDown?100:150">
              <img
                :src="require(`../imagenes/avatars/${datosUser.avatar}.svg`)"
                alt=""
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                datosUser.nombre
              }}</v-list-item-title>
              <v-list-item-subtitle class="white--text">{{
                datosUser.email
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <!-- <v-row class="d-flex justify-center">
        <v-col lg="6" class="pa-0">
          <v-tabs height="51" class="tabs" centered grow>
            <v-tab>Módulos</v-tab>
            <v-tab>Módulos</v-tab>
          </v-tabs>
        </v-col>
      </v-row> -->
    </v-row>
    <v-row class="d-flex justify-center flex-column align-center">
      <v-col
        cols="11"
        lg="6"
        md="7"
        sm="9"
        class="pa-0 tabsPerfil"
        style="border-top-left-radius:10px;height:auto;"
      >
        <v-tabs
          show-arrows
          prev-icon="fas fa-chevron-left"
          next-icon="fas fa-chevron-right"
          :value="finish ? 0 : 1"
          color="#aa4b6b"
          height="51"
          centered
          grow
          :background-color="darkTheme?'#212121':''"
        >
          <v-tab
          :style="{'font-size':$vuetify.breakpoint.mdAndDown?'12px':''}"
            @click="finish = true"
            
            ><v-icon class="pa-2">fas fa-check</v-icon>{{$vuetify.breakpoint.xsOnly?'':'Modulos Terminados'}}</v-tab
          >
          <v-tab
          :style="{'font-size':$vuetify.breakpoint.mdAndDown?'12px':''}"
            @click="finish = false"
            
            ><v-icon class="pa-2">fas fa-times</v-icon>{{$vuetify.breakpoint.xsOnly?'':'Módulos sin terminar'}}</v-tab>
        </v-tabs>
      </v-col>
      <v-col
        :class="[
          darkTheme ? 'secondaryColorDark' : '',
          modsIns.length == 0 ? 'd-flex justify-center align-center' : '',
        ]"
        class="containerPerfil pa-0"
        cols="11"
        lg="6"
        md="7"
        sm="9"
        style="background:white;"
        :style="{'box-shadow':darkTheme?'none':'0 0 50px -25px gray'}"
      >
        <v-col cols="12" class="pa-0" v-for="(mod, i) in modsIns" :key="i">
          <v-list :class="darkTheme?'secondaryColorDark':''">
            <v-list-item>
              <v-list-item-avatar style="border-radius:2px;" tile :size="$vuetify.breakpoint.xsOnly?60:100">
                <img
                  :src="
                    require(`../imagenes/modulos/imagenesModulospng/${mod.mod.img}`)
                  "
                  alt=""
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title :class="darkTheme?'subtitleDark':''" style="font-family:Dosis-semi">{{
                  mod.mod.nombre
                }}</v-list-item-title>
                <v-list-item-subtitle :class="darkTheme?'tituloDark':''" style="font-family:Dosis-medium">{{
                  mod.mod.descripcion
                }}</v-list-item-subtitle>
                <div v-if="!$vuetify.breakpoint.xsOnly">
                  <v-list-item-action
                    @click="
                      $router.push({
                        name: 'cuestionariocon',
                        params: {
                          id: mod.mod.id,
                          idCat: mod.mod.categoria,
                        },
                      })
                    "
                    class="font-weight-medium mr-1 ml-1"
                    style="font-size:14px;cursor:pointer;color:#79909D;display:ruby-base;"
                  >
                    <v-icon :class="darkTheme?'tituloDark':''" size="16" class="pa-1">fas fa-eye</v-icon> Ver
                    detalle
                  </v-list-item-action>
                  <v-list-item-action
                    @click="
                      resetMod(
                        mod.mod.id,
                        mod.mod.categoria,
                        mod.calificacion
                      )
                    "
                    class="font-weight-medium ml-1 mr-1"
                    style="font-size:14px;cursor:pointer;color:#79909D;display:ruby-base;"
                  >
                    <v-icon :class="darkTheme?'tituloDark':''" size="16" class="pa-1">fas fa-redo</v-icon>Reiniciar
                  </v-list-item-action>
                </div>
                <v-progress-linear
                  style="flex:unset;"
                  class="ma-2"
                  color="#aa4b6b"
                  rounded
                  :value="mod.calificacion * 100"
                ></v-progress-linear>
              </v-list-item-content>
              <v-list-item-action>
                <v-menu v-if="$vuetify.breakpoint.xsOnly"  bottom right transition="fade-transition">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      style="position:absolute;top:0;right:0;"
                      icon
                      v-on="on"
                      ><v-icon
                        :color="darkTheme ? '#aa4b6b' : '#212121'"
                        size="14"
                        >fas fa-ellipsis-v</v-icon
                      ></v-btn
                    >
                  </template>
                  <v-list :class="darkTheme ? 'secondaryColorDark' : ''">
                    <v-list-item>
                      <v-list-item-title
                        :class="darkTheme ? 'subtitleDark' : ''"
                        @click="
                          $router.push({
                            name: 'cuestionariocon',
                            params: {
                              id: mod.mod.id,
                              idCat: mod.mod.categoria,
                            },
                          })
                        "
                        class="font-weight-medium"
                        style="cursor:pointer;"
                        >Ver detalle</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title
                        :class="darkTheme ? 'subtitleDark' : ''"
                        @click="
                          resetMod(
                            mod.mod.id,
                            mod.mod.categoria,
                            mod.calificacion
                          )
                        "
                        class="font-weight-medium"
                        style="cursor:pointer;"
                        >Volver a realizar test</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
        <div v-if="modsIns.length === 0" style="width:50%;height:50%;">
          <v-img contain src="../imagenes/moduloVacio/modVacio.svg"></v-img>
        </div>
      </v-col>
    </v-row>
    <!-- <pre>{{modsIns}}</pre> -->
  </v-container>
</template>
<script>
import store from "../store";
import axios from "axios";
import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
import "../styles/perfil.scss";
export default {
  data() {
    return {
      buscar: "",
      finish: true,
      dias: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      // bannerColor:{text:`Feliz ${moment().format('dddd')}`}
    };
  },
  computed: {
    datosUser() {
      return store.state.currentUser.usuario;
    },
    modsIns() {
      return store.getters
        .modsInsFil(this.buscar.toLowerCase(), true)
        .filter((mod) => {
          return this.finish ? mod.calificacion >= 1 : mod.calificacion < 1;
        });
    },
    darkTheme() {
      return this.$store.getters.darkTheme;
    },
  },
  created() {
    this.getModIns();
  },
  methods: {
    getModIns() {
      axios
        .get(`inscripcion/getInscrip/${this.datosUser._id}`)
        .then((response) => {
          response.data.inscripcions != undefined ||
          response.data.inscripcions.length > 0
            ? store.commit("setModulosCompletados", response.data.inscripcions)
            : null;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toCuestionario(id, idCat) {
      this.$router.replace({
        name: "InstroduccionMod",
        params: {
          id: id,
          idCat: idCat,
        },
      });
    },
    resetMod(idMod, idCat, calificacion) {
      Swal.fire({
        icon: "warning",
        title: "¿Reintentar módulo?",
        text:
          calificacion >= 1
            ? "Ya tienes el 100% de este módulo, ¿Seguro quieres anular tu inscripción?"
            : "¡Si aceptas, anularás tu inscripción al módulo!",
        showCancelButton: true,
        confirmButtonColor: "#00b248",
        cancelButtonColor: "#ef5350",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          axios
            .get(
              `cuestionarioRes/reiniciarModulo/${idMod}/${store.state.currentUser.usuario._id}`,
              { headers: { "x-token": store.state.token } }
            )
            .then((response) => {
              response.data.ok
                ? this.toCuestionario(idMod, idCat)
                : this.$store.dispatch("logout");
            })
            .catch((error) => {
              this.$router.push({ name: "Categoria" });
            });
        }
      });
    },
  },
};
</script>
