<template>
  <div id="app">
    <h1 v-pre>{{msg}}</h1>
    <h1 v-once>{{msg}}</h1>
    <h1>{{msg}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:"我是初始化的数据"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    setTimeout(()=>{
      this.msg="我是修改之后的数据"
    },2000)
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
