<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>我是hello组件</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // mounted(){
  //   console.log('获取父组件的数据',this.$parent)
  //   this.$parent.msg="666"
  //   // 以上代码相当于是父组件中调用以下代码
  //   // this.msg="666"
  // },
  // methods:{
  //   clickHandler(){
  //     console.log('clickHandler')
  //   }
  // }
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
