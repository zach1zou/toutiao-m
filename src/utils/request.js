import axios from 'axios'
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/',
    timeout: 3000
    // headers: headers
})

// 请求拦截器

// 响应拦截器

export default request
