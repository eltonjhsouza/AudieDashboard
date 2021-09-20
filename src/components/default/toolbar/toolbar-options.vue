<template>
  <div id="v-step-0" class="flex">
    <select-station />
    <user-button :showPane="showPane" @showPane="updatePane" />
    <select-language />
    <show-apps />
  </div>
</template>

<script>
import selectStation from "./select-station.vue"
import selectLanguage from "./select-language.vue"
import showApps from "./show-apps.vue"
import userButton from "./user-button.vue"
export default {
  name: "ToolbarOptions",
  props: ["data"],
  data() {
    return {
      showPane: false
    }
  },
  methods: {
    updatePane(event) {
      this.showPane = event
      this.$emit("showPane", this.showPane)
    }
  },
  created() {
    this.showPane = this.data
  },
  components: {
    userButton,
    showApps,
    selectLanguage,
    selectStation
  }
}
</script>
