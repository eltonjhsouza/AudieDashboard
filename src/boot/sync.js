import { sync } from 'vuex-router-sync'
import oidcPlugin from '../boot/oidc'

// leave the export, even if you don't use it
export default ({ app, router, store, Vue }) => {
  // setup sync
  // const unsync = sync(store, router)
  Vue.use(oidcPlugin, { store, router })
  sync(store, router)
}
