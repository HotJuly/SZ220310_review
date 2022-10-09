<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>pageX:{{pageX}}</h1>
    <h1>pageY:{{pageY}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import test from '@/mixins/test';
import moveMixin from '@/mixins';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mixins:[test,moveMixin],
  mounted(){
    // console.log('App',this.pageX,this.pageY)
    this.testAPI();
  },
  watch:{
    // pageX(newValue){
    //   console.log('newValue',newValue)
    // }
  },
  methods:{
    testAPI(){
      console.log('APP')
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
