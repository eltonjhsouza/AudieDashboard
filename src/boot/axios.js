import axios from 'axios'
import interceptors from './interceptors'
import { apiBaseUrl, newsApi } from '../config.js'

const http = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Authorization': 'Basic DB4AE36C-4A7F-4425-8748-C64E7DA1513E'
  }
})

const newsHttp = axios.create({
  baseURL: newsApi
})

export default ({ router, store, Vue }) => {
  interceptors(http, newsHttp, store, router)
  Vue.prototype.$axios = http
  Vue.prototype.$axios = newsHttp
}


export { http, newsHttp }
