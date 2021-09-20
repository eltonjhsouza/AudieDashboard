import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { userStorageKey, userTokenStorageKey } from '../../config'
import * as types from './types'
import isEmpty from 'lodash/isEmpty'
import localforage from 'localforage'
import { setToken } from '../../boot/axios'

export default {
  // namespaced: true,
  plugins: [
    (store) => {
      store.subscribe((mutation, { user, token, redirectUrl }) => {
        console.log(user, token)
        if (mutation.type === types.SET_TOKEN) {
          /**
           * Set the Axios Authorization header with the token
           */
          const accessToken = (isEmpty(user) || isEmpty(user.access_token)) ? null : user.access_token
          setToken(accessToken)
          /**
           * Sets the token to the local storage
           * for auto-login purpose
           */
          localforage.setItem(userTokenStorageKey, token)
        }
        if (mutation.type === types.SET_USER) {
          // const user = (isEmpty(auth.user)) ? null : auth.user
          localforage.setItem(userStorageKey, user)
        }
        if (mutation.type === types.SET_REDIRECT_URL) {
          localforage.setItem('redirect', redirectUrl)  
        }
      })
    }
  ],
  state,
  getters,
  mutations,
  actions
}
