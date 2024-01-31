import { createApp } from 'vue';
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router.js';
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";


loadFonts()
const app = createApp(App);
app.use(MotionPlugin);
app.use(vuetify);
app.use(router);
app.use(store)
app.mount('#app');
