<template>
  <div class="bg-studio responsive-panel">
    <div
      class="q-pa-md flex flex-center"
      :style="{
        height: heightPageContent + 'px'
      }"
      style="color:#fff; padding-bottom:0px; width:50vw;"
    >
      <div class="text-left" style="max-width: 25vw">
        <p
          class="q-mt-xl text-weight-bolder"
          style="font-size: 3.5vh; font-family: 'Montserrat', sans-serif;"
        >
          {{ 'Sistema de Gestão e controle de ouvintes' }}
        </p>
        <p
          class="text-weight-regular"
          style="line-height:1; font-size:2.2vh; font-family: 'Montserrat', sans-serif;"
        >
          {{ 'Gerencie e controle o relacionamento com seus ouvintes'}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import logoAudie from "src/assets/logo_verde.png"
import bgLogin from "src/assets/banner.png"

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
    login() {
      this.$router.push({ name: "stations" })
    }
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
