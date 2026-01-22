<script setup lang="ts">

import useUserStore from "@/store/modules/user.ts";
import {onMounted} from "vue";



let UserStore = useUserStore();

onMounted(() => {
  console.log(888888888);
  UserStore.userInfo();
})
</script>

<template>
home
</template>

<style scoped>

</style>