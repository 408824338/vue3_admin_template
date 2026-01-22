<script setup lang="ts" name="Menu">


import {useRouter} from "vue-router";

let $router = useRouter()
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])

const goRoute = (vc: any) => {
  //路由跳转
  $router.push(vc.index)
}
</script>

<script lang="ts">


</script>

<template>
  <!--
  <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">数据大屏</el-menu-item>
    &lt;!&ndash;          折叠菜单&ndash;&gt;
    <el-sub-menu index="3">
      <template #title>
        <span>权限管理x</span>
      </template>
      <el-menu-item index="3-1">用户管理</el-menu-item>
      <el-menu-item index="3-2">角色管理</el-menu-item>
      <el-menu-item index="3-3">菜单管理</el-menu-item>
    </el-sub-menu>
    -->

  <template v-for="(item,index) in menuList" :key="item.path">
<!--    没有子路由-->

    <template  v-if="!item.children">
      <el-menu-item :index="item.path" v-if="item.meta.hidden==false" @click="goRoute">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>


    </template>


<!--    只有一个孩子的情况-->
    <template v-if="item.children && item.children.length == 1" >
      <el-menu-item :index="item.children[0].path" v-if="item.children[0].meta.hidden==false">
        <el-icon><component :is="item.children[0].meta.icon"></component></el-icon>
        <template #title>
          <span>{{item.children[0].meta.title}}</span>
        </template>
      </el-menu-item>

    </template>


<!--    有两个孩子的情况-->
    <template v-if="item.children && item.children.length > 1">

      <el-sub-menu :index="item.path" v-if="item.meta.hidden==false" >

        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{item.meta.title}}</span>
        </template>
        <Menu :menuList="item.children"/>
      </el-sub-menu>
    </template>


  </template>
</template>

<style scoped>

</style>