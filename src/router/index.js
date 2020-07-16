import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "../views/Index.vue"
import Result from "../views/Result.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/result',
        name: 'result',
        component: Result
    }
]

const router = new VueRouter({
    routes
})

export default router
