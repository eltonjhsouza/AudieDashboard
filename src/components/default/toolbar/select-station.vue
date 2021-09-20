<template>
  <span class="flex responsive-menu q-mr-md">
    <p style="margin:0px; padding:12px 3px; font-size:14px;">
      {{ $t("components.station") }}
    </p>
    <q-btn-dropdown flat no-caps :label="currentStation.stationName">
      <!-- dropdown content -->
      <q-list>
        <q-item
          v-for="item in getStationList"
          :key="item.stationId"
          clickable
          v-close-popup
          @click="changeStation(item.stationId)"
        >
          <q-item-section>
            <q-item-label>{{ item.stationName }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              v-if="
                item.remainingDays !== '' &&
                  item.remainingDays > 0 &&
                  !item.isSubscriber
              "
              color="grey"
              name="error_outline"
            />
            <q-icon
              v-if="
                item.remainingDays !== '' &&
                  item.remainingDays <= 0 &&
                  !item.isSubscriber
              "
              name="error_outline"
              color="negative"
            />
            <q-tooltip
              v-if="
                item.remainingDays !== '' &&
                  item.remainingDays >= 15 &&
                  !item.isSubscriber
              "
              class="flex text-center"
            >
              {{ $t("components.toolbar.trialSubscription") }}
            </q-tooltip>

            <q-tooltip
              v-if="
                item.remainingDays !== '' &&
                  item.remainingDays > 0 &&
                  item.remainingDays < 15 &&
                  !item.isSubscriber
              "
              class="flex text-center"
            >
              <div>{{ $t("components.toolbar.expire_in") }}</div>
              <div>{{ formatDate(item.expire) }}</div>
            </q-tooltip>

            <q-tooltip
              v-if="
                item.remainingDays !== '' &&
                  item.remainingDays <= 0 &&
                  !item.isSubscriber
              "
              class="flex text-center"
            >
              <div>{{ $t("components.toolbar.expire_at") }}</div>
              <div>{{ formatDate(item.expire) }}</div>
            </q-tooltip>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </span>
</template>

<script>
import { Loading } from "quasar"
import {
  getInstances,
  setTimezone,
  setStation
} from "src/pages/myaccount/service.js"
import { getIntanceContent } from "src/components/service"
import { mapGetters, mapActions } from "vuex"
import localforage from "localforage"
import isEmpty from "lodash/isEmpty"

const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: "selectStation",
  data() {
    return {
      lstStations: []
    }
  },
  computed: {
    ...mapGetters({
      timezone: "timezone",
      getStationList: "getStationList",
      currentStation: "selectedStation",
      currentLanguage: "currentLanguage"
    })
  },
  methods: {
    ...mapActions({
      set_timezone: "setTimezone",
      set_station: "setStation",
      set_station_list: "setStationList",
      set_cloud_storage: "setCloudStorage"
    }),
    getInstances() {
      let self = this
      Loading.show()
      getInstances()
        .then((response) => {
          Loading.hide()
          if (response.length > 0) {
            response.forEach((obj) => {
              obj.stations.forEach((station) => {
                let item = {
                  ...obj,
                  ...station,
                  stationId: station.id,
                  stationName: station.name
                }
                self.lstStations.push(item)
              })
            })
            // Armazena todos os stations, possibilitando trocar de station na aplicação
            this.set_station_list(this.lstStations)
              .then(() => {})
              .catch((err) => console.log(err))
            localforage.setItem("APP_STATION_LIST", this.lstStations)

            if (isEmpty(self.currentStation)) {
              self.selectStation(sessionStorage.getItem("stationId"))
            } else {
              self.selectStation(self.currentStation.stationId)
            }
          }
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
          console.log(error.message)
        })
    },
    getIntanceContent() {
      let self = this
      Loading.show()
      getIntanceContent()
        .then((response) => {
          let cloudStorage = {
            ...response,
            percentUsed: (response.total.size / response.storageCapacity) * 100
          }
          self
            .set_cloud_storage(cloudStorage)
            .then(() => {})
            .catch((err) => {
              console.log(err)
            })
          Loading.hide()
        })
        .catch((err) => {
          Loading.hide()
          console.log(err)
        })
    },
    isStationValid(station) {
      if (
        station.remainingDays !== "" &&
        station.remainingDays <= 0 &&
        !station.isSubscriber
      ) {
        return false
      }
      return true
    },
    changeStation(stationId) {
      let self = this
      this.getStationList.forEach((element) => {
        if (element.stationId === stationId) {
          let selectedStation = {
            proprietary: element.proprietary,
            create_quickstart: element.createQuickStart,
            customerId: element.customerId,
            instanceId: element.instanceId,
            instanceName: element.instanceName,
            stationId: element.stationId,
            stationName: element.stationName
          }

          if (this.isStationValid(element)) {
            // Armazena o station selecionado no Vuex
            this.set_station(selectedStation)
              .then(() => {
                setStation()
                  .then((response) => {
                    Loading.hide()
                    // console.log(response)
                    // Carrega o Station selecionado e o timezone do station
                    console.log("set_station")
                    sessionStorage.setItem(
                      "stationId",
                      selectedStation.stationId
                    )
                    localforage.setItem("APP_SELECTED_STATION", selectedStation)
                    self.setTimezone()
                    self.$router.push({ name: "operators" })
                  })
                  .catch((error) => {
                    Loading.hide()
                    // console.log(error)
                    // console.log(error.message)
                  })
              })
              .catch((err) => console.log(err))
            // this.setTimezone()
          } else {
            this.$q
              .dialog({
                title: this.$t("components.toolbar.expire_dialog_title"),
                message: this.$t("components.toolbar.expire_dialog_message"),
                class: "separate-btn-dialog",
                cancel: {
                  label: this.$t("components.skip"),
                  outline: true,
                  color: "grey",
                  "no-caps": true
                },
                ok: {
                  label: this.$t("components.access_store"),
                  "no-caps": true,
                  color: "teal"
                },
                persistent: true
              })
              .onOk(() => {
                window.open(
                  "https://store.playlistsolutions.com/playliststore",
                  "_label"
                )
              })
              .onCancel(() => {
                console.log(">>>> Cancel")
              })
          }
        }
      })
    },
    selectStation(stationId) {
      let self = this
      this.getStationList.forEach((element) => {
        if (element.stationId === stationId) {
          let selectedStation = element

          if (this.isStationValid(element)) {
            // Armazena o station selecionado no Vuex
            this.set_station(selectedStation)
              .then(() => {
                setStation()
                  .then((response) => {
                    Loading.hide()
                    // console.log(response)
                    // Carrega o Station selecionado e o timezone do station
                    console.log("set_station")
                    sessionStorage.setItem(
                      "stationId",
                      selectedStation.stationId
                    )
                    localforage.setItem("APP_SELECTED_STATION", selectedStation)
                    self.setTimezone()
                  })
                  .catch((error) => {
                    Loading.hide()
                    // console.log(error)
                    // console.log(error.message)
                  })
              })
              .catch((err) => console.log(err))
            // this.setTimezone()
          } else {
            this.$q
              .dialog({
                title: this.$t("components.toolbar.expire_dialog_title"),
                message: this.$t("components.toolbar.expire_dialog_message"),
                class: "separate-btn-dialog",
                cancel: {
                  label: this.$t("components.skip"),
                  outline: true,
                  color: "grey",
                  "no-caps": true
                },
                ok: {
                  label: this.$t("components.access_store"),
                  "no-caps": true,
                  color: "teal"
                },
                persistent: true
              })
              .onOk(() => {
                window.open(
                  "https://store.playlistsolutions.com/playliststore",
                  "_label"
                )
              })
              .onCancel(() => {
                console.log(">>>> Cancel")
              })
          }
        }
      })
    },
    get_timezone() {
      const tz = dayjs.tz.guess()
      this.set_timezone(tz)
        .then(() => {})
        .catch((err) => console.log(err))
      console.log(this.timezone)
    },
    setTimezone() {
      let self = this
      console.log("setTimezone")
      if (isEmpty(this.timezone)) {
        this.get_timezone()
      }
      var postData = {
        TimeZoneId: this.timezone,
        StationId: this.currentStation.stationId
      }
      Loading.show()
      // Load do station no server
      setTimezone(postData)
        .then((response) => {
          Loading.hide()
          console.log("load server")
          self.getIntanceContent()
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
          console.log(error.message)
          self.getIntanceContent()
        })
    },
    formatDate(type) {
      let dt = new Date(type)
      let ano = dt.getFullYear()
      let mes = dt.getMonth() + 1
      let dia = dt.getDate()

      let lang = this.currentLanguage
      let meses = this.getMonths(lang)
      let formated

      if (dia < 10) dia = "0" + dia
      if (mes < 10) mes = "0" + mes

      if (lang === "pt-br") formated = dia + "/" + mes + "/" + ano
      if (lang === "es") formated = dia + "/" + mes + "/" + ano

      if (lang === "en-us") {
        formated = meses[parseInt(mes) - 1] + ", " + dia + " of " + ano
      }

      return formated
    },
    getMonths(lang) {
      let mesesPt = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ]
      let mesesEn = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
      let mesesEs = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ]

      if (lang === "pt-br") return mesesPt
      if (lang === "en-us") return mesesEn
      if (lang === "es") return mesesEs
    },
    getHoursEn(hour) {
      if (hour === 0) return "12"
      else if (hour === 13) return "1"
      else if (hour === 14) return "2"
      else if (hour === 15) return "3"
      else if (hour === 16) return "4"
      else if (hour === 17) return "5"
      else if (hour === 18) return "6"
      else if (hour === 19) return "7"
      else if (hour === 20) return "8"
      else if (hour === 21) return "9"
      else if (hour === 22) return "10"
      else if (hour === 23) return "11"
      else if (hour === 24) return "12"
      else return hour
    }
  },
  created() {
    this.getInstances()
  }
}
</script>
