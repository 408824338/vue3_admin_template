<script setup lang="ts">

import Category from "@/components/Category/index.vue";

import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'

import {ref, watch} from "vue";

//定义card组件内容切换变量
let scene = ref<number>(1) //scene=0,显示table,scene=1,展示添加与修改属性结构

import userCategoryStore from "@/store/modules/category.ts";
import {reqHasSpu} from "@/api/product/spu";
import type {HasSpuResponseData} from "@/api/product/spu/type.ts";

let categoryStore = userCategoryStore()

let records = ref([])

//当前页码
let pageNo = ref<number>(1)

//每一页展示的数据
let pageSize = ref<number>(3)

//存储已有品牌数据总数
let total = ref<number>(0)


const getHasSpu = async (pager = 1) => {
  //当前页码
  pageNo.value = pager

  let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)

  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  getHasSpu()
}

//监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  //当三级分类发生变化的时候清空对应的数据
  records.value = []
  //务必保证有三级分类ID
  if (!categoryStore.c3Id) return
  getHasSpu()
})

//添加新的SPU按钮的回调
const addSpu = ()=>{
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value =1
}

//修改已有的SPU的按钮的回调
const updateSpu = () => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
}

//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (obj:any)=>{
  //子组件Spuform点击取消变为场景0:展示已有的SPU
  scene.value = obj

}

</script>

<template>
  <!-- 三级分类全局组件-->
  <category :scene="scene"/>

  <div v-show="scene == 0">
    <el-card style="margin:10px">
      <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false: true">添加SPU
      </el-button>
      <el-table border style="margin:10px" :data="records">
        <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="SPU操作">
          <!-- row:即为已有的SPU对象 -->
          <template #="{row,index}">
            <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
            <el-button type="primary" size="small" icon="Edit" title="修改SKU"></el-button>
            <el-button type="primary" size="small" icon="View" title="查看SKU列表"></el-button>
            <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
              </template>

            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-size="[3,5,7,9]"
        :background="true"
        layout=" prev,pager,next,jumper,->sizes,total"
        :total="total"
        @current-change="getHasSpu"
        @size-change="changeSize"
    />

  </div>

  <SpuForm v-show="scene == 1" @changeScene="changeScene"></SpuForm>
  <SpuForm v-show="scene == 3"></SpuForm>

</template>

<style scoped>

</style>