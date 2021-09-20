import { userStorageKey, userTimeZoneIdStorageKey } from "../../config"
import * as types from "./types"
import isEmpty from "lodash/isEmpty"
import localforage from "localforage"
import { oidc } from "../../boot/oidc"

/*
export function someAction (context) {
}
*/

export default {
  [types.CHECK_USER_TIMEZONE]: ({ dispatch, state }) => {
    if (!isEmpty(state.userTimeZoneId)) {
      return Promise.resolve(state.userTimeZoneId)
    }

    return localforage.getItem(userTimeZoneIdStorageKey).then((timeZoneId) => {
      if (isEmpty(timeZoneId)) {
        return Promise.reject(new Error("NO_TIMEZONE")) // Reject promise
      }
      return dispatch(types.SET_USER_TIMEZONE, timeZoneId) // keep promise chain
    })
  },
  [types.SET_USER_TIMEZONE]: ({ commit }, payload) => {
    commit(types.UPDATE_USER_TIMEZONE, payload)
  },
  [types.SET_DEVICE_TIMEZONE]: ({ commit }, payload) => {
    commit(types.UPDATE_DEVICE_TIMEZONE, payload)
  },
  attemptLogin: ({ dispatch, commit }, payload) => {
    // debugger
    if (!isEmpty(payload)) {
      dispatch("setUser", payload)
      commit(types.SET_IS_REFRESHING_TOKEN, false)
      return payload.profile // keep promise chain
    } else {
      dispatch("setUser", null)
      commit(types.SET_IS_REFRESHING_TOKEN, false)
      return null
    }
  },
  setRedirectUrlBeforeLogin: ({ commit }, url) => {
    commit(types.SET_REDIRECT_URL, url)
    return Promise.resolve(url)
  },
  logout: async ({ dispatch }) => {
    await dispatch("setUser", null)
    return oidc.signoutRedirect()
  },
  setUser: ({ commit }, user) => {
    // Commit the mutations
    commit(types.SET_USER, user)
    Promise.resolve(user) // keep promise chain
  },
  checkRefreshToken: ({ state, getters }) => {
    if (!getters.isLogged) {
      return Promise.resolve(null)
    }
    return Promise.resolve(state.user.access_token)
  },
  checkUserToken: async ({ dispatch, state }) => {
    let user = state.user
    if (
      !isEmpty(user) &&
      Math.round(new Date().getTime() / 1000) < user.expires_at
    ) {
      await dispatch("setUser", user)
      return Promise.resolve(user)
    }
    return localforage.getItem(userStorageKey).then(async (user) => {
      if (isEmpty(user)) {
        return Promise.reject(new Error("NO_TOKEN"))
      }
      return dispatch("setUser", user)
    })
  },
  setLanguage: ({ commit }, payload) => {
    commit(types.UPDATE_LANGUAGE, payload)
  },
  checkSelectedStation: ({ dispatch, state }) => {
    if (!isEmpty(state.selected_station)) {
      return Promise.resolve(state.selected_station)
    }

    return localforage.getItem("APP_SELECTED_STATION").then((station) => {
      if (isEmpty(station)) {
        return Promise.reject(new Error("NO_SELECTED_STATION")) // Reject promise
      }
      return dispatch(this.setStation, station) // keep promise chain
    })
  },
  setStation: ({ commit }, station) => {
    commit(types.UPDATE_SELECTED_STATION, station)
    Promise.resolve(station) // keep promise chain
  },
  checkStationList: ({ dispatch, state }) => {
    if (!isEmpty(state.stationList)) {
      return Promise.resolve(state.stationList)
    }

    return localforage.getItem("APP_STATION_LIST").then((stationList) => {
      if (isEmpty(stationList)) {
        return Promise.reject(new Error("NO_STATION_LIST")) // Reject promise
      }
      return dispatch(this.setStationList, stationList) // keep promise chain
    })
  },
  setStationList: ({ commit }, station) => {
    commit(types.UPDATE_STATION_LIST, station)
    Promise.resolve(station) // keep promise chain
  },
  setTimezone: ({ commit }, payload) => {
    commit(types.UPDATE_LOAD_TIMEZONE, payload)
  },
  setTourDisable: ({ commit }, payload) => {
    commit(types.UPDATE_DISABLE_TOUR, payload)
    // localforage.setItem('disableTour', payload)
  },
  setCardClient: ({ commit }, clients) => {
    commit(types.UPDATE_CARD_CLIENT, clients)
    Promise.resolve(clients) // keep promise chain
  },
  setCardContract: ({ commit }, payload) => {
    commit(types.UPDATE_CARD_CONTRACT, payload)
    Promise.resolve(payload) // keep promise chain
  },
  setSelectMedia: ({ commit }, payload) => {
    commit(types.UPDATE_SELECTED_MEDIA, payload)
  },
  setCloudStorage: ({ commit }, payload) => {
    commit(types.UPDATE_CLOUD_STORAGE, payload)
  },
  setOperator: ({ commit }, operator) => {
    commit(types.UPDATE_SELECTED_OPERATOR, operator)
    Promise.resolve(operator) // keep promise chain
  }
}
