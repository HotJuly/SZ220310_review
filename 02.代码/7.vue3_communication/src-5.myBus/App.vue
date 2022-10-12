<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {onMounted} from 'vue';
import HelloWorld from '@/components/HelloWorld'
import myBus from '@/myBus';

onMounted(()=>{
  myBus.emit('sendMsg',"你好,我是APP")
})

</script>

<style>
</style>
