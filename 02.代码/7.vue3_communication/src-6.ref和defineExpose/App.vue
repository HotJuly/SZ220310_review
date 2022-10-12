<template>
  <HelloWorld ref="hello111"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref,onMounted} from 'vue'
import HelloWorld from '@/components/HelloWorld'

const hello111 = ref();
// console.log(hello111.value)

onMounted(()=>{
  console.log('msg',hello111.value.msg)
  console.log('clickHandler',hello111.value.clickHandler)
  hello111.value.clickHandler();
})
</script>

<style>
</style>
