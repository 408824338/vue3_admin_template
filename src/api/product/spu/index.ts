//SPU管理模块的接口
import request from '@/utils/request'
import type {HasSpuResponseData} from "@/api/product/spu/type.ts";

enum API {
    //获取已有的SPU的数据
    HASSPU_URL = '/admin/product/' //{page}/{limit}
}


//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
    page: number,
    limit: number,
    category3Id: number
) => {
    return request.get<any,HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

}