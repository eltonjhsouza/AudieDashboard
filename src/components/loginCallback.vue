<template>
    <q-layout>
        <q-page-container>
            <q-page class="flex flex-center">
                <section v-if="user">
                    <div class="load-center">
                    <h2 class="q-display-3 text-weight-light">{{ 'Olá' + ', ' + user.ContactName }}</h2>
                    <p class="q-subheading">{{ 'Aguarde, você será redirecionado' }}</p>
                    </div>
                </section>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import localforage from 'localforage'
import isEmpty from 'lodash/isEmpty'

export default {
  data () {
    return {
      user: null
    }
  },
  methods: {
    ...mapActions(['attemptLogin'])
  },
  beforeCreate () {
    this.$oidc.signinRedirectCallback().then(() => {
    // debugger
      this.$oidc.getUser().then(user => {
        // debugger
        this.user = user.profile
        this.attemptLogin(user)
      })

      return localforage.getItem('redirect').then(url => {
        // debugger
        if (!isEmpty(url)) {
          // window.history.replaceState({}, window.document.title, url)
          // this.$router.replace(url)
          window.location = url
          // this.$router.push({ path: url })
        } else {
          // window.history.replaceState({}, window.document.title, window.location.origin)
          window.location = window.location.origin
        }
      })
      // debugger
      // window.history.replaceState({}, window.document.title, window.location.origin)
      // // this.$router.replace({}, window.document.title, window.location.origin)
      // this.$router.push({ path: '/' })
    }, error => {
      // debugger
      console.error(error)
    })
  },
  created () {
    // solicita o idioma utilizado pelo navegador
    let language = ''
    let item = ''
    if (window.navigator.languages) {
      language = window.navigator.languages[0]
    } else {
      language = window.navigator.userLanguage || window.navigator.language
    }

    if (language.includes('pt')) item = 'pt-br'
    if (language.includes('en')) item = 'en-us'
    if (language.includes('es')) item = 'es'

    this.$i18n.locale = item
  }
}
</script>

<style>
.load-center {
    text-align:center;
}
</style>
