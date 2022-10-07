<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <h1 v-if="isShow">我是h1</h1>
    <h2 v-else>我是h2</h2>

    <input ref="input777" v-if="isEdit" type="text">
    <button v-else @click="changeEdit">添加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      isShow:true,
      isEdit:false
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    // this.isShow=false;
    // console.log('isShow',this.isShow)
    // debugger
    /*
      问题1:请问Vue更新数据是同步更新还是异步更新?
      答案:同步更新
    
      问题2:请问Vue更新DOM是同步更新还是异步更新?
      答案:异步更新,其实就是使用了nextTick更新DOM的
    */

    // this.isEdit = true;
    // // 如果这里有一个看不见的nextTick,一切就说通了

    // Promise.resolve().then(()=>{
    //   console.log('1');
    // })

    // this.$nextTick(()=>{
    //   console.log('2')
    // })

    // Promise.resolve().then(()=>{
    //   console.log('3');
    // })

    // this.$nextTick(()=>{
    //   console.log('4')
    // })
  },
  methods:{
    changeEdit(){

      this.isEdit=true;
      
      this.$nextTick(()=>{
        this.$refs.input777.focus();
      })

      // nextTick接收一个回调函数,该回调函数会在DOM更新之后执行
      // 也就是说在nextTick中可以获取到当前最新的DOM节点
      // nextTick是一个微任务
      // 注意:Vue的nextTick内部使用的是.then,与node的nextTick不是同一个
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
