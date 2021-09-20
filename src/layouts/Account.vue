<template>
  <q-layout view="hHh Lpr lFf">
    <!-- <q-header class="bg-transparent">
      <q-toolbar style="border-bottom:1px solid #e0e0e0;">
        <q-toolbar-title class="flex">
          <img
            class="logo-commercial"
            style="max-width: 200px;"
            :src="logoCommercial"
            @click="gotoIndex"
          />
          <div
            class="text-caption text-teal-8"
            style="margin-top: 23px; height: 14px;"
          >
            <b>{{ $t("pages.beta_version") }}</b>
          </div>
        </q-toolbar-title>

        <div id="info-page-menu" class="flex" style="color: #333;">
          <q-btn
            class="q-mr-md"
            flat
            @click="modalTermsUse = true"
            :title="$t('myaccount.terms_use')"
            :label="$t('myaccount.terms_use')"
          >
          </q-btn>
          <q-btn
            class="q-mr-md"
            flat
            @click="modalPrivacyPolice = true"
            :title="$t('myaccount.privacy_policy')"
            :label="$t('myaccount.privacy_policy')"
          >
          </q-btn>
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
        </div>
      </q-toolbar>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="modalTermsUse">
      <terms-use />
    </q-dialog>
    <q-dialog v-model="modalPrivacyPolice">
      <privacy-policy style="width:50vw;" />
    </q-dialog>
  </q-layout>
</template>

<script>
import { QDialog } from "quasar"
import logoCommercial from "src/assets/logo_verde.png"
import usaFlag from "src/assets/usa-flag.png"
import braFlag from "src/assets/brasil-flag.png"
import espFlag from "src/assets/espanha-flag.png"
import TermsUse from "src/components/default/terms-use.vue"
import PrivacyPolicy from "src/components/default/privacy-policy.vue"

import { mapGetters, mapActions } from "vuex"

export default {
  name: "MyAccount",
  data() {
    return {
      logoCommercial,
      rightDrawerOpen: !this.$q.platform.is.desktop,
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
      ]
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
    gotoIndex() {
      this.$router.push({ name: "login" })
    },
    showOptions() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
    goto_help_page() {
      //
    },
    showLang(val) {
      this.selected_lang = !this.selected_lang
    },
    // setInfoLanguage(item) {
    //   import(`quasar/lang/${item}`).then((lang) => {
    //     this.$q.lang.set(lang.default)
    //   })
    //   // sessionStorage.setItem("language", item)
    //   this.set_language(item)
    //     .then(() => {})
    //     .catch((err) => console.log(err))
    //   // console.log(this.currentLanguage)
    // }
  },
  created() {
    let self = this
    this.$root.$on("close_drawer", () => {
      self.showOptions()
    })
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
    // this.setInfoLanguage(item)
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
      // this.setInfoLanguage(lang)
    }
  },
  components: {
    QDialog,
    TermsUse,
    PrivacyPolicy
  }
}
</script>

<style>
.logo-commercial {
  max-width: 200px;
  margin-top: 5px;
  cursor: pointer;
}
.bg-toolbar {
  background-color: #dc5b00 !important;
  min-height: 35px;
  max-height: 35px;
}
.logo {
  max-width: 200px;
  max-height: 32px;
  margin-top: 5px;
}
.pad-icon {
  margin-left: 10px;
}
.bg-drawer {
  background-color: #f5f5f5;
}

.q-dialog__message {
  overflow: auto;
  max-height: 250px;
}
</style>
