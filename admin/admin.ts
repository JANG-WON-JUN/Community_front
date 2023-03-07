import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '/admin/adminApp.vue';
import router from './router';

import '../src/assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#adminApp');

// http://127.0.0.1:5173/admin/ 이렇게 접근해야 됨
// 다른 곳에서 href로 이동하면 될 듯! (router 말고)
