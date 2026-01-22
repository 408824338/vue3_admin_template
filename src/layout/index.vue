<script setup lang="ts">
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'

import {useRoute} from "vue-router";

//引入菜单组件
import Menu from './menu/index.vue'

//右侧内容展示区
import Main from './main/index.vue'

//获取用户相关的小仓库
import useUserStore from "@/store/modules/user.ts";
import useLayoutSettingStore from '@/store/modules/setting.ts'

//获取layout配置仓库
let LayoutSettingStore = useLayoutSettingStore()

//引入顶部tabbar
import Tabbar from './tabbar/index.vue'

let UserStore = useUserStore()

let $route = useRoute()

console.log($route.path)

</script>

<template>
  <div class="layout_container">
    <!--     左侧菜单-->
    <div class="layout_slider" :class="{fold: LayoutSettingStore.fold ? true: false}">
      <Logo/>
      <!--       展示菜单-->
      <el-scrollbar class="scrollbar">

        <!--         滚动组件-->
        <el-menu
            background-color="#001529"
            text-color="#fff"
            :default-active="$route.path"
            :collapse="LayoutSettingStore.fold"
        >
            <!--根据路由动态生成菜单-->
            <Menu :menuList="UserStore.menuRoutes"/>
        </el-menu>
      </el-scrollbar>
    </div>

    <!--     顶部导航-->
    <div class="layout_tabbar" :class="{fold: LayoutSettingStore.fold ? true : false}">
      <!-- layout组件的顶部导航tabbar -->
        <Tabbar/>
    </div>
    <!--     内容展示区域-->
    <div class="layout_main" :class="{fold: LayoutSettingStore.fold ? true : false}">
        <Main/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bg-color;

    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none
      }
    }

    &.fold {
      width: $base-menu-min-width
    }

  }


  .layout_tabbar {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: $base-header-height;
    top: 0px;
    left: $base-menu-width;

    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left :$base-menu-min-width
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-header-height);
    background-color: yellow;
    left: $base-menu-width;
    top: $base-header-height;
    padding: 20px;
    overflow: auto;

    transition: all 0.3s;
    &.fold {
     width: calc(100vw - $base-menu-min-width);
      left:$base-menu-min-width;
    }
  }


}
</style>