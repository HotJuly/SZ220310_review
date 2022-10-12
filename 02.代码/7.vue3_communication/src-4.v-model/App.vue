<template>
  <h1>APP的msg:{{msg}}</h1>
  <HelloWorld v-model:msg123="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref} from 'vue';

const msg = ref('我是APP的数据');
</script>

<style>
</style>
