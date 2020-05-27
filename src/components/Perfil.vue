<template>
  <div>
    <v-row class="banner">
      <h1 class="ma-3 tituloBanner"><v-icon @click="$router.replace('/categoria')" color="white">fas fa-arrow-left</v-icon> ¡Feliz {{dias[new Date().getDay()]}}, {{ datosUser.nombre }}!</h1>
      <v-avatar :size="$vuetify.breakpoint.xsOnly?'130':'200'" class="avatar">
        <img
          :src="require(`../imagenes/avatars/${datosUser.avatar}.svg`)"
          alt=""
        />
      </v-avatar>
    </v-row>
    <v-row class="contentMod">
        <v-col cols="12" class="d-flex justify-space-between">
            <!-- <div style="width:50%;" class="d-flex justify-center"> -->
            <!-- <v-switch color="green darken-1" v-model="switch1" inset :label="switch1?'Completados':'Todos'">
            </v-switch> -->
            <div class="d-flex align-start pt-3 mt-1">
            <v-icon @click="ordenar()" ref="flechaIcon" class="flecha">fas fa-arrow-up</v-icon>
            <span class="ml-1 font-weight-bold text--secondary">{{textOr}}</span>
            </div>
            <!-- </div> -->
            <!-- <div style="width:50%;"  class="d-flex justify-center"> -->
            <v-text-field v-model="buscar" append-icon="fas fa-search" clearable>

            </v-text-field>
            <!-- </div> -->
        </v-col>
        <v-col class="pt-0 pb-0" cols="12" sm="6" v-for="(mod,i) in modsIns" :key="i">
            <v-card color="white" elevation="2" style="border-radius:10px;">
                <div class="d-flex flex-nowrap justify-space-between align-center">
                    <div style="width:85%">
                    <v-card-title style="color:rgb(62, 65, 109);font-family:Dosis !important;" v-text="mod.modulo.nombre" class="headline"></v-card-title>
                    <v-card-subtitle style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" v-text="mod.modulo.descripcion"></v-card-subtitle>
                    </div>
                    <div style="width:15%" class="ma-2 d-flex align-center justify-center">
                    <v-progress-circular  :value="(mod.calificacion)*10" color="rgb(62, 65, 109)">

                    </v-progress-circular>
                    </div>
                </div>
            </v-card>
        </v-col>
    </v-row>
    <!-- <pre>{{modsIns}}</pre> -->
  </div>
</template>
<script>
import store from "../store";
import axios from "axios";
export default {
  data() {
    return {
        buscar:'',
        switch1:false,
        dias:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
        textOr:'+Nota',
        notaUP:true
    };
  },
  computed: {
    datosUser() {
      return store.state.currentUser.usuario;
    },
    modsIns(){
        return store.getters.modsInsFil(this.buscar.toLowerCase(),this.notaUP)
    },
  },
  created(){
      this.getModIns()
  },
  methods: {
    getModIns() {
      axios
        .get(`inscripcion/getInscrip/${this.datosUser._id}`)
        .then((response) => {
          response.data.inscripcions != undefined ||
          response.data.inscripcions.length > 0
            ? store.commit("setModulosCompletados",response.data.inscripcions): null;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ordenar(){
      
      this.$refs.flechaIcon.$el.classList.toggle('flechaUp')
      if(this.$refs.flechaIcon.$el.classList[7]!= undefined){
        this.textOr='-Nota'
        this.notaUP = false;
      }
      else{
        this.textOr = '+Nota'
        this.notaUP = true;
      }
    }
  },
};
</script>
