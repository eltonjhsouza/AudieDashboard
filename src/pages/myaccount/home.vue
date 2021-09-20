<template>
  <q-page>
    <div style="display:flex;">
      <banner
        :style="{
          height: heightPageContent + 'px',
          backgroundImage: 'url(' + bgLogin + ')'
        }"
        :heightPageContent="heightPageContent"
      />
      <login
        :style="{ height: heightPageContent + 'px' }"
        :heightPageContent="heightPageContent"
      />
    </div>
  </q-page>
</template>

<script>
import login from "./login.vue"
import banner from "./components/banner.vue"
import bgLogin from "src/assets/banner.png"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "HomePage",
  data() {
    return {
      heightPageContent: window.innerHeight,
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
    getLocalLanguage() {
      const item = this.$q.lang.getLocale()
      sessionStorage.setItem("language", item)

      this.set_language(item)
        .then(() => {})
        .catch((err) => console.log(err))

      this.$i18n.locale = item
      console.log(this.currentLanguage)
    }
  },
  mounted() {
    this.getLocalLanguage()

    const self = this
    self.heightPageContent = window.innerHeight

    window.addEventListener("resize", function() {
      self.heightPageContent = window.innerHeight
      return self.heightPageContent
    })
  },
  components: {
    banner,
    login
  }
}
</script>

<style>
.bg-studio {
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-fade-blue {
  background-color: rgb(0 30 84 / 62%);
}
.responsive-panel {
  width: 50vw;
  display: block;
}

.responsive-login,
.resposive-form {
  width: 50vw;
}

@media screen and (max-width: 600px) {
  .responsive-panel {
    display: none;
  }
  .responsive-login {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .resposive-form {
    width: 100vw;
  }
}
</style>
