//书写品牌管理模块接口

//品牌管理模块接口地址
import request from "@/utils/request.ts";
import type {TradeMark} from "@/api/product/type.ts";

// @ts-ignore
enum API {
    //获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/', // {page}/{limit}

    //添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',

    //修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',

    //删除已有品牌
    DELETE_URL = '/admin/product/baseTrademark/remove/' //{id}
}

//获取一样偶品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据

export const reqHasTrademark = (page: number, limit: number) => {
    return request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
}

//添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    //修改已有品牌的数据
    if (data.id) {
        return request.put<any,any>(API.UPDATETRADEMARK_URL, data)

    } else {
        return request.post<any,any>(API.ADDTRADEMARK_URL, data)
    }
}

//删除操作
export const reqDeleteTrademark = (id:number)=>{
  return  request.delete<any,any>(API.DELETE_URL+id)
}