<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" :a="$options.a" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" :a="a" />
    <!-- <h1>name:{{user.name}}</h1> -->
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
    <h2>doubleNum:{{doubleNum}}</h2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

// function a(data){
//   console.log(this,data)
// }

export default {
  name: 'App',
  data() {
    return {
      // a:1,
      // 面试题:我现在有一个数据想要放在data中,但是又不希望他有响应式的效果
      // _bbc:2,
      // user:Object.freeze({
      //   name:"123",
      // })
      num: 2
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    // console.log(this.a,this._bbc)
    // this.user = Object.freeze({
    //     name:"123"
    // })
    // setTimeout(() => {
    //   this.user.name=666
    // }, 2000);
  },
  a(data) {
    console.log(this, data)
    this.num = data;
  },
  methods: {
    a(data) {
      // methods中的方法,this都会被使用bind方法强行指定为当前组件实例对象
      // 简单点说:就是方法写在谁的methods中,this就一定是谁

      console.log(this, data)
      this.num = data;
    }
  },
  computed: {
    doubleNum() {
      console.log('1')
      return this.num * 2;
    }
  },
  watch: {
    num() {
      console.log('num你飘了')
    },
    // user(){
    //watch是浅监听
    // }
    user: {
      handler() {
        // 这种写法就是深度监视,无论是user属性发生变化,还是user内部的某个属性发生变化都会监视的到
      },
      deep: true,
      immediate:true
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
