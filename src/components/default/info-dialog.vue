<template>
  <q-card>
    <q-card-section class="flex justify-between">
      <div class="q-mr-md text-h5">
        {{ $t("components.station_info.title") }}
      </div>
      <q-btn dense round flat color="black" icon="close" @click="close_modal" />
    </q-card-section>
    <q-card-section>
      <q-list dense>
        <q-item>
          <q-item-section>
            <q-item-label header>{{ $t("components.station") }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ currentStation.stationName }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label header>{{ "ID" }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ currentStation.stationId }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label header>{{
              $t("components.station_info.subscriber")
            }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{
              currentStation.isSubscriber ? $t("pages.yes") : $t("pages.no")
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-md" />

        <q-item>
          <q-item-section>
            <q-item-label header>{{
              $t("components.station_info.user")
            }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ user.ContactName }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label header>{{
              $t("components.station_info.email")
            }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label header>{{
              $t("components.station_info.email_verified")
            }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{
              user.EmailConfirmed ? $t("pages.yes") : $t("pages.no")
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-md" />

        <q-item>
          <q-item-section>
            <q-item-label header>{{
              $t("components.station_info.operator")
            }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ currentOperator.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label header>{{
              $t("components.station_info.profile_permission")
            }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{
              currentOperator.profileName
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "InfoDialog",
  computed: {
    ...mapGetters({
      user: "currentUser",
      currentStation: "selectedStation",
      currentOperator: "selectedOperator"
    })
  },
  methods: {
    close_modal() {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.q-item__label--header {
  padding: 0px !important;
}
</style>
