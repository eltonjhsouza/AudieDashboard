<template>
  <q-page class="flex flex-center">
    <div style="padding: 50px; width:500px;">
      <!--div--
        v-if="showCreateInstance"
        class="q-mb-md text-subtitle1"
        style="text-align:center;"
      >
        {{ $t("myaccount.create_station_message") }}
      </!--div-->
      <div class="q-mb-md text-subtitle1" style="text-align:center;">
        {{ 'Selecione uma Emissora' }}
      </div>

      <div id="style-4" class="scroll-list">
        <q-list dense bordered padding class="rounded-borders">
          <q-item
            clickable
            v-ripple
            v-for="(station, index) in lstStations"
            @click.native="selectStation(station)"
            :station="station"
            :key="index"
          >
            <q-item-section>
              <q-item-label>{{ station.stationName }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-icon
                v-if="
                  station.remainingDays !== '' &&
                    station.remainingDays > 0 &&
                    !station.isSubscriber
                "
                color="grey"
                name="error_outline"
              />
              <q-icon
                v-if="
                  station.remainingDays !== '' &&
                    station.remainingDays <= 0 &&
                    !station.isSubscriber
                "
                name="error_outline"
                color="negative"
              />
              <q-tooltip
                v-if="
                  station.remainingDays !== '' &&
                    station.remainingDays >= 15 &&
                    !station.isSubscriber
                "
                class="flex text-center"
              >
                {{ "Assinatura Trial" }}
              </q-tooltip>

              <q-tooltip
                v-if="
                  station.remainingDays !== '' &&
                    station.remainingDays > 0 &&
                    station.remainingDays < 15 &&
                    !station.isSubscriber
                "
                class="flex text-center"
              >
                <div>{{ "Irá expirar em " }}</div>
                <div>{{ formatDate(station.expire) }}</div>
              </q-tooltip>

              <q-tooltip
                v-if="
                  station.remainingDays !== '' &&
                    station.remainingDays <= 0 &&
                    !station.isSubscriber
                "
                class="flex text-center"
              >
                <div>{{ "Expirado em " }}</div>
                <div>{{ formatDate(station.expire) }}</div>
              </q-tooltip>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-btn
        class="full-width q-mt-md"
        v-if="showCreateInstance"
        dense
        color="orange"
        :label="$t('myaccount.create_station')"
        @click="createInstance"
      />
    </div>
  </q-page>
</template>

<script>
import { Loading } from "quasar"
import {
  getInstances,
  setTimezone,
  setStation,
  createInstance
} from "./service.js"
import { mapGetters, mapActions } from "vuex"
import localforage from "localforage"
var moment = require("moment-timezone")

export default {
  name: "PageStations",
  data() {
    return {
      lstStations: [],
      lang: "",
      showCreateInstance: false
    }
  },
  computed: {
    ...mapGetters({
      timezone: "timezone",
      currentStation: "selectedStation",
      currentLanguage: "currentLanguage"
    })
  },
  methods: {
    ...mapActions({
      set_timezone: "setTimezone",
      set_language: "setLanguage",
      set_station: "setStation",
      set_station_list: "setStationList"
    }),
    gotoLogin() {
      sessionStorage.clear()
      this.$router.push({ name: "login" })
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
    selectStation(station) {
      let self = this
      let selectedStation = station

      if (this.isStationValid(station)) {
        Loading.show()
        // Armazena todos os stations, possibilitando trocar de station na aplicação
        this.set_station_list(this.lstStations)
          .then(() => {})
          .catch((err) => console.log(err))
        localforage.setItem("APP_STATION_LIST", this.lstStations)
        // Armazena o station selecionado no Vuex
        this.set_station(selectedStation)
          .then(() => {
            setStation()
              .then((response) => {
                Loading.hide()
                // console.log(response)
                // Carrega o Station selecionado e o timezone do station
                self.callSetTimezone()
              })
              .catch((error) => {
                Loading.hide()
                // console.log(error)
                // console.log(error.message)
              })
          })
          .catch((err) => console.log(err))
        sessionStorage.setItem("stationId", selectedStation.stationId)
        localforage.setItem("APP_SELECTED_STATION", selectedStation)
      } else {
        this.$q
          .dialog({
            title: "Seu período de teste acabou",
            message:
              "Continue utilizando tudo que nossa aplicação tem a oferecer. Faça agora sua assinatura!",
            class: "separate-btn-dialog",
            cancel: {
              label: "Sair",
              outline: true,
              color: "grey",
              "no-caps": true
            },
            ok: {
              label: "Acessar Loja",
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
    },
    callSetTimezone() {
      let self = this
      let postData = {
        TimeZoneId: this.timezone,
        StationId: this.currentStation.stationId
      }

      Loading.show()
      // Load do station no server
      setTimezone(postData)
        .then(function(response) {
          console.log("loaded server")
          // self.$router.push({ name: "new" })
          self.$router.push({ name: "operators" })
        })
        .catch(function(error) {
          console.log("error loading server")
          console.log(error)
          console.log(error.message)
          self.$router.push({ name: "new" })
        })
    },
    getInstances() {
      let self = this
      self.lstStations = []
      self.showCreateInstance = false

      Loading.show()
      getInstances()
        .then((response) => {
          Loading.hide()
          if (response.length > 0) {
            self.showInstances = true

            // Se proprietary for igual a zero. Permitir instância própria
            if (response.filter((e) => e.proprietary === true).length === 0) {
              self.showCreateInstance = true
            }

            response.forEach((obj) => {
              obj.stations.forEach((station) => {
                let item = {
                  ...obj,
                  ...station,
                  stationId: station.id,
                  stationName: station.name
                }
                self.lstStations.push(item)
                console.log(self.lstStations)
              })
            })
          } else {
            // self.checkInvites()
            self.showCreateInstance = true
          }
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
          console.log(error.message)
        })
    },
    get_timezone() {
      let tz = moment.tz.guess()
      this.set_timezone(tz)
        .then(() => {})
        .catch((err) => console.log(err))
      console.log(this.timezone)
    },
    createInstance() {
      let self = this
      Loading.show()
      createInstance()
        .then((response) => {
          Loading.hide()
          self.getInstances()
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
          console.log(error.message)
        })
    },
    formatDate(type) {
      let dt = new Date(type)
      let ano = dt.getFullYear()
      let mes = dt.getMonth() + 1
      let dia = dt.getDate()
      // let hora = dt.getHours()
      // let min = dt.getMinutes()

      let lang = this.currentLanguage
      let meses = this.getMonths(lang)
      // let AmPm = ''
      let formated

      if (dia < 10) dia = "0" + dia
      if (mes < 10) mes = "0" + mes
      // if (min < 10) min = '0' + min

      if (lang === "pt-br") formated = dia + "/" + mes + "/" + ano // + ' ' + hora + ':' + min
      if (lang === "es") formated = dia + "/" + mes + "/" + ano // + ' ' + hora + ':' + min

      if (lang === "en-us") {
        // if (hora >= 12) AmPm = 'pm'
        // if (hora < 12) AmPm = 'am'
        formated = meses[parseInt(mes) - 1] + ", " + dia + " of " + ano // + ' ' + this.getHoursEn(hora) + ':' + min + ' ' + AmPm
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
    console.clear()
    this.get_timezone()
    this.getInstances()
  }
}
</script>

<style>
.scroll-list {
  border: 1px solid #ccc;
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  position: relative;
}
.q-list {
  border: none;
}
.separate-btn-dialog > .q-card__actions {
  justify-content: space-between;
  padding: 16px;
}

#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
  padding-right: 5px;
}

#style-4::-webkit-scrollbar-thumb {
  background-color: #9e9e9e;
  border: 2px solid #9e9e9e;
}
</style>
