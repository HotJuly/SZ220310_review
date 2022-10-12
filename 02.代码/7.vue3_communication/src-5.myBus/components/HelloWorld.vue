<template>
  <div class="hello">
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {onMounted} from 'vue';
import myBus from '@/myBus';

onMounted(()=>{
  myBus.on('sendMsg',(data)=>{
    console.log('hello',data)
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
