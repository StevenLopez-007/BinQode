import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'
import axios from 'axios';
import VueCookies from 'vue-cookies'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

import "prismjs";
import "prismjs/components/prism-textile";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-powershell";

import "./themesCode/prism-shades.css";

// estilos
import "./styles/fonts.scss"

import "./styles/stylesmin/bienvenida.min.scss"
import "./styles/stylesmin/categorias.min.scss"
import "./styles/stylesmin/cuestionario.min.scss"
import "./styles/stylesmin/home.min.scss"
import "./styles/stylesmin/introduccionmodulo.min.scss"
import "./styles/stylesmin/login.min.scss"
import "./styles/stylesmin/modulos.min.scss"
import "./styles/stylesmin/app.min.scss"
import "./styles/stylesmin/perfil.min.scss"

import "./styles/darkTheme/darktheme.css"
// import "./styles/perfil.scss"
// ///////////////////

import firebase from 'firebase/app'
import Prism from "vue-prism-component";
import Swal from 'sweetalert2';
// import '@sweetalert2/theme-dark/dark.scss';

var firebaseConfig = {
  apiKey: "AIzaSyB7FFfnuq_ixg0PG7Q174zWiRweqCP17EU",
  authDomain: "binqode.firebaseapp.com",
  databaseURL: "https://binqode.firebaseio.com",
  projectId: "binqode",
  storageBucket: "binqode.appspot.com",
  messagingSenderId: "451851274451",
  appId: "1:451851274451:web:4e27b6e9135a7c84b5ac26",
  measurementId: "G-CPPRMHR01W"
};
firebase.initializeApp(firebaseConfig);
Vue.component("prism", Prism);

axios.defaults.baseURL='https://b1nc0de-api.herokuapp.com/'
Vue.config.productionTip = false;
Vue.use(Vuetify,Swal,VueCookies);



export default new Vuetify({
  icons: {
    // iconfont: 'md',
    iconfont:'fa'
  },
})
new Vue({
  router,
  store,
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
