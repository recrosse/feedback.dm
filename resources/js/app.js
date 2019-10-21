import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter);
Vue.use(BootstrapVue);

import App from './components/App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import TheContent from './components/TheContent.vue'

import TheContentFeedbackForm from './components/TheContentFeedbackForm.vue'
import TheContentThankyouForm from './components/TheContentThankyouForm.vue'

const router = new VueRouter({
    mode: 'history',
    base: '/',
    linkActiveClass: '',
    linkExactActiveClass: '',
    routes: [
        {
            path: '/',
            component: TheContent,
            children: [
                {
                    path: '/',
                    name: 'the-content-feedback-form',
                    component: TheContentFeedbackForm
                },
                {
                    path: '/feedback/thankyou',
                    name: 'the-content-thankyou-form',
                    component: TheContentThankyouForm
                },
            ]
        },

    ],
});

const app = new Vue({
    el: '#app',
    router,
    components: {App},
});