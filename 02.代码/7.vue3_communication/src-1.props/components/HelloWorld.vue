<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
// import {defineProps} from 'vue';
  const props = defineProps(["msg"]);
  console.log('props',props)

  // defineProps<{
  //   msg:String
  // }>();
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
