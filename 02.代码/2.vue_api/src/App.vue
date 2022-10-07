<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>name:{{user.name}}</h1>
    <h1>age:{{user.age}}</h1>
    <h1>sex:{{user.sex}}</h1>
    <button @click="clickHandler">展示性别</button>
    <button @click="clickHandler1">隐藏年龄</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      user: {
        name: "xiaoming",
        age: 18
      }
    }
  },
  methods: {
    clickHandler() {
      // 响应式属性:当属性值发生修改之后,页面会展示出最新的结果
      /*
        响应式属性创建时机:
          1.当组件初始化的时候,data中返回对象中的所有属性都将是响应式的
          2.当响应式属性值发生修改的时候,赋值的数据是一个对象的话,
            那么该对象中的所有属性都将是响应式的
      
      */
      // this.user.sex = "女";
      // this.user = {
      //   ...this.user,
      //   sex:"女"
      // }


      this.user = {
        ...this.user
      }
      // Vue.set()
      this.$set(this.user,"sex","女");
      // this.user.sex = "女";
      console.log(this.user);

      setTimeout(()=>{
        this.user.sex = "男";
        console.log(this.user);
      },2000)
    },
    clickHandler1(){
      // delete this.user.age;
      // this.$delete除了拥有delete关键字的功能,还会导致页面重新渲染
      this.$delete(this.user,"age")
      console.log(this.user)
    }
  },
  mounted(){
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
