import { UserManager, Log, WebStorageStateStore } from 'oidc-client'
import { centralHost } from '../config'
// var domainUrl = 'https://account.playlistsolutions.com'
// var domainUrl = 'https://localhost:5101'

var config = {
  authority: centralHost,
  client_id: 'airescommercialweb',
  redirect_uri: window.location.origin + '/login-callback',
  post_logout_redirect_uri: window.location.origin + '/logout',

  // if we choose to use popup window instead for logins
  popup_redirect_uri: window.location.origin + '/statics/popup.html',
  popupWindowFeatures: 'menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes',

  // these two will be done dynamically from the buttons clicked, but are
  // needed if you want to use the silent_renew
  response_type: 'id_token token',
  scope: 'openid profile email account account.read commercialstudio commercialstudio.access airesstudio airesstudio.access offline_access',

  // this will toggle if profile endpoint is used
  loadUserInfo: true,

  // silent renew will get a new access_token via an iframe
  // just prior to the old access_token expiring (60 seconds prior)
  // silent_redirect_uri: window.location.origin + '/silent',
  silent_redirect_uri: window.location.origin + '/statics/silent.html',
  automaticSilentRenew: true,

  // will revoke (reference) access tokens at logout time
  revokeAccessTokenOnSignout: true,

  // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
  // wouldn't care about them or want them taking up space
  filterProtocolClaims: false,
  userStore: new WebStorageStateStore({ store: window.localStorage })

  /* metadata: {
    issuer: domainUrl,
    jwks_uri: domainUrl + '/.well-known/openid-configuration/jwks',
    end_session_endpoint: domainUrl + '/connect/endsession',
    authorization_endpoint: domainUrl + '/connect/authorize',
    userinfo_endpoint: domainUrl + '/connect/userinfo'
  } */
}

window.userManagerConfig = config

export const oidc = new UserManager(config)

export default function install (Vue, { router, store }) {
  Log.logger = console
  oidc.events.addAccessTokenExpired(() => {
    // store.dispatch('setUser', null)
    console.log('Log AccessTokenExpired: ' + new Date())
    // router.push({ path: '/login' });
  })
  oidc.events.addAccessTokenExpiring(() => {
    console.log('Log AccessTokenExpiring: ' + new Date())
  })
  oidc.events.addSilentRenewError(() => {
    // store.dispatch('setUser', null)
    console.log('Log SilentRenewError: ' + new Date())
    router.push({ name: 'requestAccessToken' })
  })
  oidc.events.addUserSignedOut(() => {
    // store.dispatch('setUser', null)
    console.log('Log UserSignedOut: ' + new Date())
    // router.push({ path: '/login' });
  })
  oidc.events.addUserLoaded((user) => {
    store.dispatch('setUser', user)
    console.log('Log UserLoaded: ' + new Date())
  })
  Object.defineProperty(Vue.prototype, '$oidc', {
    get () {
      return oidc
    }
  })
}
