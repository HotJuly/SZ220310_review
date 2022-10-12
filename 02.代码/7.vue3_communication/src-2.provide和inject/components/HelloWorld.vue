<template>
  <div class="hello">
    <h1>hello</h1>
    <h2>inject:{{result}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {inject} from 'vue';

const result = inject('abc');
console.log(result)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
