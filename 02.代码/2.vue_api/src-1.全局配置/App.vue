<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <About></About> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

// 这个是配置对象,他的构造函数是Object,不是组件实例对象
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  a:124,
  mounted(){
    // console.log('App',this.$options.a)
    // console.log(c)
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
