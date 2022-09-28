import {createRouter,createWebHashHistory} from 'vue-router'


const routes = [
    {
        name: 'Home',
        path: '/',
        meta: {
            title: '首页',
        },
        component: () => import('../components/Home.vue'),
        redirect: '/welcome',
        children: [
            {
                name: 'Welcome',
                path: '/welcome',
                meta: {
                    title: '欢迎',
                },
                component: () => import('../views/welcome/index.vue'),
            },

            ]
    },
    {
        name: 'Login',
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/login/index.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
