<script setup lang="ts" name="Setting">

//使用pinia仓库
import useLayoutSettingStore from "@/store/modules/setting.ts";
import useUserStore from "@/store/modules/user.ts";

import {useRouter,useRoute} from "vue-router";

let $router = useRouter()
let $route = useRoute()

let userStore = useUserStore()
let LayoutSettingStore = useLayoutSettingStore()
const updateRefresh = () => {

  LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}

//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  //切换成全屏
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
  LayoutSettingStore.fullScreen = !LayoutSettingStore.fullScreen
}


const logout = () => {
  //第一件事：需要项服务器发请求【退出登录接口】（我们这里没有）
  //第二件事：仓库当中和关于用户的相关的数据清空
  userStore.userLogout()
  //第三件事：跳转到登陆页面
  $router.push({path: '/login',query:{redirect:$route.path}})
}


</script>

<template>
  <el-button type="primary" size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button type="primary" size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button type="primary" size="small" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 24px;height: 24px;margin:0px 10px" />
  <!--      下拉菜单 -->
  <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-item  @click="logout">退出登录</el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>