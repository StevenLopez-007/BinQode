<style >
    
</style>
<template>
    <div style="background-color:rgb(240, 239, 255);height:100vh;">
    <v-toolbar>
        <v-avatar size="60">
            <img src="../imagenes/icon.png">
        </v-avatar>
        <v-toolbar-title class="ma-2" style="font-family:Dosis; font-size:26px;letter-spacing:0.6px;color:rgb(62, 65, 109);">B1nQ0de</v-toolbar-title>
    </v-toolbar>
    <v-container class="d-flex align-center justify-center ma-0 pa-0" style="background-color:rgb(240, 239, 255); height:calc(100vh - 64px);">
        <div class="d-flex justify-center align-center flex-column justify-space-between" style="background-color:rgb(240, 239, 255);width:100%;">
            <h1 class="text-center tituloReset" >Restablecer contraseña</h1>
            <p class="text-center mb-12">Ingresa la <b>dirección de correo electronico</b> que usaste para registrarte. Enviaremos un correo con un enlace
                para que puedas restablecer tu contraseña.
            </p>
            <v-text-field  :rules="emailRules" v-model="email" style="width:60%;" solo  label="Dirección de correo electrónico" ></v-text-field>
            <v-btn width="250" height="50" rounded color="#aa4b6b" class="white--text mt-8">Enviar</v-btn>
        </div>
    </v-container>
</div>
</template>
<script>
export default {
    data(){
        return{
            email:'',
            emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) =>
          /^([a-zA-Z0-9_\.\-])+\@(([a-z-0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            v
          ) || "E-mail deber ser válido",
      ],
        }
    }
}
</script>