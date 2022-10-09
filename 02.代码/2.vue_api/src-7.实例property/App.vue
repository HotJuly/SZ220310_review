<template>
  <div id="app">
    <!-- <h4>我是APP的数据:{{msg}}</h4>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/> -->
    <!-- <BigImage/> -->
    <!-- <el-button type="danger" size="big">添加按钮</el-button> -->
    <!-- <el-button v-bind="{
      type:'danger',
      size:'big'
    }">添加按钮</el-button> -->

    <!-- <h1 @click="click"></h1> -->

    <!-- <el-button @click="click1">添加按钮</el-button> -->
    <!-- <el-button v-on="{
      click:click1
    }">添加按钮</el-button> -->

    
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
  },
  methods:{
    click1(){
      console.log('click1')
    }
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
