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
                path: 'edit/:id',
                name: 'user.edit',
                component: () => import('@/views/User/UserEdit.vue'),
                meta: {
                    main_menu: 'User',
                    sub_menu: 'Edit',
                    parent: 'user',
                    title: 'Edit User'
                }
            },
            {
                path: 'order/:id',
                name: 'user.order',
                component: () => import('@/views/User/UserOrder.vue'),
                meta: {
                    main_menu: 'User',
                    sub_menu: 'Order',
                    parent: 'user',
                    title: 'User Order'
                }
            },
        ] 
    },
    {
        path: '/product',
        name: 'product',
        component: () => import('@/views/Product/ProductLayout.vue'),
        children: [
            {
                path: '',
                name: 'product.index',
                component: () => import('@/views/Product/ProductIndex.vue'),
                meta: {
                    main_menu: 'Product',
                    sub_menu: 'Lists',
                    parent: 'product',
                    title: 'Product List'
                }
            },
            {
                path: 'create',
                name: 'product.create',
                component: () => import('@/views/Product/ProductCreate.vue'),
                meta: {
                    main_menu: 'Product',
                    sub_menu: 'Create',
                    parent: 'product',
                    title: 'Add Product'
                }
            },
            {
                path: 'edit/:id',
                name: 'product.edit',
                component: () => import('@/views/Product/ProductEdit.vue'),
                meta: {
                    main_menu: 'Product',
                    sub_menu: 'Edit',
                    parent: 'product',
                    title: 'Edit Product'
                }
            },
        ] 
    },
    {
        path: '/status',
        name: 'status',
        component: () => import('@/views/Status/StatusLayout.vue'),
        children: [
            {
                path: '',
                name: 'status.index',
                component: () => import('@/views/Status/StatusIndex.vue'),
                meta: {
                    main_menu: 'Status',
                    sub_menu: 'Lists',
                    parent: 'status',
                    title: 'Status List'
                }
            },
            {
                path: 'create',
                name: 'status.create',
                component: () => import('@/views/Status/StatusCreate.vue'),
                meta: {
                    main_menu: 'Status',
                    sub_menu: 'Create',
                    parent: 'status',
                    title: 'Add Status'
                }
            },
            {
                path: 'edit/:id',
                name: 'status.edit',
                component: () => import('@/views/Status/StatusEdit.vue'),
                meta: {
                    main_menu: 'Status',
                    sub_menu: 'Edit',
                    parent: 'status',
                    title: 'Edit Status'
                }
            },
        ] 
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order/OrderLayout.vue'),
        children: [
            {
                path: '',
                name: 'order.index',
                component: () => import('@/views/Order/OrderIndex.vue'),
                meta: {
                    main_menu: 'Order',
                    sub_menu: 'Lists',
                    parent: 'order',
                    title: 'Order List'
                }
            },
            {
                path: 'edit/:id',
                name: 'order.edit',
                component: () => import('@/views/Order/OrderEdit.vue'),
                meta: {
                    main_menu: 'Order',
                    sub_menu: 'Edit',
                    parent: 'order',
                    title: 'Edit order'
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
    routes: routes,
});

export default router;