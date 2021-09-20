import * as types from "./types"
/*
export function someMutation (state) {
}
*/
export default {
  [types.UPDATE_USER_TIMEZONE](state, value) {
    state.userTimeZoneId = value
  },
  [types.UPDATE_DEVICE_TIMEZONE](state, value) {
    state.deviceTimeZoneId = value
  },
  [types.SET_REFRESH_TOKEN](state, value) {
    state.refreshToken = value
  },
  [types.SET_TOKEN](state, value) {
    state.token = value
  },
  [types.SET_USER](state, value) {
    state.user = value
  },
  [types.SET_IS_REFRESHING_TOKEN](state, value) {
    state.isTokenRefreshing = value
  },
  [types.SET_REDIRECT_URL](state, value) {
    state.redirectUrl = value
  },
  [types.UPDATE_LANGUAGE](state, value) {
    state.language = value
  },
  [types.UPDATE_SELECTED_STATION](state, value) {
    state.selected_station = value
  },
  [types.UPDATE_STATION_LIST](state, value) {
    state.stationList = value
  },
  [types.UPDATE_CARD_CLIENT](state, value) {
    state.card_client = value
  },
  [types.UPDATE_CARD_CONTRACT](state, value) {
    state.card_contract = value
  },
  [types.UPDATE_LOAD_TIMEZONE](state, value) {
    state.timezone = value
  },
  [types.UPDATE_DISABLE_TOUR](state, value) {
    state.disableTour = value
  },
  [types.UPDATE_SELECTED_MEDIA](state, value) {
    state.selectedMedia = value
  },
  [types.UPDATE_CLOUD_STORAGE](state, value) {
    state.cloud_storage = value
  },
  [types.UPDATE_SELECTED_OPERATOR](state, value) {
    state.selected_operator = value
  }
}
