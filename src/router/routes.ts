//对外暴露配置路由的函数

export const constantRoute = [
    {
        path: '/', component: () => import('@/layout/index.vue'), name: 'layout',
        meta: {title: "", hidden: false, icon: ""},
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {title: "首页", hidden: false, icon: "HomeFilled"}
            }
        ]
    },
    {
        path: '/login', component: () => import('@/views/login/index.vue'), name: 'login',
        meta: {
            title: "登录",
            hidden: true, //代表路由标题在菜单中是否隐藏 true 隐藏 false 不隐藏},
            icon: "Promotion"
        }

    },
    {
        path: '/404', component: () => import('@/views/404/index.vue'), name: '404',
        meta: {title: "404", hidden: true, icon: "DocumentDelete"}
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {title: "任意路由", hidden: true, icon: "DataLine"}
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta: {title: "数据大屏", hidden: false, icon: "Monitor"}
    },
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'acl',
        meta: {title: "权限管理", hidden: false, icon: "Key"},
        'children': [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'user',
                meta: {title: "用户管理", hidden: false, icon: "User"}
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'role',
                meta: {title: "角色管理", hidden: false, icon: "UserFilled"}
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'permission',
                meta: {title: "权限管理", hidden: false, icon: "Lock"}
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'product',
        meta: {title: "商品管理", hidden: false, icon: "Goods"},
        'children': [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'trademark',
                meta: {title: "品牌管理", hidden: false, icon: "ShoppingCartFull"}
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'attr',
                meta: {title: "属性管理", hidden: false, icon: "ChromeFilled"}
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'spu',
                meta: {title: "SPU管理", hidden: false, icon: "Calendar"}
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'sku',
                meta: {title: "SKU管理", hidden: false, icon: "Orange"}
            }

        ]
    }


]