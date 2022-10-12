<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>msg:{{msg123}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>

const props = defineProps(["msg123"]);
const emits = defineEmits(["update:msg123"]);

setTimeout(()=>{
  // props.msg123=123
  emits('update:msg123','我是hello修改之后的数据')
},3000)

// console.log('props',props)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
