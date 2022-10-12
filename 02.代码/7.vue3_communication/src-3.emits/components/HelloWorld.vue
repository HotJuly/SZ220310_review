<template>
  <div class="hello">
    <h1 @click="clickHandler">hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
/*
  在Vue3中,由于props和自定义事件使用频率极高
    经常需要引入defineProps和defineEmits,所以Vue3官方将这两个API,注册成为全局编译宏
    简单点说,就是将这两个API内置了,不需要引入
*/
const emits = defineEmits(["aaa"]);

const clickHandler = ()=>{
  // this.$emit('aaa',123)
  emits('aaa',678)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
