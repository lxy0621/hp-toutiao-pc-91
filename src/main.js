import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
// main.js入口文件
// 职责:做全局范围内的依赖和配置
// 职责:创建一个根VUE实例
