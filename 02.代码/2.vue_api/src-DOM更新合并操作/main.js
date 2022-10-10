import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
  // el:"#app",
  // template:"",
  render: h => h(App),
}).$mount('#app')
