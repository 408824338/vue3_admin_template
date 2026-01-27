//这里书写属性相关的API文件
import request from '@/utils/request'
//属性管理模块接口地址
enum API {
    //获取一级分类接口地址
    C1_URL = '/admin/product/getCategory1',
    //获取二级分类接口地址
    C2_URL = '/admin/product/getCategory2/',
    //获取三级分类接口地址
    C3_URL = '/admin/product/getCategory3/',
}

//获取一级分类的接口方法
export const reqC1=()=>{
    request.get<any,any>(API.C1_URL)
}

//获取二级分类的接口方法
export const reqC2=()=>{
    request.get<any,any>(API.C1_URL)
}

//获取\三级分类的接口方法
export const reqC3=()=>{
    request.get<any,any>(API.C1_URL)
}