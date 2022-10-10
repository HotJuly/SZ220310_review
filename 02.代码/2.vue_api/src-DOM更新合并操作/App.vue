<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>{{arr[0]}}</h1> -->
    <h1 v-if="isShow1" ref="a">1</h1>
    <h2 v-if="isShow2" ref="b">2</h2>
    <h3>3</h3>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      // arr:[1,2,3]
      isShow1:false,
      isShow2:false
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   // this.arr[0]=6;
    //   // console.log('arr',this.arr)
    //   this.arr.splice(0,1,6)
    //   console.log('arr',this.arr)
    // },2000)

    // var arr = [3,4,5];

    // setTimeout(()=>{
    //   this.arr[0]=6;

    //   arr.splice(0,1,6);
    //   console.log('arr',arr)
    // },2000)

    // Vue2中更新DOM,是以组件为单位的,也就是说整个组件所有的DOM更新,合并为一次
    // 如果在nextTick之前进行了响应式数据的更新,那么后续的nextTick一定能拿到当前组件所有的最新DOM
    
    this.isShow1 = true;
    
    this.$nextTick(()=>{
      console.log('a',this.$refs.a)
      console.log('b',this.$refs.b)
    })
    

    this.isShow2 = true;


  },
  methods:{
    a(){

    }
  },
  computed:{
    bbb(){
      
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
