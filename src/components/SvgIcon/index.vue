<script setup lang="ts">

defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: {
    type: String,
    default: 'shop'
  },
  'color': {
    type: String,
    default: ''
  },
  'width': {
    type: String,
    default: '16px'
  },
  'height':{
    type: String,
    default: '16px'
  }
})
</script>

<template>
  <svg>
    <use :xlink:href="prefix + name" :fill="color" :width="width" :height="height"></use>
  </svg>
</template>

<style scoped>

</style>