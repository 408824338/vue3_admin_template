<script setup lang="ts" name="Breadcrumb" >

import {useRoute} from "vue-router";
//获取layout配置相关的仓库
import useLayoutSettingStore from "@/store/modules/setting.ts";

let LayoutSettingStore = useLayoutSettingStore()

//获取路由对象
let $route = useRoute()

console.log($route.matched)

//点击图标的切换
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<template>
  <!--      顶部左侧的图标  -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
<!--    <Expand/>-->
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand' "></component>
  </el-icon>
  <!-- 左侧面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <!--
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    -->
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path"  >
<!--      图标-->
      <el-icon> <component :is="item.meta.icon"></component></el-icon>
      <span>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>