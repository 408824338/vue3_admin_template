<script setup lang="ts">


import type {
  AllTradeMark,
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg, TradeMark
} from "@/api/product/spu/type.ts";
import {reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList} from "@/api/product/spu";
import {ref} from "vue";

let $emit = defineEmits(['changeScene'])
//点击取消按钮:通知父组件切换场景为1,展示有的SPU的数据
const cancel = () => {
  $emit('changeScene', 0)
}

//存储已有的SPU这些数据
let AllTradeMark = ref<TradeMark[]>([])

const initHasSpuData = async (spu: SpuData) => {
  //spu:即为父组件传递过来的已有的SPU对象[不完整]
  //获取全部品牌的数据
  let result:AllTradeMark = await reqAllTradeMark()

  //获取某一个品牌旗下全部售卖商品的图片
  let result1:SpuHasImg = await reqSpuImageList(spu.id)

  //获取已有的SPU销售属性的数据
  let result2:SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id)

  //获取整个项目全部SPU的销售属性
  let result3:HasSaleAttrResponseData = await reqAllSaleAttr()

  //存储全部品牌的数据
  AllTradeMark.value = result.data

}

//对外暴露
defineExpose({initHasSpuData})
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
          v-model:file-list="fileList"
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          ?>
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dislogImageUrl" alt="Preview Image"/>
      </el-dialog>
    </el-form-item>

    <el-form-item label="spu销售属性" size="normal">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
      <el-button
          style="margin-top: 10px;"
          type="primary"
          size="default"
          icon="Plus"
      >
        添加属性
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px">
        <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
        ></el-table-column>
        <el-table-column
            label="销售属性名字"
            width="120px"
            prop="saleAttrName"></el-table-column>

        <el-table-column label="销售属性值">
          <!-- row:即为当前SPU已有的销售属性对象 -->
        </el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>