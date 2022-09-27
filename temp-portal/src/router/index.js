import {createRouter,createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        name: 'Home',
        path: '/',
        meta: {
            title: '首页',
        },
        component: () => import('../views/Home.vue'),
        children: [
            {
                name: 'Welcome',
                path: '/',
                meta: {
                    title: '欢迎',
                },
                component: () => import('../views/Welcome.vue'),
            },
            {
                name: 'Login',
                path: '/login',
                meta: {
                    title: '登录',
                },
                component: () => import('../views/Login.vue'),
            }
            ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
