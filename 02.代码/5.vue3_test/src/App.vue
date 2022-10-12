<template>
  <!-- <h1>{{msg}}</h1> -->
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <ul>
    <li v-for="item in arr1" :key="item">{{item}}</li>
  </ul>
  <h1>name:{{user.name}}</h1>
  <h1>age:{{user.age}}</h1>
  <h1>sex:{{user.sex}}</h1>
  <button @click="change">将2修改为6</button>
  <button @click="change1">添加sex</button>
  <button @click="change2">删除age</button>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {reactive} from 'vue'
/*
  setup标签和setup配置选项的区别
    1.在setup标签中引入组件,可以不需要注册,直接在template中可以使用
    2.setup标签会将内部所有的直系变量直接暴露出去,给template使用,不需要return对象

*/

const arr = [1,2,3,4,5];
const arr1 = reactive(arr);

const obj= {
  name:"xiaoming",
  age:18
}
const user = reactive(obj);

const change = ()=>{
  // 一下写法,在Vue2中没有响应式效果,但是Vue3中有
  // Vue2中不能直接操作数组的下标,必须通过重写七种方法来操作,才能显示最新DOM
  arr1[1] = 6;
}

const change1 = ()=>{
  // 一下写法,在Vue2中没有响应式效果,但是Vue3中有
  // Vue2中,给某个对象添加新的属性,是没有响应式效果的,必须使用Vue.set方法才行
  user.sex = "男"
}
const change2 = ()=>{
  // 一下写法,在Vue2中没有响应式效果,但是Vue3中有
  // Vue2中,给某个对象删除某个属性,是没有响应式效果的,必须使用Vue.delete方法才行
  delete user.age
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
