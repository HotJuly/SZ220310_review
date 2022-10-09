<template>
  <div id="app">
    <h4>APP的text:{{text}}</h4>
    <HelloWorld msg="Welcome to Your Vue.js App" v-model="text"/>
    <!-- 以下代码是v-model的原理分析 -->
    <!-- <HelloWorld :value="text" @input="(data)=>{text = data}"/> -->


    <!-- <input type="text" v-model="text"> -->
    <!-- 以下代码是v-model的原理分析 -->
    <!-- <input type="text" :value="text" @input="(event)=>{text=event.target.value}"> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      text:"你好"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
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
