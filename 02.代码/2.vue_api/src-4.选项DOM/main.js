import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  面试题:请问在Vue项目中,能够控制页面显示内容的地方有几个?
  回答:
    1.index.html文件中的指定元素(el元素)
    2.Vue根组件的配置对象中的template属性
    3.Vue根组件的配置对象中的render方法

    优先级:render配置>template配置>index.html中的模版

*/

new Vue({
  el:"#app",
  data:{
    msg1:"hello",
    msg2:"world"
  },
  render: h => h(App),
  template:"<h3>我是template的内容,{{msg2}}</h3>",
})
// .$mount('#app')
