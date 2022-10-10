<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{arr[0]}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      arr:[1,2,3]
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   // this.arr[0]=6;
    //   // console.log('arr',this.arr)
    //   this.arr.splice(0,1,6)
    //   console.log('arr',this.arr)
    // },2000)

    var arr = [3,4,5];

    setTimeout(()=>{
      this.arr[0]=6;
      
      arr.splice(0,1,6);
      console.log('arr',arr)
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
