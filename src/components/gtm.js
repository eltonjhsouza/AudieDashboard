/* eslint-disable no-undef */
import { uid } from 'quasar'

export default {
  logEvent (category, action, label, value) {
    dataLayer.push({
      event: 'customEvent',
      category: category,
      action: action,
      label: label,
      value: value,
      cid: this.getCid()
    })
    // console.log('>>> Ok Analytics logEvent')
    // console.log(category + ', ' + action + ', ' + label + ', ' + value)
  },
  logPage (path) {
    // Here you can preprocess the path, if needed
    // console.log(dataLayer)
    dataLayer.push({
      event: 'customPageView',
      path: path,
      cid: this.getCid()
    })
    console.log('>>> Ok Analytics logPage')
    console.log(path)
  },
  getCid () {
    // We need an unique identifier for this session
    // We store it in a localStorage, but you may use cookies, too
    if (!localStorage.cid) {
      localStorage.cid = uid()
    }
    return localStorage.cid
  }
}
