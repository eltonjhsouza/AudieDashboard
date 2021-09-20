<template>
  <div class="flex">
    <q-btn
      class="q-ml-sm q-mr-sm"
      size="sm"
      flat
      color="black"
      :label="$t('myaccount.terms_use')"
      @click="modalTermsUse = true"
    />
    <q-btn
      class="q-ml-sm q-mr-sm"
      size="sm"
      flat
      color="black"
      @click="modalPrivacyPolice = true"
      :label="$t('myaccount.privacy_policy')"
    />
    <q-btn class="q-mr-md" flat dense no-caps>
      <img v-if="currentLanguage === 'en-us'" :src="usaFlag" />
      <img v-if="currentLanguage === 'pt-br'" :src="braFlag" />
      <img v-if="currentLanguage === 'es'" :src="espFlag" />
    </q-btn>
    <q-select
      v-model="lang"
      :options="langOptions"
      :label="$t('myaccount.language')"
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 150px"
    />

    <q-dialog v-model="modalTermsUse">
      <terms-use />
    </q-dialog>

    <q-dialog v-model="modalPrivacyPolice">
      <privacy-policy style="width:50vw;" />
    </q-dialog>
  </div>
</template>

<script>
import usaFlag from "src/assets/usa-flag.png"
import braFlag from "src/assets/brasil-flag.png"
import espFlag from "src/assets/espanha-flag.png"
import TermsUse from "src/components/default/terms-use.vue"
import PrivacyPolicy from "src/components/default/privacy-policy.vue"

import { mapGetters, mapActions } from "vuex"

export default {
  name: "HomeOptionsMenu",
  data() {
    return {
      usaFlag,
      braFlag,
      espFlag,
      modalTermsUse: false,
      modalPrivacyPolice: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: "en-us", label: "English", image: usaFlag },
        { value: "pt-br", label: "Português", image: braFlag },
        { value: "es", label: "Español", image: espFlag }
      ],
      language: { value: "pt-br", label: "Português", image: braFlag }
    }
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      currentLanguage: "currentLanguage"
    })
  },
  methods: {
    ...mapActions({
      set_language: "setLanguage"
    }),
    setInfoLanguage(item) {
      import(`quasar/lang/${item}`).then((lang) => {
        this.$q.lang.set(lang.default)
      })
      sessionStorage.setItem("language", item)
      this.set_language(item)
        .then(() => {})
        .catch((err) => console.log(err))
      // console.log(this.currentLanguage)
    }
  },
  mounted() {
    let language = ""
    let item = ""
    if (window.navigator.language) {
      language = window.navigator.language
    } else {
      language = window.navigator.userLanguage || window.navigator.language
    }

    if (language.includes("pt")) item = "pt-br"
    if (language.includes("en")) item = "en-us"
    if (language.includes("es")) item = "es"

    this.lang = item
    this.$i18n.locale = this.lang
    this.setInfoLanguage(item)
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
      this.setInfoLanguage(lang)
    }
  },
  components: {
    TermsUse,
    PrivacyPolicy
  }
}
</script>
