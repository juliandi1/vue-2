import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard.index',
        component: () => import('@/views/Dashboard/DashboardIndex.vue'),
        meta: {
            main_menu: 'Dashboard',
            title: 'Dashboard'
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/UserLayout.vue'),
        children: [
            {
                path: '',
                name: 'user.index',
                component: () => import('@/views/User/UserIndex.vue'),
                meta: {
                    main_menu: 'User',
                    sub_menu: 'Lists',
                    parent: 'user',
                    title: 'User List'
                }
            },
            {
                path: 'create',
                name: 'user.create',
                component: () => import('@/views/User/UserCreate.vue'),
                meta: {
                    main_menu: 'User',
                    sub_menu: 'Create',
                    parent: 'user',
                    title: 'Add User'
                }
            },
            {
                path: 'detail/:id',
                name: 'user.detail',
                component: () => import('@/views/User/UserDetail.vue'),
                meta: {
                    main_menu: 'User',
                    sub_menu: 'Detail',
                    parent: 'user',
                    title: 'Add User'
                }
            },
        ] 
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('@/views/Error/ErrorLayout.vue'),
        children: [
            {
                path: '500',
                name: 'error.500',
                component: () => import('@/views/Error/Error_500.vue'),
                meta: {
                    parent: 'error',
                    title: 'Error'
                }
            },
        ] 
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/Error/Error_404.vue'),
        meta: {
            parent: 'error',
            title: 'Error'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;