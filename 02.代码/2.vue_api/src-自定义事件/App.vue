<template>
  <div id="app">
    <!-- <HelloWorld :msg.sync="msg"/> -->
    <HelloWorld :msg="msg" @update:msg="(data)=>{msg = data}"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:"hello world"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.$bus.$emit('sendMsg',"我是APP的数据")
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
