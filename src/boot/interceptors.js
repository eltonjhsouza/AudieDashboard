// import { eventHub } from '../../config.js'
// import { Dialog } from 'quasar'

export default (http, store, router) => {
  http.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers.common.Authorization = 'Basic DB4AE36C-4A7F-4425-8748-C64E7DA1513E'
    return config
  })
}
