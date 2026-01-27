<script setup lang="ts">

//引入分类相关的仓库
import userCategoryStore from "@/store/modules/category.ts";

let categoryStore = userCategoryStore()

//分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据


</script>

<template>
  <el-card>
  <el-form inline>
    <el-form-item label="一级分类">
      <el-select>
        <el-option label="北京"></el-option>
        <el-option label="深圳"></el-option>
        <el-option label="广州"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select>
        <el-option label="北京"></el-option>
        <el-option label="深圳"></el-option>
        <el-option label="广州"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select>
        <el-option label="北京"></el-option>
        <el-option label="深圳"></el-option>
        <el-option label="广州"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<style scoped>

</style>