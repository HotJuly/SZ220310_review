import Vue from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue';

Vue.config.productionTip = false




new Vue({
  render: h => h(App),
}).$mount('#app')

// var Profile = Vue.extend({
//   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
//   data: function () {
//     return {
//       firstName: 'Walter',
//       lastName: 'White',
//       alias: 'Heisenberg'
//     }
//   }
// })
// // 创建 Profile 实例，并挂载到一个元素上。
// new Profile().$mount('#app')