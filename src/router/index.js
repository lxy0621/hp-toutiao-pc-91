// 配置路由
import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
Vue.use(VueRouter)

// 实例化Vue对象
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login }
  ]
})

// 导出实例
export default router
