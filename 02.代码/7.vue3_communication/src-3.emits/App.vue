<template>
  <HelloWorld @aaa="handler"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

/*
  在Vue3中,自定义事件相关发生了巨大变化
  $on,$once,$off,$emit全部失效
*/

const handler = (data)=>{
  console.log('handler',data)
}

</script>

<style>
</style>
