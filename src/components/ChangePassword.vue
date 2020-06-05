<style>
.tituloReset {
  font-size: 48px;
  font-family: Dosis;
  color: rgb(62, 65, 109);
  border-bottom: none;
}
@media screen and (max-width: 600px) {
  .tituloReset {
    font-size: 38px;
  }
}
</style>
<template>
  <div style="background-color:rgb(240, 239, 255);height:100vh;" >
    <v-toolbar>
      <v-avatar size="55">
        <img src="../imagenes/icon.png" />
      </v-avatar>
      <v-toolbar-title
        class="ma-2"
        style="font-family:Dosis; font-size:26px;letter-spacing:0.6px;color:rgb(62, 65, 109);"
        >B1nQ0de</v-toolbar-title
      >
    </v-toolbar>
    <v-container
      class="d-flex align-center justify-center ma-0 pa-0"
      style="background-color:rgb(240, 239, 255); height:calc(100vh - 64px);"
    >
      <div
        class="d-flex justify-center align-center flex-column justify-space-between"
         style="background-color:rgb(240, 239, 255);"
      >
        <h1 v-if="!succes" class="text-center tituloReset">
          Volver a establecer contraseña
        </h1>
        <h1 v-if="succes" class="text-center tituloReset">
          ¡Se ha restablecido tu contraseña con exito!
        </h1>
        <h2 v-if="succes" class="mt-5" style="font-family:Dosis;" >Ir a Login <v-btn @click="$router.replace('/login')" color="#aa4b6b" rounded style="color:white;font-family:Dosis;">OK</v-btn></h2>
        <p v-if="!succes" class="mb-12 text-center">Ingresa tu nueva contraseña y luego confirmala.</p>
        <v-form v-if="!succes" v-model="validate" ref="form" style="width:100%;" class="d-flex justify-center flex-column align-center">
          <v-text-field
            clearable
            :type="showPasswordNew ? 'text' : 'password'"
            @click:append="showPasswordNew = !showPasswordNew"
            :append-icon="showPasswordNew ? 'fas fa-eye' : 'fas fa-eye-slash'"
            :rules="newContraRules"
            v-model="newContra"
            style="width:80%;"
            solo
            label="Nueva Contraseña"
          ></v-text-field>
          <v-text-field
            :type="showPasswordConfirm ? 'text' : 'password'"
            @click:append="showPasswordConfirm = !showPasswordConfirm"
            :append-icon="
              showPasswordConfirm ? 'fas fa-eye' : 'fas fa-eye-slash'
            "
            :rules="confirmContraRules"
            v-model="confirmContra"
            style="width:80%;"
            solo
            label="Confirmar Contraseña"
          ></v-text-field>
          <span v-if="error && !contraNot" class="red--text">¡Ups!, ocurrió un error, vuelve a intentarlo</span>
          <span v-if="!error && contraNot" class="red--text">Las contraseñas no coinciden, vuelve a ingresarlas</span>
          <v-btn
          :loading="cargando"
            @click="Submit()"
            width="250"
            height="50"
            rounded
            color="#aa4b6b"
            class="white--text mt-8"
            >Cambiar</v-btn
          >
        </v-form>
      </div>
    </v-container>
  </div>
</template>
<script>
import Vue from "vue";
import axios from 'axios'
import decode from 'jwt-decode'
// import { VueReCaptcha } from "vue-recaptcha-v3";
// Vue.use(VueReCaptcha, { siteKey: "6LftKP8UAAAAAFyn3w1cTjIgoizkGLxDB_d5GxBd" });
export default {
  data() {
    return {
      newContra: "",
      confirmContra: "",
      validate: true,
      error:false,
      succes:false,
      cargando:false,
      contraNot:false,
      newContraRules: [
        (v) => !!v || "Ingresa tu nueva contraseña",
        (v) => v.length > 4 || "Contraseña demasiado corta",
      ],
      confirmContraRules: [(v) => !!v || "Ingresa de nuevo la contraseña"],
      showPasswordNew: false,
      showPasswordConfirm: false,
    };
  },
  mounted() {
    // this.onResize();
  },
  methods: {
    Submit() {
      this.cargando =true;
      if (this.$refs.form.validate()) {
        // if (this.newContra === this.confirmContra) {
        //   this.$recaptcha("contactus").then((token) => {
        //       console.log(token)
        //   });
        // } else {
        //   this.newContra = "";
        //   this.confirmContra = "";
        // }
        if(this.newContra ===this.confirmContra){
          var id = decode(this.$route.params.token)
          axios.post(`estudiante/resetPassword/${id.usuario.id}`,{password:this.newContra},{headers:{'x-token':this.$route.params.token}})
          .then(result=>{
            result.data.ok?(this.succes=true)(this.$router.params.token = ''):this.error=true
          })
          .catch((error)=>{this.error=true})
          .finally(()=>this.cargando=false)
        }
        else{
           this.newContra = "";
           this.confirmContra = "";
          this.contraNot=true;
          this.error=false;
          this.cargando=false
        }
      }
    },
    // onResize(){
    //     const instance =this.$recaptchaInstance;
    //     this.$vuetify.breakpoint.xsOnly?instance.hideBadge():instance.showBadge()
    // }
  },
};
</script>
