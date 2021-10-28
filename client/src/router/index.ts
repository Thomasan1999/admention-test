import Authors from '@/views/Authors.vue';
import Books from '@/views/Books.vue';
import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/autori',
        name: 'Authors',
        component: Authors
    },
    {
        path: '/knihy',
        name: 'Books',
        component: Books
    },
    {
        path: '*',
        redirect: {name: 'Authors'}
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
