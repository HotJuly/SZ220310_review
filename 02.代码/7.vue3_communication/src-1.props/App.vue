<template>
  <HelloWorld :msg="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import { ref } from 'vue';

import HelloWorld from '@/components/HelloWorld';

const msg = ref("我是APP的初始化数据")

</script>

<style>
</style>
