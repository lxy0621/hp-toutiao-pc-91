// 提供一个配置好的axios,然后导出，需要请求头携带token
import axios from 'axios'
// 1.默认配置
import store from '@/store'

import router from '@/router'

// 进行配置
// 1. 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 2. 请求头 token
// 配置头部的代码不能在这里写，这里的代码只会在刷新页面后执行一次
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`

// 请求拦截器
axios.interceptors.request.use(config => {
  // 修改配置  加token
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
// 添加响应拦截器(每次后端给你响应)
axios.interceptors.response.use(res => res, err => {
  // 根据当前的响应状态码是不是401去跳转登陆页面
  // err对象包含 错误的时候响应对象，err.response
  // 状态码 err.response.status就是
  if (err.response.status === 401) {
  // 如果是vue主键中，this.$router.push('login')    路由实例$$router提供push函数
  // 如果在js模块中，导入创建好的实例对象调用push函数即可
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
