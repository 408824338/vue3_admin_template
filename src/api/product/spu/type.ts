//服务器全部接口返回的数据类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface SpuData{
    "id": number,
    "spuName": string,
    "description": string,
    "category3Id": number,
    "tmId": number,
    "spuImageList": null,
    "spuSaleAttrList": null
}

//SPU数据的ts类型:需要修改
export type Records = SpuData[]

//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData{
    data:{
        "total": number,
        "size": number,
        "current": number,
        "searchCount": boolean,
        "pages": number,
        records:Records
    }
}