import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.devtools = true;

/*
  需求:将所有组件配置对象中的a属性值+1
  解决:
    需要一次性对所有的组件的配置对象进行修改
    使用自定义合并策略,可以一次性对所有组件的配置对象进行修改
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // 第二个实参就是每个组件配置对象上的对应属性值
//   // console.log(parent, child, vm)
//   return child + 1;
// }

/*
  需求:请问你平常开发的时候,是如何捕获代码的报错的?
    1.try...catch(){}
      需要提前预判代码可能出错的地方

    2.Promise的catch方法
      只能捕获promise中出现的错误

    3.errorCaptured生命周期
      只能捕获后代组件出现的报错,不包括当前组件本身

    4.Vue.config.errorHandler
      可以捕获当前项目中所有的报错

    
  需求升级版:请问你是如何在项目上线之后,解决用户出现的bug的?
    1.如何知道用户出现了什么报错?
      捕获到用户出现的会报错

    2.捕获到报错之后,使用ajax将报错信息全部发送到公司指定的服务器上
    3.服务器收集完报错之后,会将报错信息反馈到项目经理手上
*/
Vue.config.errorHandler=function(err, vm, info){
  console.log('errorhandler',err, vm, info)
  // ajax()
}

Vue.config.ignoredElements = [
  'About'
]

new Vue({
  render: h => h(App),
}).$mount('#app')
