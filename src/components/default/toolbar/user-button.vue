<template>
  <span>
    <q-btn-dropdown
      flat
      no-caps
      color="white"
      class="responsive-menu q-mr-md q-ma-xs"
      :label="currentOperator.name + ' (' + currentOperator.profileName + ')'"
    >
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>{{ user.ContactName }}</q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>
              <q-icon class="q-mr-md" name="fas fa-user-circle" size="18px" />
            </q-item-label>
          </q-item-section>
          <q-tooltip :offset="[-10, -10]" content-style="font-size: 12px">
            <div>{{ $t("components.toolbar.aires_account") }}</div>
          </q-tooltip>
        </q-item>

        <q-separator />

        <q-item clickable @click="gotoOperators()">
          <q-item-section>
            <q-item-label>{{
              $t("components.toolbar.change_operator")
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label
              ><q-icon class="q-mr-md" name="fas fa-sync-alt" size="16px"
            /></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="doLogout()">
          <q-item-section>
            <q-item-label>{{ $t("components.toolbar.logout") }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label
              ><q-icon class="q-mr-md" name="fas fa-sign-out-alt" size="16px"
            /></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </span>
</template>

<script>
import { getOperatorsBySoftware } from "src/pages/myaccount/service.js"
import { mapGetters, mapActions } from "vuex"
import isEmpty from "lodash/isEmpty"

export default {
  name: "UserButton",
  props: ["data"],
  data() {
    return {
      showPane: false,
      lstOperators: []
    }
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      currentOperator: "selectedOperator"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout",
      set_operator: "setOperator"
    }),
    user_acronym(str) {
      let matches = ""
      if (str != null) {
        matches = str.match(/\b(\w)/g)
        matches = matches[0]
      }
      return matches
    },
    showOptions() {
      this.showPane = !this.data
      this.$emit("showPane", this.showPane)
    },
    gotoOperators() {
      this.$router.push({ name: "operators" })
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
          return this.logout()
            .then(() => {})
            .catch((err) => {
              console.log(err)
            })
        })
        .onCancel(() => {
          console.log(">>>> Cancel")
        })
    },
    getOperators() {
      let self = this

      getOperatorsBySoftware(15)
        .then((response) => {
          this.lstOperators = response

          if (isEmpty(self.currentOperator)) {
            let operatorName = sessionStorage.getItem("operatorName")
            let selectedOperator = response.find((el) => {
              return el.name === operatorName
            })

            if (!isEmpty(selectedOperator)) {
              self
                .set_operator(selectedOperator)
                .then(() => {
                  if (this.$route.name !== "new") {
                    this.$router.push({ name: "new" })
                  }
                })
                .catch((err) => console.log(err))
            }
          } else {
            let operator = self.currentOperator
            self
              .set_operator(operator)
              .then(() => {
                if (this.$route.name !== "new") {
                  this.$router.push({ name: "new" })
                }
              })
              .catch((err) => console.log(err))
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getOperators()
  }
}
</script>
