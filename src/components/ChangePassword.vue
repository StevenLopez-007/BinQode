<style >
    .tituloReset{
        font-size:48px ; 
        font-family:Dosis;
        color:rgb(62, 65, 109);
        border-bottom: none;
    }
    @media screen and (max-width: 600px) {
        .tituloReset{
            font-size:38px;
        }
    }
</style>
<template>
<div style="background-color:rgb(240, 239, 255);height:100vh;">
    <v-toolbar>
        <v-toolbar-title class="ma-2" style="font-family:Dosis; font-size:26px;letter-spacing:0.6px;color:rgb(62, 65, 109);">B1nQ0de</v-toolbar-title>
    </v-toolbar>
    <v-container class="d-flex align-center justify-center ma-0 pa-0" style="background-color:rgb(240, 239, 255); height:calc(100vh - 64px);">
        <div class="d-flex justify-center align-center flex-column justify-space-between" >
            <h1 class="text-center mb-12 tituloReset" >Volver a establecer contraseña</h1>
            <v-text-field v-model="newContra" style="width:80%;" solo  label="Nueva Contraseña" ></v-text-field>
            <v-text-field v-model="confirmContra" style="width:80%;" solo  label="Confirmar Contraseña" ></v-text-field>
            <v-btn width="250" height="50" rounded color="#00e676" class="white--text mt-8">Cambiar</v-btn>
        </div>
    </v-container>
</div>
</template>
<script>
export default {
    data(){
        return{
            newContra:'',
            confirmContra:''
        }
    },
    methods:{

    }
}
</script>