<template>
  <div class="responsive-login">
    <home-options class="q-mt-md flex justify-center" />
    <div
      class="flex flex-center resposive-form"
      :style="{ height: heightPageContent - 60 + 'px' }"
    >
      <q-card flat>
        <q-card-section class="flex justify-center">
          <q-img :src="logoAudie" style="width:300px" />
          <div
            class="text-teal-8"
            style="margin-top: 32px; height: 17px; font-size: 16px;"
          >
            <b>{{ $t("pages.beta_version") }}</b>
          </div>
        </q-card-section>
        <q-card-section class="text-center">
          <div class="q-mb-md q-mt-lg text-h5">
            {{ $t("myaccount.logout") }}
          </div>
          <div class="q-mb-xl text-subtitle1">
            {{ $t("myaccount.logout_detail") }}
          </div>
        </q-card-section>
        <q-card-section class="flex justify-center">
          <q-btn
            flat
            class="bg-orange-5 full-width"
            text-color="white"
            no-caps
            :label="$t('myaccount.login')"
            icon-right="mdi-login"
            @click="doLogin"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import logoAudie from "src/assets/logo_verde.png"
import bgLogin from "src/assets/banner.png"
import homeOptions from "./components/home-options.vue"

import { mapGetters, mapActions } from "vuex"

export default {
  name: "PageLogout",
  props: ["heightPageContent"],
  data() {
    return {
      logoAudie,
      bgLogin
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
    infoPages() {
      window.open("#", "_blank")
    },
    doLogin() {
      this.$router.push({ name: "stations" })
    }
  },
  components: {
    homeOptions
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
</style>

<style scoped>
.logo-commercial {
  margin-top: 5px;
}
</style>
