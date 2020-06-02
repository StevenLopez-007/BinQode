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
  <div style="background-color:rgb(240, 239, 255);height:100vh;" v-resize="onResize">
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
        <h1 class="text-center tituloReset">
          Volver a establecer contraseña
        </h1>
        <p class="mb-12 text-center">Ingresa tu nueva contraseña y luego confirmala.</p>
        <v-form v-model="validate" ref="form" style="width:100%;" class="d-flex justify-center flex-column align-center">
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
          <v-btn
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
// import { VueReCaptcha } from "vue-recaptcha-v3";
// Vue.use(VueReCaptcha, { siteKey: "6LftKP8UAAAAAFyn3w1cTjIgoizkGLxDB_d5GxBd" });
export default {
  data() {
    return {
      newContra: "",
      confirmContra: "",
      validate: true,
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
    this.onResize();
  },
  methods: {
    Submit() {
      if (this.$refs.form.validate()) {
        // if (this.newContra === this.confirmContra) {
        //   this.$recaptcha("contactus").then((token) => {
        //       console.log(token)
        //   });
        // } else {
        //   this.newContra = "";
        //   this.confirmContra = "";
        // }
      }
    },
    onResize(){
        const instance =this.$recaptchaInstance;
        this.$vuetify.breakpoint.xsOnly?instance.hideBadge():instance.showBadge()
    }
  },
};
</script>
