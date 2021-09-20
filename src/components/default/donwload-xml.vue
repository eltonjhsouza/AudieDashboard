<template>
  <q-card>
    <q-card-section>
      <div class="flex justify-between">
        <div class="text-h6">
          {{ $t("components.download_xml.export_contracts") }}
        </div>
        <q-btn round flat icon="close" @click="close_modal" />
      </div>
      <div class="q-mb-md text-body1">
        {{ $t("components.download_xml.export_contracts_info") }}
      </div>

      <div>
        <q-list>
          <q-item class="flex">
            <q-item-section>
              <div class="flex">
                <q-item-label
                  class="flex q-mt-sm"
                  style="margin: 4px 0 0 -14px;"
                  >{{
                    $t("components.download_xml.station_code")
                  }}</q-item-label
                >
                <q-item-label class="q-ml-sm">
                  <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                      <div>
                        {{ $t("components.download_xml.station_code_info") }}
                      </div>
                    </q-tooltip>
                  </q-icon>
                </q-item-label>
              </div>
            </q-item-section>
            <q-item-section thumbnail>
              <q-input
                style="width: 40%"
                dense
                outlined
                type="number"
                v-model="stationNumber"
                min="1"
              />
            </q-item-section>
          </q-item>
        </q-list>
        <div class="flex">
          <q-input
            class="col q-pr-sm"
            color="primary"
            outlined
            dense
            v-model="startDate"
            :label="$t('pages.contract.startDate')"
            mask="##-##-####"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxyStart"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="startDate"
                    :navigation-max-year-month="yearMonth"
                    :options="optionsFn"
                    @input="
                      {
                        $refs.qDateProxyStart.hide()
                      }
                    "
                    mask="DD-MM-YYYY"
                    color="orange"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            class="col"
            color="primary"
            outlined
            dense
            v-model="endDate"
            :label="$t('pages.contract.endDate')"
            mask="##-##-####"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxyEnd"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="endDate"
                    :navigation-max-year-month="yearMonth"
                    :options="optionsFn"
                    @input="
                      {
                        $refs.qDateProxyEnd.hide()
                      }
                    "
                    mask="DD-MM-YYYY"
                    color="orange"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="flex justify-end">
        <q-btn
          class="q-mt-sm"
          color="orange"
          no-caps
          @click="downloadFile"
          :label="$t('components.download_xml.export')"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { exportFile, Loading } from "quasar"
import { exportContract } from "src/components/service.js"

var dayjs = require("dayjs")
var customParseFormat = require("dayjs/plugin/customParseFormat")
var utc = require("dayjs/plugin/utc")
dayjs.extend(customParseFormat)
dayjs.extend(utc)

function getYearMonth() {
  let dt = new Date()
  let ano = dt.getFullYear()
  let mes = dt.getMonth() + 1

  if (mes < 10) mes = "0" + mes

  return ano + "/" + mes
}

export default {
  name: "DonwloadXml",
  data() {
    return {
      stationNumber: 1,
      files: null,
      uploadProgress: [],
      uploading: null,
      file: [],
      filename: "",
      date: { from: "", to: "" },
      startDate: "",
      endDate: "",
      sucessModal: false,
      yearMonth: getYearMonth()
    }
  },

  computed: {
    isUploading() {
      return this.uploading !== null
    },

    canUpload() {
      return this.files !== null
    }
  },

  mounted() {
    // console.log(this.$tours['tourImportXML'].isRunning)
    // if (this.$tours["tourImportXML"].isRunning)
    //   this.$tours["tourImportXML"].nextStep()
  },
  created() {
    let date = new Date()
    this.startDate = this.getLast30Days(date)
    this.endDate = this.formatDate(date)
  },
  methods: {
    cancelFile(index) {
      this.uploadProgress[index] = {
        ...this.uploadProgress[index],
        error: true,
        color: "orange-2"
      }
    },
    formatDate(value) {
      let dt = new Date(value)
      let ano = dt.getFullYear()
      let mes = dt.getMonth() + 1
      let dia = dt.getDate()

      if (dia < 10) dia = "0" + dia
      if (mes < 10) mes = "0" + mes

      return dia + "-" + mes + "-" + ano
    },
    getLast30Days() {
      let dt = new Date()
      dt.setDate(dt.getDate() - 30)
      let ano = dt.getFullYear()
      let mes = dt.getMonth() + 1
      let dia = dt.getDate()

      if (dia < 10) dia = "0" + dia
      if (mes < 10) mes = "0" + mes

      return dia + "-" + mes + "-" + ano
    },

    close_modal() {
      this.$root.$emit("close_modal_downloadXML")
    },

    closeMessage() {
      this.sucessModal = false
      this.close_modal()
    },

    openFile(files) {
      let self = this
      // console.log(files)
      // console.log(files[0].name)
      this.filename = files[0].name || "contratos.xml"
      var text = ""
      var reader = new FileReader()
      var onload = function(files) {
        text = reader.result
        // alert(text)
        self.file.push(text)
      }

      reader.onload = onload
      reader.readAsText(files[0])
    },

    downloadFile() {
      var convert = require("xml-js")
      var postData = {
        stationNumber: this.stationNumber,
        startDate: dayjs.utc(this.startDate, "DD-MM-YYYY").format(),
        endDate: dayjs.utc(this.endDate, "DD-MM-YYYY").format()
      }

      Loading.show()
      exportContract(postData).then((response) => {
        const status = exportFile("Contrato.xml", response)
        if (status === true) {
          console.log("export")
          Loading.hide()
        } else {
          console.log("Error: " + status)
          Loading.hide()
        }
      })
    },

    optionsFn(date) {
      let dt = new Date()
      let ano = dt.getFullYear()
      let mes = dt.getMonth() + 1
      let dia = dt.getDate()

      if (dia < 10) dia = "0" + dia
      if (mes < 10) mes = "0" + mes

      let formatedDate = ano + "/" + mes + "/" + dia

      return date <= formatedDate
    }
  },

  beforeDestroy() {
    clearTimeout(this.uploading)
  }
}
</script>
