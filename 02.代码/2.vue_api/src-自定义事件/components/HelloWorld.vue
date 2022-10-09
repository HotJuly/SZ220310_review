<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="click1">我是hello组件</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    this.$bus.$on('sendMsg',(data)=>{
      console.log('sendMsg',data)
    })
  },
  methods:{
    click1(){
      // console.log('click1')
      this.$emit('update:msg',"我是修改之后的数据")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
