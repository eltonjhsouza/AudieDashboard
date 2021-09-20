<template>
  <q-card>
    <q-card-section>
      <div class="flex justify-between">
        <div class="text-h6">{{ $t("components.import_xml.import_xml") }}</div>
        <q-btn round flat icon="close" @click="close_modal" />
      </div>
      <div class="q-mb-md text-body1">
        {{ $t("components.import_xml.import_xml_info") }}
      </div>
    </q-card-section>
    <q-card-section class="q-pa-md column items-start q-gutter-y-md">
      <q-input
        class="v-step-xml-2"
        outlined
        color="primary"
        no-caps
        @input="
          (event) => {
            openFile(event)
          }
        "
        type="file"
        accept="text/xml"
      />
      <div class="flex full-width justify-end">
        <q-btn color="orange" no-caps label="Upload" @click="uploadFile" />
      </div>
    </q-card-section>

    <q-dialog persistent v-model="sucessModal">
      <q-card>
        <q-card-section class="text-h6">
          {{ $t("components.import_xml.import_success") }}
        </q-card-section>
        <q-card-section>
          <div v-html="$t('components.import_xml.import_success_info')"></div>
        </q-card-section>
        <q-card-section>
          <div class="flex justify-end">
            <q-btn
              color="orange"
              no-caps
              label="Ok"
              @click="closeMessage"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { Loading } from "quasar"
import { uploadXML } from "src/components/service.js"
import bus from "src/boot/bus.js"

export default {
  data() {
    return {
      files: null,
      uploadProgress: [],
      uploading: null,
      file: [],
      filename: "",
      sucessModal: false
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

  methods: {
    cancelFile(index) {
      this.uploadProgress[index] = {
        ...this.uploadProgress[index],
        error: true,
        color: "orange-2"
      }
    },

    close_modal() {
      bus.$emit("close_modal_uploadXML")
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

    uploadFile() {
      let self = this
      // console.log(this.file[0])
      Loading.show()
      uploadXML(this.file, this.filename)
        .then((response) => {
          Loading.hide()
          // console.log(response)
          // self.$tours["tourImportXML"].stop()
          self.sucessModal = true
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
        })
    }
  },

  beforeDestroy() {
    clearTimeout(this.uploading)
  }
}
</script>
