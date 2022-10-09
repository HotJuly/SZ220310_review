<template>
  <div class="hello">
    <h1>{{ user.name }}</h1>
    <h2>我是hello组件</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    console.log(1,this.user.name)
    this.user.name = "我是xiaowang";
    console.log(2,this.user.name)
  },
  inject:["user"]
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
