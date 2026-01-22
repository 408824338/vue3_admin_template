//定义小仓库数据state类型

import type {RouteRecordRaw} from "vue-router";
// 路由对象接口  -腾讯生成
/*export interface RouteRecordRaw {
    path: string
    name?: string
    component?: any
    redirect?: string
    children?: RouteRecordRaw[]
}*/

export interface  UserState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username:string,
    avatar:string
}