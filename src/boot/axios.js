import axios from 'axios'
import interceptors from './interceptors'
// import serverInterceptors from "./serverInterceptors"
import { apiBaseUrl, newsApi, apiAiresUrl } from '../config.js'

const http = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Encoding": "gzip"
  }
  // headers: {
  //   'Authorization': 'Basic DB4AE36C-4A7F-4425-8748-C64E7DA1513E'
  // }
})

const newsHttp = axios.create({
  baseURL: newsApi
})

const airesUrl = axios.create({
  baseURL: apiAiresUrl,
  headers: {
    "Content-Encoding": "gzip"
  }
})
export function setToken(token) {
  if (token == null) {
    http.defaults.headers.common.Authorization = null
    airesUrl.defaults.headers.common.Authorization = null
  } else {
    http.defaults.headers.common.Authorization = `Bearer ${token}`
    airesUrl.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export default ({ router, store, Vue }) => {
  interceptors(airesUrl, store, router)
  // serverInterceptors(http, store, router)
  // Vue.prototype.$axios = http
  Vue.prototype.$axios = airesUrl
}


export { http, newsHttp, airesUrl }
