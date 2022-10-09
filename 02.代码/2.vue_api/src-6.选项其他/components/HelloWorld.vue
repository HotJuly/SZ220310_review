<template>
  <div class="hello">
    <h1>{{ text666 }}</h1>
    <h2 @click="clickHandler">我是hello组件</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String,
    text666:String
  },
  mounted(){
  },
  methods:{
    clickHandler(){
      this.$emit('input999',666);
    }
  },
  model:{
    prop:"text666",
    event:"input999"
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
