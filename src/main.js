import App from './App.vue';
import { createApp } from 'vue';
import router from './router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next();
});
  
router.afterEach(() => {
    NProgress.done();
});

const app = createApp(App);
app.use(router);
app.use(NProgress);
app.mount('#app');
