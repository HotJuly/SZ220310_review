<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {provide} from 'vue';

import HelloWorld from '@/components/HelloWorld'

provide("abc",666)

// provide("data",{
//   // 可以用对象一次性暴露多个数据
// })

</script>

<style>
</style>
