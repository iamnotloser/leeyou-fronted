import {createApp} from 'vue'
import App from './App.vue'
import 'vant/lib/index.css';
import {createRouter, createWebHashHistory} from "vue-router";
import routes from "./config/route.ts";
import Vant from 'vant';


// createApp(App).mount('#app');
const app = createApp(App);



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
app.use(Vant)
    .use(router)
    .mount('#app');

