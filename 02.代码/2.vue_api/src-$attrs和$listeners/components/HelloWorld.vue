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
    msg: String,
    a:Number
  },
  mounted(){
    // $attrs中会收集props不要的标签属性
    // console.log('props',this.a,this.b,this.c)
    // console.log('attrs',this.$attrs)

    console.log('$listeners',this.$listeners)
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
