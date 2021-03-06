// 配置路由
import VueRouter from 'vue-router'

import Vue from 'vue'

import store from '@/store'

import Login from '@/views/login'

import Home from '@/views/home'

import Welcome from '@/views/home/welcome'

import NotFound from '@/views/404'

import Article from '@/views/article'

import Image from '@/views/image'

import Publish from '@/views/publish'

import Comment from '@/views/comment'

import Setting from '@/views/setting'

import Fans from '@/views/fans'

Vue.use(VueRouter)

// 实例化Vue对象
const router = new VueRouter({
  routes: [
    { path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment },
        { path: '/setting', component: Setting },
        { path: '/fans', component: Fans }
      ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // to 去哪里
  // from 来自哪里
  // next 放行|指定跳转路由
  // - 判断如果是除去登录页面外其他的路由且当前没有登录，拦截到登录。
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
// 导出实例
export default router
