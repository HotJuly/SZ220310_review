<template>
  <div id="app">
    <!-- <HelloWorld 
    v-bind="$data" 
    @click111="click666"
    msg="Welcome to Your Vue.js App"
    /> -->

    <HintButton 
    type="primary" 
    size="big" 
    content="点击可以添加商品" 
    @click="click666"
    />
    <HintButton type="danger" size="small" content="点击可以删除商品"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HintButton from './components/HintButton.vue'

export default {
  name: 'App',
  data(){
    return {
      a:1,
      b:2,
      c:3
    }
  },
  components: {
    HelloWorld,
    HintButton
  },
  mounted(){
    console.log('data',this.$data)
  },
  methods:{
    click666(){
      alert('click666')
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
