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


import "./styles/animate.css"
import firebase from 'firebase/app'
  
import Prism from "vue-prism-component";
import Swal from 'sweetalert2';

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
