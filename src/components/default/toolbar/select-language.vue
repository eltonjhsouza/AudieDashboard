<template>
  <q-select
    class="toolbar-select-white responsive-menu q-mr-md"
    v-model="lang"
    :options="langOptions"
    :label="$t('myaccount.language')"
    dense
    borderless
    emit-value
    map-options
    options-dense
    label-color="white"
    style="min-width: 100px"
  />
</template>

<script>
import usaFlag from "src/assets/usa-flag.png"
import braFlag from "src/assets/brasil-flag.png"
import espFlag from "src/assets/espanha-flag.png"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "selectLanguage",
  data() {
    return {
      usaFlag,
      braFlag,
      espFlag,
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
    }
  },
  created() {
    this.lang = this.currentLanguage
    this.$i18n.locale = this.lang
    this.setInfoLanguage(this.currentLanguage)
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
      this.setInfoLanguage(lang)
    }
  }
}
</script>
