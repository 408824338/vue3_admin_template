//这里书写属性相关的API文件
import request from '@/utils/request'
import type {AttrObj, CategoryObj, CategoryResponseData} from "@/api/product/attr/type.ts";

//属性管理模块接口地址
enum API {
    //获取一级分类接口地址
    C1_URL = '/admin/product/getCategory1',
    //获取二级分类接口地址
    C2_URL = '/admin/product/getCategory2/',
    //获取三级分类接口地址
    C3_URL = '/admin/product/getCategory3/',

    //获取分类下已有的属性与属性值
    ATTR_URL = '/admin/product/attrInfoList/', //2/13/61

    //处理添加或者修改已有的属性请求
    SAVE_URL = '/admin/product/saveAttrInfo',

    //删除操作
    DEL_URL = '/admin/product/deleteAttr/' //{attrId}
}

//获取一级分类的接口方法
export const reqC1=()=>{
   return request.get<any,CategoryResponseData>(API.C1_URL)
}

//获取二级分类的接口方法
export const reqC2=(c1Id:number|string)=>{
   return request.get<any,CategoryResponseData>(API.C2_URL+c1Id)
}

//获取三级分类的接口方法
export const reqC3=(c2Id:number|string)=>{
   return request.get<any,CategoryResponseData>(API.C3_URL+c2Id)
}

//获取对应分类下已有的属性与属性值接口
export const reqAttr = (category1Id:number,category2Id:number,category3Id:number)=>{
   return request.get(API.ATTR_URL+`${category1Id}/${category2Id}/${category3Id}`)
}


//处理添加或者修改已有的属性请求
export const reqAddOrUpdateAttr = (data:AttrObj)=>{
    return request.post<any,any>(API.SAVE_URL,data)
}

//删除操作
export const reqRemoveAttr = (attrId:number)=>{
    return request.delete(API.DEL_URL+attrId)
}
