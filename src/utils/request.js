import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  timeout: 3000
  // headers: headers
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
