<script setup lang="ts">

import useLayoutSettingStore from "@/store/modules/setting.ts";
import {nextTick, ref, watch} from "vue";

let LayoutSettingStore = useLayoutSettingStore()

//控制肖前组件是否销毁重建
let flag = ref(true)

//监听仓库内部的数据是否发生变化，如果发生变化，说明用户点击过刷新按钮

watch(() => LayoutSettingStore.refresh, (newVal, oldVal) => {
  if (newVal != oldVal) {

    //点击刷新按钮：路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  }
})

</script>

<template>
<!--  添加 过渡动效 -->
  <router-view v-slot="{ Component }">
<!-- 渲染layout一级路由组件的子路由-->
    <transition name="fade">
      <component :is="Component"  v-if="flag"/>
    </transition>
  </router-view>
</template>

<style scoped>

.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>