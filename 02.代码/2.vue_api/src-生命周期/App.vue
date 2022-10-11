<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
      msg:"我是初始化的数据"
    }
  },
  beforeCreate(){
    console.log('----------App beforeCreate--------')
    // console.log('----------beforeCreate--------',this,this.$data,this.msg,this.$el)
  },
  created(){
    console.log('----------App created--------')
    // console.log('----------created--------',this,this.$data,this.msg,this.$el)
  },
  beforeMount(){
    // console.log('----------beforeMount--------',this,this.$data,this.msg,this.$el)
    // $vnode存放的是父组件的虚拟DOM,_vnode存放的是当前组件的虚拟DOM
    // console.log('----------beforeMount--------',this.$vnode,this._vnode)
    
    console.log('----------App beforeMount--------');
  },
  mounted(){
    // console.log('----------mounted--------',this,this.$data,this.msg,this.$el)
    console.log('----------App mounted--------');
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
