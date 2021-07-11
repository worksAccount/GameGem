import axios from 'axios'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = 'application/json'

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = ''
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === 0 || res.code === 200) {
      return res
    } else if (res.code === 400) {
      // msg: "用户未登录，请登录后重新访问！!"
      router.replace({
        path: '/logIn'
      })
    } else {
      console.log('res.code' + res.code) // for debug
      return {}
    }
  },
  error => {
    console.log('err' + error) // for debug

    router.replace({
      path: '/logIn'
    })

    return Promise.reject(error)
  }
)

export default service
