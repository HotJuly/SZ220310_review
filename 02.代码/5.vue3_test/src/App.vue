<template>
  <!-- <h1>msg:{{msg}}</h1> -->
  <h1>name:{{user.name}}</h1>
  <h1>name1:{{user1.name}}</h1>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import {ref,reactive} from 'vue';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // data(){
  //   return {
  //     msg:123
  //   }
  // },
  setup(){
    // setup是Vue3中新增的生命周期,他是最早执行的,
    // 在该生命周期中,不能使用this
    // 在该生命周期中,可以使用Vue3新增的组合API
    // console.log(this)
    
    // 通过ref函数,可以将基础数据类型变成具有响应式的效果
    // 如果模版中使用ref对象,会自动读取他的value值
    // js代码中使用ref对象,需要我们手动.value才行
    // const msg1 = ref(123);
    // console.log('msg',msg)

    // setTimeout(()=>{
    //   msg1.value = 22333;
    // },2000)

    const obj= {
      name:"xiaoming",
      age:18
    }

    // 通过reactive函数,可以传入一个元对象,并生成一个代理对象
    // 注意:只有修改代理对象才会有响应式效果,修改元对象是没有响应式效果的
    // const user = reactive(obj);
    // console.log(user.name)

    // setTimeout(()=>{
    //   // user.name = 666;
    //   obj.name = 666;
    // },2000)

    /*
      目前看来:
        1.如果数据是基础数据类型,就使用ref函数
        2.如果数据是对象数据类型,就使用reactive函数

      问题:请问ref能不能接收一个对象?
      答案:可以,ref如果接收到一个对象,那么他还是返回Ref对象,
        但是ref会将该对象传给reactive函数处理,将得到的代理对象放入自己的value属性中

      问题:请问reactive函数能不能接收基础数据类型?
      答案:不能

      使用区别:
        1.Ref对象使用的时候必须.value属性才行,而Proxy对象只需要直接找到对应属性进行操作即可
        2.如果你未来会将现在的某个对象替换成新的对象,那么就选择使用ref函数,它可以监视到对象地址的变化
          如果你未来不会修改对象的地址值,只是修改对象身上的某些属性,就是用reactive函数

    */

    const user = ref(obj);
    // console.log(user)

    let user1 = reactive(obj);

    setTimeout(()=>{
      // ref修改name的方法
      // user.value.name = "xiaoming777";
      // 写法2:
      // user.value = {
      //   name:"xiaoming999"
      // }

      // reactive修改name的方法
      // user1.name = "xiaoming888"

      // 以下写法是错误写法,没有经过Proxy对象修改属性,不具有响应式效果
      // user1 = {
      //   name:"xiaoming000"
      // }
    },2000)

    return {
      // msg:msg1,
      user,
      user1
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
