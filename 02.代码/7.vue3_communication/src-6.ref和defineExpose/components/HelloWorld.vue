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
import {defineExpose} from 'vue'

const msg = 123;

const clickHandler = ()=>{
  console.log('clickHandler')
};

defineExpose({
  clickHandler
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
