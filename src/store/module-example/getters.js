import * as types from "./types"
import isEmpty from "lodash/isEmpty"
import localforage from "localforage"

/*
export function someGetter (state) {
}
*/
export default {
  [types.GET_DEVICE_TIMEZONE]: (state) => {
    return state.deviceTimeZoneId
  },
  [types.GET_USER_TIMEZONE]: (state) => {
    return state.userTimeZoneId
  },
  isLogged: (state) => !isEmpty(state.user),
  // get current user data
  currentUser: (state) => (!isEmpty(state.user) ? state.user.profile : {}),
  isAuthPage: ({ route }) => {
    return route.path.indexOf("/login") !== -1
  },
  currentLanguage: (state) =>
    !isEmpty(state.language) ? state.language : "pt-br",
  selectedStation: (state) =>
    !isEmpty(state.selected_station) ? state.selected_station : {},
  getStationList: (state) =>
    !isEmpty(state.stationList) ? state.stationList : [],
  getCardClient: (state) => state.card_client,
  getCardContract: (state) => state.card_contract,
  timezone: (state) => (!isEmpty(state.timezone) ? state.timezone : null),
  disableTour: (state) => state.disableTour,
  selectedMedia: (state) =>
    !isEmpty(state.selectedMedia) ? state.selectedMedia : null,
  cloudStorage: (state) =>
    !isEmpty(state.cloud_storage) ? state.cloud_storage : null,
  selectedOperator: (state) =>
    !isEmpty(state.selected_operator) ? state.selected_operator : {}
}
