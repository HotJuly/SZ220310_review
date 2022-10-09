import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


/*
  需求:项目中所有组件,在mounted的时候,打印自己的组件名称
  解决:使用全局混合/混入实现对所有组件进行注入功能

  执行顺序:全局混入>局部混入>组件自己的生命周期
  如果出现重名的内容,那么组件内部的优先
*/

Vue.mixin({
  mounted(){
   console.log('全局混入',this.$options.name)
  }
})

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
