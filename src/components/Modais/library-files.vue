<template>
  <div>
    <q-card>
      <q-card-section
        class="flex"
        style="justify-content:space-between; padding-bottom:0px;"
      >
        <span class="text-h5">{{ 'Adicionar Imagem' }}</span>
        <q-btn
          flat
          dense
          round
          size="12px"
          icon="close"
          @click="close_modal"
          style="margin:10px;"
        />
      </q-card-section>
      <q-card-section
        class="q-pa-sm"
        style="padding-top:0px; max-height:350px; overflow: hidden;"
      >
        <transition-group :name="back ? 'slideback' : 'slide'">
          <div v-show="currentIndex === 1" key="1">
            <div class="flex justify-around">
              <q-btn
                class="q-ma-sm"
                size="sm"
                color="teal-9"
                @click="selectItem(1)"
                style="cursor: pointer;"
              />
              <q-btn
                class="q-ma-sm"
                :outline="selected[0].type !== item.type"
                size="sm"
                color="teal-9"
                v-for="(item, index) in libraries"
                :key="index"
                @click="selectItem(item)"
                style="cursor: pointer;"
              >
                <q-icon
                  class="q-mr-xs"
                  :name="item.icon"
                  size="15px"
                  :color="checkColor(item)"
                />
                {{ item.name }}
              </q-btn>
            </div>
            <div>
              <div id="uploader">
                <a id="uploader_button" href="javascript:" />
                <div
                  id="drop_music"
                  @dragover="dragging = true"
                  @dragleave="dragging = false"
                >
                  <a
                    id="music"
                    href="javascript:"
                    @click="sendVal(selected[0].type)"
                    class="flex justify-end"
                    style="text-decoration:none; margin-bottom:5px; margin-top:5px;"
                  >
                    <q-btn
                      flat
                      dense
                      color="teal"
                      icon="cloud_upload"
                      :label="$t('components.cloud_upload')"
                      class="q-ml-md full-width bg-teal-1"
                    >
                    </q-btn>
                  </a>
                  <div
                    v-if="dragging"
                    @dragover.prevent
                    @drop="sendVal(selected[0].type)"
                    class="q-pa-md droparea flex flex-center"
                    style="height: 240px;"
                  >
                    <div
                      style="padding-top:50px; padding-bottom:50px; text-align:center;"
                    >
                      <q-icon
                        name="far fa-folder-open"
                        style="color:#ddd; font-size:100px;"
                      />
                      <p
                        class="q-headline text-weight-light"
                        style="color:#ddd;"
                      >
                        {{ $t("components.drag_drop_files") }}
                      </p>
                    </div>
                  </div>
                  <div v-if="!dragging">
                    <q-table
                      flat
                      square
                      dense
                      :data="listFiles"
                      :columns="filesColumns"
                      :filter="filter"
                      hide-bottom
                      selection="single"
                      :selected.sync="selectedFiles"
                      row-key="fileId"
                      :pagination.sync="paginationControl"
                      style="height: 240px;"
                    >
                      <template slot="top" slot-scope="props" :props="props">
                        <q-input
                          outlined
                          class="full-width q-mb-sm"
                          color="grey-10"
                          dense
                          debounce="300"
                          v-model="filter"
                          :label="$t('pages.search')"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </template>
                      <!-- LIST MEDIAS -->
                      <q-tr slot="body" slot-scope="props" :props="props">
                        <q-td auto-width>
                          <q-checkbox
                            class="q-mr-md"
                            dense
                            color="primary"
                            v-model="options"
                            :val="props.row"
                            size="sm"
                          />
                          <q-btn
                            class="q-mt-xs q-mb-xs"
                            dense
                            round
                            color="secondary"
                            size="xs"
                            @click="showPlayer(props.row)"
                          >
                            <q-icon
                              :id="props.row.fileId"
                              name="play_arrow"
                              size="12px"
                            />
                          </q-btn>
                        </q-td>
                        <q-td
                          key="filename"
                          :props="props"
                          @click="selectItemFiles(props.row)"
                        >
                          <div>{{ props.row.filename }}</div>
                        </q-td>
                        <q-td
                          key="duration"
                          :props="props"
                          @click="selectItemFiles(props.row)"
                        >
                          <div>{{ toTimeString(props.row.duration) }}</div>
                        </q-td>
                        <q-td
                          key="size"
                          :props="props"
                          @click="selectItemFiles(props.row)"
                        >
                          <div>{{ formatBytes(props.row.size) }}</div>
                        </q-td>
                      </q-tr>
                      <!-- LIST MEDIAS -->
                    </q-table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="currentIndex === 2" key="2">
            <!-- <text-editor :text="media.text" :isEdit="isEdit"></text-editor> -->
          </div>
        </transition-group>
      </q-card-section>
      <q-card-section v-if="showUploadProgress">
        <div class="full-width">
          <div class="flex text-start">
            <div>{{ currentFile.name }}</div>
            <div v-if="errorIcon"><q-icon name="warning" color="red-8" /></div>
          </div>
          <div>
            <q-linear-progress
              size="15px"
              :value="progress.percent / 100"
              color="primary"
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  transparent
                  text-color="primary"
                  :label="progress.percent + '%'"
                />
              </div>
            </q-linear-progress>
          </div>
          <div class="flex justify-between">
            <div class="text-caption" v-if="filesArray.length != 0">
              {{ progress.uploaded + 1 }} {{ $t("components.of") }}
              {{ filesArray.length }}
            </div>
            <div class="text-caption" v-if="filesArray.length != 0">
              {{ formatSize(uploadedBytes) }} / {{ formatSize(totalBytes) }}
            </div>
            <div class="text-caption" v-if="filesArray.length != 0">
              {{ timeRemaining }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="currentIndex !== 2" class="q-pa-sm">
        <div class="q-pa-sm flex justify-between">
          <q-btn
            class="q-mt-md"
            outline
            color="grey-8"
            no-caps
            :label="$t('pages.cancel')"
            @click="close_modal"
          />
          <q-btn
            v-if="isEdit && currentIndex === 0"
            class="q-mt-md"
            color="orange"
            no-caps
            :label="$t('pages.edit')"
            @click="beforeEditMedia"
          />
          <q-btn
            v-if="!isEdit && currentIndex === 0"
            class="q-mt-md"
            color="orange"
            no-caps
            :label="$t('pages.contract.attachMedia')"
            @click="beforeAddMedia"
          />
          <div v-if="currentIndex === 1">
            <q-btn
              color="orange"
              icon="add"
              :label="$t('components.add_media')"
              class="q-ml-md"
              @click="selectItemFiles(options)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showModalPlayer" seamless position="bottom">
      <player-tool :selectedMediaFile="selectedMediaFile" :isAudio="isAudio" />
    </q-dialog>
  </div>
</template>

<script>
import { Loading, date } from "quasar"
import {
  getLibraryFiles,
  getFileById,
  s3policy,
  deleteFile,
  setFileAsUploded,
  getIntanceContent,
  saveFile
} from "src/components/service"
// import { mapGetters, mapActions } from "vuex"

import plupload from "plupload"
import Timer from "easytimer"
// import jsmediatags from "jsmediatags"

var moment = require("moment")
var timer = new Timer()

// function generateOptions(element) {
//   return {
//     contractId: element.contractId,
//     fileId: element.fileId,
//     mediaType: element.mediaType,
//     description: element.filename,
//     duration: element.duration,
//     sequence: element.sequence,
//     validityStartDate: null,
//     validityEndDate: null,
//     undefinedDate: true,
//     pause: false,
//     loop: false,
//     text: element.text
//   }
// }

function getYearMonth() {
  let dt = new Date()
  let ano = dt.getFullYear()
  let mes = dt.getMonth() + 1

  if (mes < 10) mes = "0" + mes

  return ano + "/" + mes
}

export default {
  name: "LibraryFiles",
  props: {
    contractMedia: Array,
    selectedItem: Array,
    type: String
  },
  data() {
    return {
      yearMonth: getYearMonth(),
      instanceID: "",
      uploadInstance: undefined,
      total_time: 0,
      instance_content: 0,
      storage_limit: 1000000000,
      total_capacity: 0,
      showLibraries: true,
      seqLenght: 0,
      libraries: [
        { type: 0, name: "Músicas", icon: "fas fa-folder-open" },
        { type: 1, name: "Comerciais", icon: "volume_up" },
        { type: 2, name: "Vinhetas", icon: "fas fa-signature" },
        { type: 5, name: "Trilhas", icon: "fas fa-music" },
        { type: 3, name: "Geral", icon: "fas fa-headphones" },
        { type: 4, name: "Gravações", icon: "mic" }
      ],
      selected: [{ type: -1 }],
      listFiles: [],
      filesColumns: [
        {
          name: "filename",
          required: true,
          label: "Arquivo",
          align: "left",
          field: "filename",
          sortable: true
        },
        {
          name: "duration",
          required: true,
          label: "Duration",
          align: "center",
          field: "duration",
          sortable: true
        },
        {
          name: "size",
          required: true,
          label: "Size",
          align: "center",
          field: "size",
          sortable: true
        }
      ],
      filter: "",
      paginationControl: { rowsPerPage: 0, page: 1 },
      selectedFiles: [],
      options: [],
      currentAudioFile: undefined,
      current_icon: undefined,
      totalTime: 0,
      count: 0,
      useDeterminate: false,
      back: false,
      currentIndex: 1,
      isEdit: false,
      mediaType: {
        label: "Áudio",
        value: 1
      },
      mediaFile: [],
      media: [],
      postDatas: {
        commands: []
      },
      undefinedDate: true,
      validityStartDate: "",
      validityEndDate: "",
      letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      showModalPlayer: false,
      isAudio: true,
      isPlaying: false,
      selectedMediaFile: {
        currentTime: 0
      },
      dragging: false,
      errorIcon: false,
      progress: {
        percent: 0,
        uploaded: 0
      },
      lstFiles: [],
      filesMapChangeTracker: 1,
      files: new Map(),
      currentFile: {},
      countUpload: 0,
      countFiles: 0,
      showUploadProgress: false,
      error: {
        dtStart: false,
        dtEnd: false,
        text: false,
        description: false,
        duration: false
      }
    }
  },
  computed: {
    // ...mapGetters({
    //   currentLanguage: "currentLanguage",
    //   currentStation: "selectedStation",
    //   selectedMedia: "selectedMedia",
    //   cloudStorage: "cloudStorage"
    // }),
    filesArray() {
      return this.filesMapChangeTracker && Array.from(this.files)
    },
    filesMap() {
      return this.filesArray.map((item, index) => {
        item[1].index = index
        return item[1]
      })
    },
    uploadedBytes() {
      let files = this.filesArray
      if (files.length <= 0) return 0
      let load = files.map((i) => i[1].loaded).reduce((vb, va) => vb + va)
      return this.totalBytes - load
    },
    totalBytes() {
      let files = this.filesArray
      if (files.length <= 0) return 0
      let size = files.map((i) => i[1].size).reduce((vb, va) => vb + va)
      return size
    },
    timeRemaining() {
      let pSec = this.uploadedBytes / this.progress.bytesPerSec
      if (isNaN(pSec) || !isFinite(pSec)) pSec = 0
      let time = ""
      let s = moment.duration(pSec, "seconds").seconds()
      time = `${s} s`
      let m = moment.duration(pSec, "seconds").minutes()
      if (m > 0) time = `${m} min ` + time
      let h = moment.duration(pSec, "seconds").hours()
      if (h > 0) time = `${h} hs  ` + time
      let d = moment.duration(pSec, "seconds").days()
      if (d > 0) time = `${d} d ` + time
      return time
    }
  },
  methods: {
    // ...mapActions({
    //   set_cloud_storage: "setCloudStorage"
    // }),
    close_modal() {
      this.isEdit = false
      if (this.type === "contract") {
        bus.$emit("close_modal_contract_mediafiles")
      }
      if (this.type === "station") {
        bus.$emit("close_modal_station_mediafiles")
      }
    },
    goto(tab) {
      this.currentIndex = tab

      if (tab === 0) {
        this.back = true
      } else {
        this.back = false
      }

      if (tab === 1) {
        let item = { type: 1 }
        this.selectItem(item)
      }
    },
    next() {
      this.back = false
      this.currentIndex++

      let item = { type: 1 }
      this.selectItem(item)
    },
    prev() {
      this.back = true
      this.currentIndex--
    },
    getLibraryFiles(type) {
      console.log('getLibraryFiles')

      let self = this
      self.totalTime = 0
      self.listFiles = []

      Loading.show()
      getLibraryFiles(type)
        .then((response) => {
          Loading.hide()
          console.log(response)

          if (type === 4) {
            response.sort((a, b) =>
              a.modifiedDate < b.modifiedDate
                ? 1
                : b.modifiedDate < a.modifiedDate
                ? -1
                : 0
            )
          } else {
            response.sort((a, b) =>
              a.filename > b.filename ? 1 : b.filename > a.filename ? -1 : 0
            )
          }

          response.forEach((element) => {
            if (element.fileType === type) {
              element.currentTime = 0
              element.archive = element.filename
              element.filename = self.getTitle(element)
              element.artist = self.getArtist(element)
              self.listFiles.push(element)
              self.totalTime += element.duration
            }
          })
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
        })
    },
    getFileById(id) {
      let self = this
      Loading.show()
      let fileId = id.replace(/-/g, "")
      getFileById(fileId)
        .then((response) => {
          // console.log(response)
          self.mediaFile.filename = self.getTitle(response)
          self.mediaFile.fileId = response.fileId

          if (this.mediaType.value === 1) {
            self.media.description = self.getTitle(response)
          }
          Loading.hide()
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
        })
    },
    checkColor(item) {
      if (this.selected[0].type === item.type) return "white"
      return "my-teal"
    },
    selectItem(row) {
      this.selectedFiles = []
      this.mediaFile = []
      this.selected = []
      this.selected.push(row)

      this.getLibraryFiles(1)
    },
    selectItemFiles(row) {
      this.selectedFiles = []
      console.log(row)
      this.selectedFiles.push(row)
    },
    getTitle(row) {
      let name = ""
      let format = "." + this.getFileFormat(row.filename)
      if (row.mediaInfo) {
        if (row.mediaInfo.Title) {
          return row.mediaInfo.Title
        } else {
          name = row.filename.replace(format, "")
          return name
        }
      } else {
        name = row.filename.replace(format, "")
        return name
      }
    },
    getArtist(row) {
      if (row.playlists) {
        if (row.playlists.Artist) {
          return row.playlists.Artist
        } else {
          return "-"
        }
      } else {
        return "-"
      }
    },
    getFileFormat(name) {
      let re = /(?:\.([^.]+))?$/
      let ext = re.exec(name)[1]

      if (ext !== undefined) return ext
      else return ""
    },
    toTimeString(value) {
      var secNum = parseInt(value, 10) // don't forget the second param
      var hours = Math.floor(secNum / 3600)
      var minutes = Math.floor((secNum - hours * 3600) / 60)
      var seconds = secNum - hours * 3600 - minutes * 60

      if (hours < 10) {
        hours = "0" + hours
      }
      if (minutes < 10) {
        minutes = "0" + minutes
      }
      if (seconds < 10) {
        seconds = "0" + seconds
      }

      var time = hours + ":" + minutes + ":" + seconds
      return time === "NaN:NaN:NaN" ? "" : time
    },
    formatBytes(bytes) {
      if (bytes === 0) return "0 Byte"
      let k = 1000 // or 1024 for binary
      let dm = 2
      let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      let i = Math.floor(Math.log(bytes) / Math.log(k))

      return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i] ||
        "0" + " " + sizes[0]
      )
    },
    formatDate(value) {
      if (value !== null && value !== undefined) {
        let dt = new Date(value)
        let ano = dt.getFullYear()
        let mes = dt.getMonth() + 1
        let dia = dt.getDate()

        if (dia < 10) dia = "0" + dia
        if (mes < 10) mes = "0" + mes

        return dia + "-" + mes + "-" + ano
      } else {
        return ""
      }
    },
    formatSize(v) {
      return plupload.formatSize(v)
    },
    showPlayer(row) {
      let item = {
        ...row,
        currentTime: 0
      }
      this.selectedMediaFile = item
      this.showModalPlayer = true
      console.log(this.selectedMediaFile)
      if (
        this.selectedMediaFile.fileFormat === ".mp4" ||
        this.selectedMediaFile.fileFormat === ".ogv" ||
        this.selectedMediaFile.fileFormat === ".webm"
      ) {
        this.isAudio = false
        this.isPlaying = false
      } else {
        this.isAudio = true
        this.isPlaying = false
      }
    },
    isDateValid(val) {
      if (this.undefinedDate) {
        return null
      } else {
        if (date.isValid(date.extractDate(val, "DD-MM-YYYY"))) {
          return moment(moment(val, "DD-MM-YYYY")).format()
        }
        return null
      }
    },
    getSequenceNew(val) {
      this.seqLenght = val - 1
      return this.seqLenght
    },
    editMediaContract() {
      let self = this
      let contractId = sessionStorage.getItem("selectedContractId")
      let stationId = sessionStorage.getItem("stationId")

      if (this.isValid()) {
        let postData = {
          contractId: parseInt(contractId),
          stationId: stationId,
          fileId: this.mediaFile.fileId || null,
          mediaType: this.mediaType.value,
          description: this.media.description,
          duration: this.media.duration,
          sequence: this.getSequence(this.media.sequence),
          validityStartDate: this.isDateValid(this.validityStartDate),
          validityEndDate: this.isDateValid(this.validityEndDate),
          undefinedDate: this.undefinedDate,
          pause: this.media.pause,
          loop: this.media.loop,
          text: this.mediaType.value === 2 ? this.media.text : null
        }

        editMediaContract(this.media.id, postData)
          .then((response) => {
            Loading.hide()
            // console.log(response)
            this.$root.$emit("updateContractDetailMedia", contractId)
          })
          .catch((error) => {
            Loading.hide()
            console.log(error)
            console.log(error.message)
          })
      }
    },
    addMediaStation() {
      let self = this
      let stationId = sessionStorage.getItem("stationId")

      let postData = []
      let elementPost = {}
      let lengthContract = this.contractMedia.length

      this.media.forEach((obj) => {
        // console.log(obj)
        let item = {
          stationId: stationId,
          fileId: obj.fileId,
          description: obj.filename,
          duration: obj.duration,
          stationId: stationId,
          mediaType: this.mediaType.value,
          sequence: lengthContract,
          validityStartDate: this.isDateValid(this.validityStartDate),
          validityEndDate: this.isDateValid(this.validityEndDate),
          undefinedDate: this.undefinedDate,
          pause: this.media.pause,
          loop: this.media.loop,
          text: this.mediaType.value === 2 ? this.media.text : null
        }
        lengthContract = lengthContract + 1
        this.postDatas.commands.push(item)
      })

      console.log(this.postDatas)

      addMediaBatch(this.postDatas)
        .then((response) => {
          Loading.hide()
          // console.log("response")
          // console.log(response.object)
          this.$emit("updatingMediaFiles", {
            data: response.object,
            status: "createbatch"
          })
          this.$root.$emit("closeModalFile")
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
          console.log(error.message)
        })
    },
    editMediaStation() {
      let self = this
      let stationId = sessionStorage.getItem("stationId")

      if (this.isValid()) {
        let postData = {
          stationId: stationId,
          fileId: this.mediaFile.fileId || null,
          mediaType: this.mediaType.value,
          description: this.media.description,
          duration: this.media.duration,
          sequence: this.getSequence(this.media.sequence),
          validityStartDate: this.isDateValid(this.validityStartDate),
          validityEndDate: this.isDateValid(this.validityEndDate),
          undefinedDate: this.undefinedDate,
          pause: this.media.pause,
          loop: this.media.loop,
          text: this.mediaType.value === 2 ? this.media.text : null
        }

        this.$emit("updatingMediaFiles", { data: postData, status: "edit" })
      }
    },
    showEditText() {
      this.goto(2)
    },
    removeSelectedMedia() {
      this.mediaFile.fileId = null
      this.mediaFile.filename = ""
      this.media.duration = 30
      this.media.description = ""
    },
    removeText() {
      this.media.previewText = ""
      this.media.text = ""
    },
    stringToGuid(val) {
      return val.replace(
        /([0-z]{8})([0-z]{4})([0-z]{4})([0-z]{4})([0-z]{12})/,
        "$1-$2-$3-$4-$5"
      )
    },
    getSequence(val) {
      if (val === 0) {
        return "0"
      } else {
        for (let i = 0; i < val; i++) {
          let sequence = parseInt(this.postDatas.commands[i].sequence)
          if (Number.isInteger(sequence)) {
            if (sequence !== i) {
              return i.toString()
            }
          }
        }

        return val.toString()
      }
    },
    // loadTranslation() {
    //   this.libraries = [
    //     {
    //       type: 0,
    //       name: this.$t("pages.media.music"),
    //       icon: "fas fa-folder-open"
    //     },
    //     { type: 1, name: this.$t("pages.media.commercial"), icon: "volume_up" },
    //     {
    //       type: 2,
    //       name: this.$t("pages.media.sweepers"),
    //       icon: "fas fa-signature"
    //     },
    //     { type: 5, name: this.$t("pages.media.beds"), icon: "fas fa-music" },
    //     {
    //       type: 3,
    //       name: this.$t("pages.media.general"),
    //       icon: "fas fa-headphones"
    //     },
    //     { type: 4, name: this.$t("pages.media.recording"), icon: "mic" }
    //   ]

    //   this.columns = [
    //     {
    //       name: "type",
    //       required: false,
    //       align: "left",
    //       label: this.$t("pages.media.type"),
    //       field: "type",
    //       sortable: true
    //     },
    //     {
    //       name: "icon",
    //       required: false,
    //       align: "left",
    //       label: " ",
    //       field: "icon",
    //       sortable: true
    //     },
    //     {
    //       name: "name",
    //       required: false,
    //       align: "left",
    //       label: this.$t("pages.media.library"),
    //       field: "name",
    //       sortable: true
    //     }
    //   ]

    //   this.filesColumns = [
    //     {
    //       name: "filename",
    //       required: true,
    //       label: this.$t("pages.contract.file"),
    //       align: "left",
    //       field: "filename",
    //       sortable: true
    //     },
    //     {
    //       name: "duration",
    //       required: true,
    //       label: this.$t("pages.contract.duration"),
    //       align: "center",
    //       field: "duration",
    //       sortable: true
    //     },
    //     {
    //       name: "size",
    //       required: true,
    //       label: this.$t("pages.contract.size"),
    //       align: "center",
    //       field: "size",
    //       sortable: true
    //     }
    //   ]
    // },
    sendVal(val) {
      let self = this
      this.dragging = false
      console.log("entrou no sendVal antes de carregar o arquivo")
      console.log(val)
    },
    saveFile(up, file, libraryType) {
      let self = this
      let readFile = file.getSource().getSource()
      let lastModified = moment(readFile.lastModifiedDate).format()
      let fullPath = ""
      let fileExtension = self.getFileFormat(file.name)

      if (readFile.fullPath || readFile.webkitRelativePath.length > 0) {
        fullPath = file.fullPath || file.webkitRelativePath
      }

      // avi,wmv,mp4,flv,ogv,webm
      let audio
      if (
        fileExtension === "mp4" ||
        fileExtension === "ogv" ||
        fileExtension === "webm"
      ) {
        audio = document.createElement("VIDEO")
        audio.setAttribute("src", URL.createObjectURL(readFile))
      } else {
        audio = new Audio(URL.createObjectURL(readFile))
      }
      console.log(audio)

      audio.addEventListener("loadedmetadata", (_event) => {
        file.duration = audio.duration
        console.log(audio.duration)

        jsmediatags.read(file.getSource().getSource(), {
          onSuccess: (tag) => {
            let tags = {
              Playlists: {
                Genre: tag.tags.genre || null,
                Artist: tag.tags.artist || null,
                Composer: tag.tags.TCOM ? tag.tags.TCOM.data : null,
                Album: tag.tags.album || null,
                Year: tag.tags.year || null
              },
              Fields: {
                Title: tag.tags.title || null,
                Tracknum: tag.tags.track || null,
                Comment: tag.tags.comment || null
              }
            }
            file.tagsInfo = tags

            if (tag.tags.picture !== undefined && tag.tags.picture !== null) {
              file.picture =
                {
                  data: tag.tags.picture.data,
                  format: tag.tags.picture.format
                } || null
            }
            /* var blob = new Blob([tag.tags.picture.data], {type: tag.tags.picture.format})
              var url = URL.createObjectURL(blob)
              console.log(url)
              var img = new Image([tag.tags.picture.data], {type: tag.tags.picture.format})//URL.createObjectURL(blob))
              img.onload = function() {
              URL.revokeObjectURL(url)
            }
            img.src = url */

            let comment = ""
            if (tag.tags.COMM && tag.tags.COMM.length > 0) {
              tag.tags.COMM.forEach((elem) => {
                if (elem.data.text && elem.data.text.length > 0) {
                  comment = elem.data.text
                }
              })
            }

            let postData = {
              // 'S3Path': self.instanceID + '/' + file.fileId + '.' + self.getFileFormat(file.name),
              // 'fileId': file.fileId,
              playlistId: "root",
              fullPath: fullPath,
              fileType: libraryType, // Library type (0-Music, 1-Commercial, 2-Sweepers, 3-General, 10-Images)
              modifiedDate: lastModified,
              filename: file.name,
              size: file.size,
              duration: file.duration,
              playlists: {
                album: tag.tags.album || "",
                genre: tag.tags.genre || "",
                artist: tag.tags.artist || "",
                composer: tag.tags.TCOM ? tag.tags.TCOM.data : "",
                year: tag.tags.year || ""
              },
              mediaInfo: {
                trackNum: tag.tags.track || "",
                bpm: tag.tags.TBPM ? tag.tags.TBPM.data : "",
                subtitle: tag.tags.TIT3 ? tag.tags.TIT3.data : "",
                irsc: tag.tags.TSRC ? tag.tags.TSRC.data : "",
                comment: comment
              },
              title: tag.tags.title || "",
              uploadPending: true
              // 'Picture': tag.tags.picture || ''
            }

            saveFile(postData)
              .then((response) => {
                up.settings.multipart_params.key =
                  "media/" +
                  self.instanceID +
                  "/" +
                  response.fileId +
                  "." +
                  self.getFileFormat(file.name)
                up.settings.multipart_params.filename =
                  response.fileId + "." + self.getFileFormat(file.name)

                file.status = plupload.UPLOADING
                file.fileId = response.fileId

                up.trigger("UploadFile", file)
              })
              .catch((error) => {
                console.log(error)
              })
          },
          onError: (error) => {
            console.log(error)

            let postData = {
              // 'S3Path': self.instanceID + '/' + file.fileId + '.' + self.getFileFormat(file.name),
              // 'fileId': file.fileId,
              playlistId: "root",
              fullPath: fullPath,
              fileType: libraryType, // Library type (0-Music, 1-Commercial, 2-Sweepers, 3-General, 10-Images)
              modifiedDate: lastModified,
              filename: file.name,
              size: file.size,
              duration: file.duration,
              uploadPending: true
              // 'TagsInfo': file.tagsInfo
              // 'Picture': file.picture
            }

            saveFile(postData)
              .then((response) => {
                console.log(response)
                console.log(file)
                up.settings.multipart_params.key =
                  "media/" +
                  self.instanceID +
                  "/" +
                  response.fileId +
                  "." +
                  self.getFileFormat(file.name)
                up.settings.multipart_params.filename =
                  response.fileId + "." + self.getFileFormat(file.name)

                file.status = plupload.UPLOADING
                file.fileId = response.fileId

                up.trigger("UploadFile", file)
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
      })
    },
    setFileAsUploded(file) {
      let postData = {
        fileId: file.fileId,
        uploadPending: false
      }
      console.log("[setFileAsUploded]")
      console.log(postData)

      setFileAsUploded(postData)
        .then(function(response) {
          // Marcar na lista como Completo ou Concluido
          console.log(response)
        })
        .catch(function(error) {
          // Marcar na lista como pendente de Upload
          console.log(error)
        })
    },
    getIntanceContent() {
      let self = this

      Loading.show()
      getIntanceContent()
        .then((response) => {
          self.storage_limit = response.storageCapacity
          self.total_capacity =
            (response.total.size / response.storageCapacity) * 100
          self.instance_content = response.total.size
          let cloudStorage = {
            ...response,
            percentUsed: (response.total.size / response.storageCapacity) * 100
          }
          this.set_cloud_storage(cloudStorage)
            .then(() => {})
            .catch((err) => console.log(err))
          Loading.hide()
        })
        .catch((err) => {
          Loading.hide()
          console.log(err)
        })
    },
    handlePluploadInit(uploader, info) {
      console.log("[Init]", "Info:", info, "Features:", uploader.features)
    },
    handlePluploadFilesAdded(uploader, files) {
      this.showUploadProgress = true
      for (var i = 0; i < files.length; i++) {
        console.log("File added:", files[i].name)
        uploader.start()
        // Inicia o contador no primeiro file
        if (i === 0) {
          timer.start()
        }
      }
    },
    handlePluploadFileFiltered(uploader, file, files) {
      let self = this
      console.log("current_type: " + self.selected[0].type)
      file.upload_type = self.selected[0].type
      self.addFile(file)
    },
    handlePluploadBeforeUpload(uploader, file) {
      let self = this
      console.log(self.total_capacity)

      if (self.total_capacity !== undefined && self.total_capacity != null) {
        if (self.total_capacity < 100) {
          self.saveFile(uploader, file, file.upload_type)
        } else {
          console.log("maior que 100")
          this.$q
            .dialog({
              title: this.$t("components.media.limit_exceeded"),
              message: this.$t("components.media.limit_exceeded_message"),
              cancel: false,
              ok: {
                label: "Ok",
                "no-caps": true,
                color: "orange"
              },
              persistent: true
            })
            .then(() => {
              console.log(">>>>>> Ok")
            })
        }
      } else {
        self.total_capacity = sessionStorage.getItem("total_storage")

        if (self.total_capacity < 100) {
          self.saveFile(uploader, file, file.upload_type)
        } else {
          this.$q
            .dialog({
              title: this.$t("components.media.limit_exceeded"),
              message: this.$t("components.media.limit_exceeded_message"),
              cancel: false,
              ok: {
                label: "Ok",
                "no-caps": true,
                color: "orange"
              },
              persistent: true
            })
            .then(() => {
              console.log(">>>>>> Ok")
            })
        }
      }

      return false
    },
    handlePluploadUploadFile(uploader, file) {
      let self = this
      self.getIntanceContent()
      console.log(self.total_capacity)
      if (self.total_capacity !== undefined && self.total_capacity !== null) {
        if (self.total_capacity >= 100) {
          console.log("maior que 100")
          uploader.stop()
          this.$q
            .dialog({
              title: this.$t("components.media.limit_exceeded"),
              message: this.$t("components.media.limit_exceeded_message"),
              cancel: false,
              ok: {
                label: "Ok",
                "no-caps": true,
                color: "orange"
              },
              persistent: true
            })
            .then(() => {
              // self.$root.$emit("clean_Files_toUpload")
              self.files = new Map()
            })
        } else {
          console.log("[UploadFile]", file)
        }
      } else {
        console.log("[UploadFile]", file)
      }
    },
    handlePluploadUploadProgress(uploader, file) {
      // this.$root.$emit("uploadFileProgress", uploader, file)
      // this.progress = file
      this.updateFile(file)
      this.progress = uploader.total
      console.log(timer.getTotalTimeValues().seconds)
    },
    handlePluploadFileUploaded(uploader, file, info) {
      let self = this
      console.log("[FileUploaded]", file)
      self.updateFileSuccess(file)
      self.setFileAsUploded(file)
      self.getIntanceContent()
    },
    handlePluploadUploadComplete(uploader, file) {
      let self = this
      self.total_time = timer.getTotalTimeValues().seconds // Tempo total de Upload
      self.total_time = 0 // Limpa tempo total e Limpa contador
      timer.stop()
      self.showUploadProgress = false
      self.getLibraryFiles(self.selected[0].type)
    },
    handlePluploadError(uploader, err) {
      let self = this
      // console.log("Está dando erro!")
      // console.log(uploader)
      // console.log(err)
      if (err.hasOwnProperty("file")) {
        if (err.file.type.includes("audio")) {
          console.log(
            "Error #" +
              err.code +
              ": " +
              err.message +
              ": for File name: " +
              err.file.name
          )
          // self.$root.$emit('errorMessage', err)
          self.updateFileFail(error.file)
          deleteFile(err.file.fileId)
            .then(() => {
              console.log("File: " + err.file.name + " deleted!")
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    },
    addFile(file) {
      file.success = false
      file.fail = false
      file.percent = 0
      file.index = this.countFiles++
      this.lstFiles.push(file)
      this.files.set(file.id, file)
      this.filesMapChangeTracker += 1
    },
    updateFile(file) {
      this.files.get(file.id).percent = file.percent
      this.filesMapChangeTracker += 1
      this.currentFile = file
    },
    updateFileSuccess(file) {
      this.countUpload++
      this.files.get(file.id).success = true
      this.filesMapChangeTracker += 1

      let item = this.files.get(file.id)
      let last = this.lstFiles[this.lstFiles.length - 1]
      if (item.name === last.name) {
        console.log("is last")
        this.files = new Map()
        this.lstFiles = []
      }
      // let uploaded = this.progress.uploaded
      // this.moveList(1)
    },
    updateFileFail(file) {
      this.countUpload++
      this.errorIcon = true
      let ff = this.files.get(file.id)
      if (ff === null) return
      ff.fail = true
      this.filesMapChangeTracker += 1
    },
    isValid() {
      let result = true
      this.error = {
        dtStart: false,
        dtEnd: false,
        text: false,
        description: false,
        duration: false
      }
      console.log("this.media")
      console.log(this.media)
      if (!this.media.description.trim().length) {
        this.error.description = true
        result = false
      }

      if (
        this.media.duration === undefined ||
        this.media.duration === null ||
        this.media.duration <= 0
      ) {
        this.error.duration = true
        result = false
      }

      if (!this.undefinedDate) {
        if (!this.validityStartDate.trim().length) {
          this.error.dtStart = true
          result = false
        }

        if (!this.validityEndDate.trim().length) {
          this.error.dtEnd = true
          result = false
        }
      }

      if (this.mediaType.value === 2) {
        if (this.media.text.length <= 0) {
          this.error.text = true
          result = false
        }
      }

      return result
    },
    isNumber(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    optionsFn(date) {
      let dt = new Date()
      let ano = dt.getFullYear()
      let mes = dt.getMonth() + 1
      let dia = dt.getDate()

      if (dia < 10) dia = "0" + dia
      if (mes < 10) mes = "0" + mes

      let formatedDate = ano + "/" + mes + "/" + dia

      return date >= formatedDate
    }
  },
  created() {
    let self = this
    this.loadTranslation()
    this.getIntanceContent()

    this.instanceID = this.currentStation.instanceId

    console.log(this.contractMedia)

    if (this.selectedItem !== undefined) {
      let media = this.selectedItem[0]
      console.log(media)

      if (media !== null && media !== undefined) {
        this.undefinedDate = media.undefinedDate

        if (media.text === null) {
          media.text = ""
        }

        if (
          media.validityStartDate !== null &&
          media.validityStartDate !== undefined
        ) {
          this.validityStartDate = this.formatDate(media.validityStartDate)
        }

        if (
          media.validityEndDate !== null &&
          media.validityEndDate !== undefined
        ) {
          this.validityEndDate = this.formatDate(media.validityEndDate)
        }

        this.isEdit = true
        this.media = media
        if (this.media.fileId !== null && this.media.fileId !== undefined) {
          self.getFileById(this.media.fileId)
        }

        if (media.mediaType === 1) {
          this.mediaType = { label: "Áudio", value: 1 }
        }

        if (media.mediaType === 2) {
          this.mediaType = { label: "Texto", value: 2 }
          this.media.previewText = media.text
            .replace(/<[^>]*>/g, "")
            .substr(0, 50)
        }
      }
      console.log(this.media)
    }

    let row = { type: 1 }
    this.selectItem(row)

    // Upload Libraries
    s3policy()
      .then((response) => {
        self.uploadInstance = new plupload.Uploader({
          runtimes: "html5,browserplus,silverlight,gears,html4",
          url: "https://app-aires-studio.s3.amazonaws.com/",
          multiple_queues: true,
          drop_element: "drop_music",
          browse_button: "music",
          container: "uploader",
          unique_names: false,
          rename: true,
          multipart_params: {
            key: "media/teste/filename", // 'media/teste/${filename}', // use filename as a key
            Filename: "filename", // '${filename}', // adding this to keep consistency across the runtimes
            acl: response.acl,
            "Content-Type": "application/octet-stream",
            AWSAccessKeyId: response.AWSAccessKeyId,
            policy: response.policy,
            signature: response.signature
          },
          filters: {
            mime_types: [
              {
                title: "Audio files",
                extensions: "mp3,m4a,wav,aac,wma,opus,ogg,"
              },
              { title: "Video files", extensions: "mp4,ogv,webm" }, // avi,wmv,flv,
              { title: "Zip files", extensions: "zip" }
            ]
          }
        })

        self.uploadInstance.bind("PostInit", self.handlePluploadInit)
        self.uploadInstance.bind("FilesAdded", self.handlePluploadFilesAdded)
        self.uploadInstance.bind(
          "FileFiltered",
          self.handlePluploadFileFiltered
        )
        self.uploadInstance.bind(
          "BeforeUpload",
          self.handlePluploadBeforeUpload
        )
        self.uploadInstance.bind("UploadFile", self.handlePluploadUploadFile)
        self.uploadInstance.bind(
          "UploadProgress",
          self.handlePluploadUploadProgress
        )
        self.uploadInstance.bind(
          "FileUploaded",
          self.handlePluploadFileUploaded
        )
        self.uploadInstance.bind(
          "UploadComplete",
          self.handlePluploadUploadComplete
        )
        self.uploadInstance.bind("Error", self.handlePluploadError)

        self.uploadInstance.init()
      })
      .catch(function(error) {
        console.log(error)
      })

    this.$root.$on("close_text", () => {
      self.currentIndex = 0
      self.back = true
    })

    this.$root.$on("update_text", (text) => {
      self.media.text = text
      self.media.previewText = text.replace(/<[^>]*>/g, "")
      self.currentIndex = 0
      self.back = true
    })
  },
  watch: {
    currentLanguage() {
      this.loadTranslation()
    },
    selectedFiles() {
      if (this.selectedFiles.length > 0) {
        this.selectedFiles[0].forEach((element) => {
          this.mediaFile.push(element)
        })

        // this.mediaFile.fileId = this.selectedFiles[0][0].fileId
        // this.mediaFile.filename = this.selectedFiles[0][0].filename

        if (this.mediaType.value === 1) {
          // this.media.duration = this.selectedFiles[0].duration
          // this.media.description = this.selectedFiles[0].filename
          this.selectedFiles[0].forEach((element) => {
            this.media.push(element)
          })
        }
        this.beforeAddMedia()
        // this.$root.$emit("selectedFiles", this.mediaFile)

        // this.goto(0)
      }
    },
    mediaType() {
      if (this.mediaType.value === 1) {
        this.error.text = false
      }
    },
    undefinedDate() {
      if (this.undefinedDate) {
        this.error.dtStart = false
        this.error.dtEnd = false
      }
    }
  },
  components: {
    // playerTool
  }
}
</script>

<style>
.q-dialog__inner--minimized > .player-fullwidth {
  max-width: 100% !important;
}

@media (min-width: 600px) {
  .player-fullwidth > .q-dialog__inner--minimized > .player-fullwidth {
    max-width: 100% !important;
  }
}

.video-container:focus {
  outline: none;
}

tr.q-tr {
  cursor: pointer;
}

tr.q-tr.selected {
  background-color: rgba(2, 123, 227, 0.1);
}
</style>
