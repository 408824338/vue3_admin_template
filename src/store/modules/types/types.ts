//定义小仓库数据state类型

import type {RouteRecordRaw} from "vue-router";
import type {CategoryObj} from "@/api/product/attr/type.ts";


// 路由对象接口  -腾讯生成
/*export interface RouteRecordRaw {
    path: string
    name?: string
    component?: any
    redirect?: string
    children?: RouteRecordRaw[]
}*/

export interface UserState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string
}

//定义分类仓库state对象的ts类型
export interface CategoryState {
    c1Id: string | number,
    c2Id: string | number,
    c3Id: string | number,
    c1Arr: CategoryObj[],
    c2Arr: CategoryObj[],
    c3Arr: CategoryObj[],

}