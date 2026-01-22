<script setup lang="ts">
//引入配置标题与logo的文件
import setting from '@/setting.ts'
</script>

<template>
<div class="logo">
<!--  <img src="../../../../public/logo.png" alt="" />-->
  <img :src="setting.logo" alt=""  v-if="setting.logoHidden"/>
  <p>{{ setting.title }}</p>
</div>
</template>

<style scoped lang="scss">
.logo{
  width: 100%;
  height:$base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  img{
    width: 40px;
    height: 40px;

  }
  p{
    font-size: $base-menu-logo-text-size;
    margin-left: 10px;
  }
}
</style>