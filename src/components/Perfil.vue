<template>
  <div>
    <v-row class="banner" :class="darkTheme?'darkPerfil':''">
      <h1 class="ma-3 tituloBanner"><v-icon @click="$router.replace('/categoria')" color="white">fas fa-arrow-left</v-icon> ¡Feliz {{dia}}, {{ datosUser.nombre }}!</h1>
      <v-avatar :size="$vuetify.breakpoint.xsOnly?'130':'200'" class="avatar">
        <img
          :src="require(`../imagenes/avatars/${datosUser.avatar}.svg`)"
          alt=""
        />
      </v-avatar>
    </v-row>
    <v-row class="contentMod" :class="darkTheme?'primaryColorDark':''">
        <v-col cols="12" class="d-flex justify-space-between">
            <!-- <div style="width:50%;" class="d-flex justify-center"> -->
            <!-- <v-switch color="green darken-1" v-model="switch1" inset :label="switch1?'Completados':'Todos'">
            </v-switch> -->
            <div class="d-flex align-start pt-3 mt-1">
            <v-icon @click="ordenar()" ref="flechaIcon" class="flecha" :class="darkTheme?'tituloDark':''">fas fa-arrow-up</v-icon>
            <span :class="darkTheme?'tituloDark':'text--secondary'" style="cursor:pointer;" @click="ordenar()" class="ml-1 font-weight-bold ">{{textOr}}</span>
            </div>
            <!-- </div> -->
            <!-- <div style="width:50%;"  class="d-flex justify-center"> -->
            <v-text-field :dark="darkTheme" v-model="buscar" append-icon="fas fa-search" clearable>

            </v-text-field>
            <!-- </div> -->
        </v-col>
        <v-col class="pt-0 pb-0" cols="12" sm="6" v-for="(mod,i) in modsIns" :key="i">
            <v-card color="white" elevation="2" style="border-radius:10px;">
                <div :class="darkTheme?'secondaryColorDark':''" class="d-flex flex-nowrap justify-space-between align-center">
                    <div  style="width:85%">
                    <v-card-title :class="darkTheme?'tituloDark':''" style="color:rgb(62, 65, 109);font-family:Dosis !important;" v-text="mod.modulo.nombre" class="headline"></v-card-title>
                    <v-card-subtitle :class="darkTheme?'subtitleDark':''" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" v-text="mod.modulo.descripcion"></v-card-subtitle>
                    </div>
                    <div style="width:15%" class="ma-2 d-flex align-center justify-center">
                    <v-progress-circular  :value="(mod.calificacion)*10" :color="!darkTheme?'rgb(62, 65, 109)':'#aa00ff'">

                    </v-progress-circular>
                    </div>
                </div>
            </v-card>
        </v-col>
    </v-row>
    <!-- <pre>{{fondoBanner}}</pre> -->
  </div>
</template>
<script>
import store from "../store";
import axios from "axios";
import VueCookies from 'vue-cookies'
import moment from 'moment'
export default {
  data() {
    return {
        buscar:'',
        switch1:false,
        dias:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
        textOr:'+Nota',
        notaUP:true,
        dia:moment().lang('es').format('dddd')
        // bannerColor:{text:`Feliz ${moment().format('dddd')}`}
    };
  },
  computed: {
    datosUser() {
      return store.state.currentUser.usuario;
    },
    modsIns(){
        return store.getters.modsInsFil(this.buscar.toLowerCase(),this.notaUP)
    },
    darkTheme(){return this.$store.getters.darkTheme}
    
  },
  created(){
      this.getModIns()
      // if(!VueCookies.isKey('timeBanner')){
      //   this.location()
      //   this.fondoBanner()
      // }

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
    },
    // location() {
    //   let me = this;
    //   var options = {
    //     enableHighAccuracy: true,
    //     timeout: 6000,
    //     maximumAge: 0,
    //   };

    //   navigator.geolocation.getCurrentPosition(success, error, options);
    //   function success(position) {
    //     var coordenadas = position.coords;
    //     var url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=S0vEAFNgbpLtsvwIZlzuc6vBJmUbDNqE&q=${coordenadas.latitude}%2C${coordenadas.longitude}&language=en-us&details=true&toplevel=false`;
    //     axios
    //       .get(url)
    //       .then((response) => {
    //         me.tiempo(response.data.Details.Key);
    //         // console.log(response.data.Details.Key)
    //       })
    //       .catch((error) => console.log(error));
    //   }
    //   function error(error) {
    //     console.warn("ERROR(" + error.code + "): " + error.message);
    //   }
    // },
    // tiempo(keyCode) {
    //   var url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${keyCode}?apikey=S0vEAFNgbpLtsvwIZlzuc6vBJmUbDNqE&language=en-us&details=true&metric=false`;
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       // console.log(response.data.DailyForecasts[0].Sun);
    //       VueCookies.set('timeBanner',response.data.DailyForecasts[0].Sun,Infinity);
          
    //       this.fondoBanner()
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // fondoBanner(){
    //   moment.locale('es')
    //   if(VueCookies.isKey('timeBanner')){
    //   var datosSol =VueCookies.get('timeBanner'),
    //       saleSol = datosSol.Rise,
    //       ocultaSol = datosSol.Set,
    //       horaActual = moment().format(),
    //       medioDia = moment().format('YYYY-MM-DD')+'T12:00:00-06:00';

    //     if(moment(horaActual).isAfter(saleSol) && moment(horaActual).isBefore(medioDia)){
    //       this.bannerColor={text:'Buenos Días',class:'dia'}
    //     }
    //     else if(moment(horaActual).isAfter(medioDia) && moment(horaActual).isBefore(ocultaSol)){
    //       this.bannerColor={text:'Buenas Tardes',class:'tarde'}
    //     }
    //     else{
    //       this.bannerColor= {text:'Buenas Noches',class:'noche'}
    //     }
    //   }
    //   else{
    //     this.bannerColor= {text:`Feliz ${moment().format('dddd')}`}
    //   }
        
    // }
    
  },
};
</script>
