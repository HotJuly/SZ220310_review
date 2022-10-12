<template>
  <HelloWorld>
    <!-- <template v-slot:default> -->
    <template #default>
      <h1>我是默认插槽</h1>
    </template>
    <template #header>
      <h1>我是具名插槽,header</h1>
    </template>
    <template #footer="scope">
      <h1>我是作用域插槽,{{scope.msg}}</h1>
    </template>
  </HelloWorld>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

</script>

<style>
</style>
