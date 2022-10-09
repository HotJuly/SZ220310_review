<template>
  <div id="app">
    <!-- <h4>我是APP的数据:{{msg}}</h4>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/> -->
    <BigImage/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:123
    }
  },
  components: {
    HelloWorld,
    BigImage
  },
  mounted(){
    // console.log('msg',this.$data)
    // console.log('App',this.$children[0].msg)
    // this.$children[0].clickHandler();

    // console.log(this.$refs.hello)
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
