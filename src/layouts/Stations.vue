<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar class="my-teal">
        <q-toolbar-title class="flex">
          <!-- <img class="logo" :src="logoCommercial" @click="gotoIndex" /> -->
          <img class="logo" :src="logoAudie" @click="gotoIndex" />
          <div class="text-caption" style="margin-top: 23px; height: 14px;">
            <b>{{ 'BETA' }}</b>
          </div>
        </q-toolbar-title>

        <div id="info-page-menu" class="flex">
          <select-language />
          <q-btn
            flat
            no-caps
            class="responsive-menu q-ml-md"
            color="white"
            icon="logout"
            label="Sair"
            @click="doLogout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-drawer" v-model="rightDrawerOpen" side="right">
      <!-- <user-options v-if="showPane" @closePane="updatePane" /> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import logoAudie from "src/assets/logoAudie2.png"
import userOptions from "src/components/user-options"
import usaFlag from "src/assets/usa-flag.png"
import braFlag from "src/assets/brasil-flag.png"
import espFlag from "src/assets/espanha-flag.png"

import selectLanguage from "src/components/default/toolbar/select-language.vue"

import { mapGetters, mapActions } from "vuex"

export default {
  name: "MyAccount",
  data() {
    return {
      logoAudie,
      rightDrawerOpen: !this.$q.platform.is.desktop,
      usaFlag,
      braFlag,
      espFlag,
      showPane: false,
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
      logout: "logout",
      set_language: "setLanguage"
    }),
    gotoIndex() {
      this.$router.push({ name: "login" })
    },
    updatePane(event) {
      this.showPane = event
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
    showOptions() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
    goto_help() {},
    showLang(val) {
      this.selected_lang = !this.selected_lang
    },
    setInfoLanguage(item) {
      import(`quasar/lang/${item}`).then((lang) => {
        this.$q.lang.set(lang.default)
      })
      sessionStorage.setItem("language", item)
      this.set_language(item)
        .then(() => {})
        .catch((err) => console.log(err))
      console.log(this.currentLanguage)
    },
    doLogout() {
      let self = this
      this.$q
        .dialog({
          title: "Sair",
          message: "Tem certeza de que deseja sair?",
          cancel: {
            label: this.$t("pages.no"),
            "no-caps": true,
            outline: true,
            color: "blue-grey-10"
          },
          ok: {
            label: this.$t("pages.yes"),
            "no-caps": true,
            color: "orange"
          },
          persistent: true
        })
        .onOk(() => {
          console.log(">>>> OK")
          return this.logout()
            .then(() => {})
            .catch((err) => {
              console.log(err)
            })
        })
        .onCancel(() => {
          console.log(">>>> Cancel")
        })
    }
  },
  created() {
    let self = this
    this.lang = this.currentLanguage
    this.$i18n.locale = this.lang
    this.setInfoLanguage(this.currentLanguage)

    this.$root.$on("close_drawer", () => {
      self.showOptions()
    })
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
      this.setInfoLanguage(lang)
    }
  },
  components: {
    userOptions,
    selectLanguage
  }
}
</script>

<style>
.bg-toolbar {
  background-color: #dc5b00 !important;
  min-height: 35px;
  max-height: 35px;
}
.logo {
  max-width: 200px;
  max-height: 32px;
  margin-top: 5px;
  cursor: pointer;
}
.pad-icon {
  margin-left: 10px;
}
.bg-drawer {
  background-color: #f5f5f5;
}
.toolbar-select-white .q-field__native {
  color: #fff;
}
.toolbar-select-white .q-select__dropdown-icon {
  color: #fff;
}

.q-dialog__message {
  overflow: auto;
  max-height: 250px;
}
</style>

<style lang="sass">
// .my-teal
//   background: $my-teal
</style>
