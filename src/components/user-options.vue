<template>
  <div class="q-pa-md" style="text-align:center;">
    <q-btn
      flat
      round
      dense
      color="black"
      icon="close"
      @click="close_pane"
      style="position:absolute; right:10px;"
    />
    <div class="q-pt-lg" style="text-align:-webkit-center; text-align:center;">
      <div
        class="user-acronym text-h4"
        style="margin: 10px 107px; box-shadow: 1px 1px 20px 0px #bdbdbd;"
      >
        <div style="padding:27px 0px;">{{ user_acronym(user) }}</div>
      </div>
      <div class="text-subtitle1 q-pt-md">{{ user.ContactName }}</div>
      <div class="q-pt-sm">{{ user.email }}</div>
    </div>
    <div class="q-pt-lg">
      <q-btn
        class="full-width"
        icon="fas fa-sign-out-alt"
        color="orange"
        size="12px"
        label="Sair"
        style="margin-top: 25px;"
        @click="doLogout"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "UserOptions",
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      currentLanguage: "currentLanguage"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    close_pane() {
      this.$emit("closePane", false)
    },
    doLogout() {
      let self = this
      this.$q
        .dialog({
          title: this.$t("components.toolbar.logout"),
          message: this.$t("components.toolbar.logout_confirm"),
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
          return self
            .logout()
            .then(() => {
              // TODO some redirect
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .onCancel(() => {
          console.log(">>>> Cancel")
        })
    },
    user_acronym(user) {
      let str = user.ContactName
      let matches = ""
      if (str != null) {
        matches = str.match(/\b(\w)/g)
        matches = matches[0]
      }
      return matches
    }
  }
}
</script>

<style>
.user-acronym {
  background: rgb(174, 233, 231);
  background: linear-gradient(
    180deg,
    rgba(174, 233, 231, 1) 0%,
    rgba(82, 166, 168, 1) 54%,
    rgba(50, 122, 135, 1) 100%
  );
  color: #fff;
  border-radius: 100px;
  width: 50px;
  height: 50px;
  border: 3px solid #fff;
}
</style>
