<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <p>我是默认插槽</p>
      </template>
      <template v-slot:header>
        <p>我是具名插槽,header</p>
      </template>
      <template v-slot:footer="scope">
        <p>{{scope.msg}},我是作用域插槽,footer</p>
      </template>
    </HelloWorld> -->
    <BigImage>
      <!-- <template v-slot="scope"> -->
      <template v-slot="{click}">
        <!-- <h1 v-on="scope">点我放大</h1> -->
        <h1 @click="click">点我放大</h1>
        <!-- <h1 @click="showBig">点我放大</h1> -->
      </template>
      
    </BigImage>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
