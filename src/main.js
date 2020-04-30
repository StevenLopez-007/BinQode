import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'
import axios from 'axios';
import firebase from 'firebase'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import "prismjs";
import "./themesCode/prism-shades.css";
import "./styles/animate.css"
const $ = require('jquery')
window.$ = $;
  
import Prism from "vue-prism-component";
import Swal from 'sweetalert2';
import ProgressBar from 'progressbar.js'

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
Vue.use(Vuetify,Swal,ProgressBar);
// Initialize Firebase

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
