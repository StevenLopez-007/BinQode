import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'
import axios from 'axios';
import VueCookies from 'vue-cookies'
import '@mdi/font/css/materialdesignicons.css'
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

import "./styles/darkTheme/darktheme.css"
import "./styles/darkTheme/swalDarkTheme.css"

import firebase from 'firebase/app'
import Prism from "vue-prism-component";
import Swal from 'sweetalert2';

const firebaseConfig = {
  apiKey: "AIzaSyBv_EyBYl1NrVVDboo-fXb33INQkxJfPks",
  authDomain: "usuariosb1nq0de.firebaseapp.com",
  databaseURL: "https://usuariosb1nq0de.firebaseio.com",
  projectId: "usuariosb1nq0de",
  storageBucket: "usuariosb1nq0de.appspot.com",
  messagingSenderId: "167354227550",
  appId: "1:167354227550:web:5a966e91bd8bba24eecdcf",
  measurementId: "G-J80PK4Q4V9"
};
firebase.initializeApp(firebaseConfig);
Vue.component("prism", Prism);

axios.defaults.baseURL='https://b1nc0de-api.herokuapp.com/'
Vue.config.productionTip = false;
Vue.use(Vuetify,Swal,VueCookies);



export default new Vuetify({
  icons: {
    // iconfont: 'md',
    iconfont:'fas'
  },
})
new Vue({
  router,
  store,
  vuetify,
  
  render: h => h(App)
}).$mount('#app')
