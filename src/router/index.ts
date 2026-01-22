//通过vue-router插件实现模板路由配置

import {createRouter, createWebHistory} from 'vue-router'
import {constantRoute} from "@/router/routes.ts";
//创建路由器
let router = createRouter({
    //路由模式:history(浏览器地址栏有记录),hash(浏览器地址栏无记录)
    history: createWebHistory(),
    routes: constantRoute,
    //滚动行为
    scrollBehavior(_to, _from, _savedPosition) {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router;