<template>
    <q-layout>
        <q-page-container>
            <q-page class="flex flex-center">
                <div class="load-center">
                    <h2 class="q-display-3 text-weight-light">{{ 'Carregando' }}...</h2>
                    <p class="q-subheading">{{ 'Aguarde, você será redirecionado' }}</p>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      setRedirectUrlBeforeLogin: 'setRedirectUrlBeforeLogin'
    })
  },
  mounted () {
    // debugger
    this.setRedirectUrlBeforeLogin(this.$route.query.redirectUrl).then(() => {
      this.$oidc.signinRedirect()
    })
    // debugger
    // {
    //   redirect_uri: this.$route.query.returnUrl,
    //   // extraQueryParams: { // your params go here
    //   //   redirectInternal: this.$route.query.returnUrl, // window.location.href
    //   // }
    // }

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
