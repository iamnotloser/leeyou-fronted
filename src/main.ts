import {createApp} from 'vue'
import App from './App.vue'
import 'vant/lib/index.css';
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import routes from "./config/route.ts";
import Vant from 'vant';
import '../global.css'

// createApp(App).mount('#app');
const app = createApp(App);



const router = createRouter({
    history: createWebHistory(),
    routes,
})
app.use(Vant)
    .use(router)
    .mount('#app');

