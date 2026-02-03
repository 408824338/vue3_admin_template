//商品分类全局组件的小仓库

//创建用户相关的小仓库
import {defineStore} from 'pinia'
import {reqC1, reqC2, reqC3} from "@/api/product/attr";
import type {CategoryState} from "@/store/modules/types/types.ts";

const userCategoryStore = defineStore('Category', {

    state: (): CategoryState => {
        return {
            //存储一级分类的数据
            c1Arr: [],
            c2Arr: [],
            c3Arr: [],
            //存储一级分类的ID
            c1Id: '',
            c2Id: '',
            c3Id: '',
        }
    },
    actions: {
        //获取一级分类的方法
        async getC1() {
            //发请求获取一级分类的数据
            const result = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        //获取二级分类的数据
        async getC2() {
            console.log('c1Id',this.c1Id)
            //发请求获取二级分类的数据
            const result = await reqC2(this.c1Id)
            if (result.code == 200) {
                this.c2Arr = result.data
            }
        },
        //获取三级分类的数据
        async getC3() {
            //发请求获取二级分类的数据
            const result = await reqC3(this.c2Id)
            if (result.code == 200) {
                this.c3Arr = result.data
            }
        }
    }
})

export default userCategoryStore