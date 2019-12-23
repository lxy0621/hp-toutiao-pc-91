import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 1.router文件夹默认会加载文件夹下index.js文件
import router from '@/router'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// main.js入口文件
// 职责:做全局范围内的依赖和配置
// 职责:创建一个根VUE实例
