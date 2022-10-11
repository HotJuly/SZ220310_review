<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>


    <h2 v-show="$route.meta.isShow">我是footer</h2>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    toAbout(){
      this.$router.push('/about')
      // this.$router.replace('/about')
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
