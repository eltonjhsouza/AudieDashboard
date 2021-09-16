<template>
    <q-card class="q-ma-md q-pa-md full-widht">

            <div class="flex justify-start">
                <div class="flex q-ma-md">
                <q-item-label header>Defina alguns parâmetros para personalização de seu App</q-item-label>

                </div>
            </div>

    <div class="flex justify-start">
        <div class="" style="max-width:800px">
            <q-item-section >
                <q-item-label class="text-h6 text-blue-grey-9">{{ 'Nome do Aplicativo' }}
                    <q-icon name="help_outline" color="black">
                        <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Este é o nome que será exibido nas lojas de aplicativos' }}
                        </div>
                        </q-tooltip>
                    </q-icon>
                </q-item-label>
            </q-item-section>
                <q-item class="q-ml-md" >
                    <q-item-section>
                        <q-item-label>
                        <q-input
                            v-model="appConfig.appName"
                            float-label="Nome do Aplicativo"
                            autocomplete="off"
                        />
                        </q-item-label>
                    </q-item-section>
                    <!-- <q-item-section>
                        <q-item-label>
                        <q-btn
                        dense
                        class="q-ma-md q-pl-md q-pr-md"
                        no-caps
                        color="primary"
                        @click="editStation(appConfig.appName)"
                        label="Salvar"
                        />
                        </q-item-label>
                    </q-item-section> -->
                </q-item>
        <q-separator spaced="lg"/>
        <div class="q-mt-md" >
            <q-item-section >
                <q-item-label class="text-h6 text-blue-grey-9">{{ 'Cores do Aplicativo' }}
                    <q-icon name="help_outline" color="black">
                        <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Defina as 3 cores básicas do aplicativo' }}
                        </div>
                        </q-tooltip>
                    </q-icon>
                </q-item-label>
            </q-item-section>
            <q-list class="flex justify-start">

                <q-item class="q-ml-md flex" >
                    <q-item-section>
                        <q-item-label > Defina a cor Primária </q-item-label>
                    </q-item-section>
                    <q-item-section thumbnail>
                        <q-input 
                            v-model="appConfig.colors.primary"  
                            dense
                            outlined
                            :style="'color: white; background-color:'+ appConfig.colors.primary">
                            <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color
                                        v-model="appConfig.colors.primary"
                                        no-header
                                        no-footer
                                    />
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </q-item-section>
                </q-item>

                <q-item class="q-ml-md flex" >
                    <q-item-section>
                        <q-item-label > Defina a cor Secundária </q-item-label>
                    </q-item-section>
                    <q-item-section thumbnail>
                        <q-input 
                            v-model="appConfig.colors.secondary"  
                            dense
                            outlined
                            :style="'color: white; background-color:'+ appConfig.colors.secondary">
                            <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color
                                        v-model="appConfig.colors.secondary"
                                        no-header
                                        no-footer
                                    />
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </q-item-section>
                </q-item>

                <q-item class="q-ml-md flex" >
                    <q-item-section>
                        <q-item-label > Defina a cor Terciária </q-item-label>
                    </q-item-section>
                    <q-item-section thumbnail>
                        <q-input 
                            v-model="appConfig.colors.terciary"  
                            dense
                            outlined
                            :style="'color: white; background-color:'+ appConfig.colors.terciary">
                            <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color
                                        v-model="appConfig.colors.terciary"
                                        no-header
                                        no-footer
                                    />
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>    
        <q-separator spaced="lg" />

                <q-item-label class="">
                    <q-item-label class="text-h6 text-blue-grey-9">{{ 'Imagem Padrão' }}
                    <q-icon name="help_outline" color="black">
                        <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
                        </div>
                        </q-tooltip>
                    </q-icon>
                    </q-item-label>
                    <q-toggle 
                    v-model="appConfig.useLogo" 
                    class="q-ml-lg flex" 
                    label="Usar Logomarca como imagem padrão?"
                    @input="
                    () => {
                    updateValue('useLogo', appConfig.useLogo)
                    }
                    "
                    />
                </q-item-label>

                <q-item-label class="q-ml-lg" v-if="appConfig.useLogo == false" >
                    <q-item-section>
                    <q-item-label lines="1">{{ 'Faça o upload da imagem padrão' }}</q-item-label>
                        <q-item-label>
                        <q-input type="file"/>
                        </q-item-label>
                    </q-item-section>
                </q-item-label>

            <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir nome da música e capa do álbum' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                        <q-toggle 
                            v-model="appConfig.showCoverAndMusicName" 
                            class="q-mr-md flex" 
                            label="Permite exibir ou não as informções da musica em execução e a capa do disco" 
                            @input="
                            () => {
                            updateValue('showMusicName', appConfig.showCoverAndMusicName)
                            }
                            "
                        />
                    </q-item-label>
                </q-item>
            </div>

        <q-separator spaced="lg"/>

        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir player de Video' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
            <q-item >
                <q-item-label class="q-ml-sm">
                <q-toggle 
                v-model="appConfig.showPlayerVideo" 
                class="q-mr-md flex" 
                label="Permite exibir ou não as informções da musica em execução e a capa do disco" 
                @input="
                    () => {
                    updateValue('playerVideo', appConfig.showPlayerVideo)
                    }
                "
                />
                </q-item-label>
            </q-item>
        </div>

        <q-separator spaced="lg"/>

        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir Banner Promocional' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                    <q-toggle
                        v-model="appConfig.showPromoBanner" 
                        class="q-mr-md flex" 
                        label="Permite exibir ou não as informções da musica em execução e a capa do disco" 
                        @input="
                            () => {
                            updateValue('banner',appConfig.showPromoBanner)
                            }
                        "
                    />
                    </q-item-label>
                </q-item>
        </div>      
        <q-separator spaced="lg"/>

        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir letra de Músicas' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Permite exibir a letra da canção, quando disponível' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                    <q-toggle 
                        v-model="appConfig.showMusicLetter" 
                        class="q-mr-md flex" 
                        label="Permite exibir exibir a letra da música, quando disponível" 
                        @input="
                            () => {
                            updateValue('musicLetter', appConfig.showMusicLetter)
                            }
                        "
                        />
                    </q-item-label>
                </q-item>
        </div> 
        <q-separator spaced="lg"/>

        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir Posts na tela incial' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Permite exibir os posts na tela inicial' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                    <q-toggle 
                        v-model="appConfig.showPosts" 
                        class="q-mr-md flex" 
                        label="Permite exibir os posts na tela inicial" 
                        @input="
                            () => {
                            updateValue('posts', appConfig.showPosts)
                            }
                        "
                        />
                    </q-item-label>
                </q-item>
        </div> 

        <q-separator spaced="lg"/>

        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Mesclar RSS Feed com Posts' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Permite exibir notícias de um RSS feed mesclado com os posts' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                    <q-toggle v-model="appConfig.mergePostsRSS" class="q-mr-md flex" label="Mesclar RSS Feed com Posts" />
                    </q-item-label>
                </q-item>
        </div> 
        <q-separator spaced="lg"/>

        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir Podcasts' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Permite exibir os podcasts cadastrados' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                    <q-toggle v-model="appConfig.usePodcastFeed" class="q-mr-md flex" label="Habilitar o feed de Podcast" />
                    </q-item-label>
                </q-item>
        </div> 

        <q-separator spaced="lg"/>
        <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9">{{ 'Ícone do Aplicativo' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Ícone exibido na bandeija de apps após a instalação' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
            <q-item class="">
                <q-item-section avatar class="q-gutter-sm">
                    <q-btn label="upload" @click="fileModal=true" />
                    <div class="" id="uploader">
                    <div id="uploader_Container">
                        <div
                        id="drop_images"
                        class="flex justify-around"
                        >
                        <a
                            id="images"
                            href="javascript:"
                            class="flex justify-end"
                            style="text-decoration:none; margin:15px;"
                        >
                            <q-btn
                            flat
                            dense
                            color="tertiary"
                            icon="cloud_upload"
                            label="Upload"
                            class="q-ml-md"
                            >
                            <!--q-tooltip>{{ $t('layout.library.upload_detail') }}</q-tooltip-->
                            </q-btn>
                        </a>
                        <q-img
                            :src="appConfig.image"
                            style="height: 140px; max-width: 150px"
                            class="q-ma-sm"
                        >
                            <template v-slot:error>
                            <div class="absolute-full flex flex-center bg-grey-8 text-white">
                                Nenhuma imagem selecionada
                            </div>
                            </template>
                        </q-img>

                        </div>
                    </div>
                    </div>

                    <span>Arquivos permitidos Imagens (JPG e PNG) </span>
                    <span>Tamanho máximo 10 MB </span>
                    <span>Dimensão 1024x1024 </span>
                </q-item-section>
                <q-item-section>
                    <q-img
                        :src="appConfig.noImage"
                        style="height: 140px; max-width: 150px"
                        class="q-ma-sm"
                    >
                    <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-grey-8 text-white">
                        Nenhuma imagem selecionada
                    </div>
                    </template>
                </q-img>
                </q-item-section>

            </q-item>
            <q-btn color="primary" icon="add" @click="postConfiguration(appConfig)" label="Salvar Configurações" />
        </div>
        
    </div>

    <div class="flex q-ml-xl" >
        <div class="">
            <!-- <span class="text-blue-grey-9 q-mr-md"> Preview do App </span> -->
            <img class="img-phone" src="./phone.png" />
            <!-- <iframe id="android-iframe" class="iframe ar-screen " scrolling="no" frameborder="0" src="/PreviewApp">
            </iframe> -->
            <PreviewApp class="previewApp"/>
        </div>
    </div>
    </div>

    <q-dialog v-model="fileModal">
      <library-files
        :contractMedia="contractMedia"
        :selectedItem="selectedFiles"
        type="contract"
        style="min-width: 50vw;"
      />
    </q-dialog>

    </q-card>
</template>

<script>
import noImage from 'src/assets/no-image.png'
import PreviewApp from '../PreviewApp/PreviewApp.vue'
import {postConfiguration, getConfiguration, s3policy } from '../service.js'
import localforage from 'localforage'
import { Loading } from 'quasar'
import plupload from 'plupload'

//import code from 'uuid'
import Timer from 'easytimer'
var timer = new Timer()

import { v4 as uuidv4 } from 'uuid';
import LibraryFiles from 'src/components/Modais/library-files.vue'
// import LibraryFiles from '../Modais/library-files.vue'


export default {
  name: "Personalize",
  components : {
      PreviewApp,
    LibraryFiles,
  },
    data() {
      return {
        fileModal: false,
        appConfig: {
            configId: 0,
            showPosts: true,
            showMusicLetter: true,
            useLogo: false,
            urlImage: '',
            appIcon: '',
            showPromoBanner: true,
            showPlayerVideo: true,
            showPosts: true,
            showCoverAndMusicName: true,
            appName: '',
            primaryColor: '#0097a7',
            colors : {
                primary: '#0097a7',
                secondary: '#26A69A',
                terciary: '#dd4b39'
            },
            mergePostsRSS: true,
            useRssFeed: true,
            usePodcastFeed: false,
            noImage: noImage
        },
      current_type: 7,
      dragging: false,
      type: 7,
      files: [],
      pictures: [],
      upInstancePicture: {},
    screenHeight: window.innerHeight - 400,
    }
  },
  methods: {
    postConfiguration (appConfig) {
        var item =  {
            id: this.appConfig.id,
            appName : appConfig.appName,
            appIcon : appConfig.appIcon,
            Colors : {
                primary : appConfig.colors.primary,
                secondary : appConfig.colors.secondary,
                terciary : appConfig.colors.terciary
            },
            urlImage : appConfig.urlImage,
            showPromoBanner : appConfig.showPromoBanner,
            showPlayerVideo : appConfig.showPlayerVideo,
            showCoverAndMusicName : appConfig.showCoverAndMusicName,
            showMusicLetter : appConfig.showMusicLetter,
            mergePostsRSS : appConfig.mergePostsRSS,
            showPosts : appConfig.useRssFeed,
            showMusicLetter : appConfig.showMusicLetter,
            useLogo : appConfig.useLogo,
            usePodcastFeed: appConfig.usePodcastFeed
        }
        Loading.show()
        postConfiguration(item)
        .then(response => {
            console.log(response)
            Loading.hide()
            this.$q.dialog({
              title: 'Configurações do App',
              message: 'Configurações aplicadas com sucesso'
            }).onOk(() => {

            //   this.$router.push({ path: '/News', params: 'add'})
            })
            localforage.setItem('AppConfig', response)
        })
    },
    // emit values
    updateValue (val1, val2) {
        console.log(val1, val2)
        console.log('update_' + val1)
        this.$root.$emit('update_' + val1, val2 )
    },
    getConfiguration () {
        getConfiguration()
        .then(response => {
            console.log(response)
            this.appConfig = response
        })
    },
    checkFileSize (files) {
      return files.filter(file => file.size < 2048)
    },
    handlePluploadFileFiltered (uploader, file, files) {
      let self = this
      Loading.show()
      file.upload_type = self.current_type
      this.$root.$emit('addFiles', file)
    },
    handlePluploadBeforeUpload (uploader, file) {
      let self = this
      // console.log(self.total_capacity)

      if (self.total_capacity !== undefined && self.total_capacity != null) {
        if (self.total_capacity < 100) {
          self.saveFile(uploader, file, file.upload_type)
        } else {
          console.log('maior que 100%')
          this.$q
            .dialog({
              title: self.lang.appcomponents.files.full_storage,
              message: self.lang.appcomponents.files.full_message,
              ok: 'Ok'
            })
            .then(() => {
              // this.$router.go(-1)
              this.$root.$emit('openDrawer', 'show_uploads')
              this.$root.$emit('showPane', 'show_uploads')
            })
        }
      } else {
        self.total_capacity = sessionStorage.getItem('total_storage')

        if (self.total_capacity < 100) {
          self.saveFile(uploader, file, file.upload_type)
        } else {
          this.$q
            .dialog({
              title: self.lang.appcomponents.files.full_storage,
              message: self.lang.appcomponents.files.full_message,
              ok: 'Ok'
            })
            .then(() => {
              // this.$router.go(-1)
              this.$root.$emit('openDrawer', 'show_uploads')
              this.$root.$emit('showPane', 'show_uploads')
            })
        }
      }

      return false
    },
    handlePluploadUploadFile (uploader, file) {
      let self = this

      // self.getLocalLanguage()
      self.getIntanceContent()
      // console.log(self.total_capacity)
      if (self.total_capacity !== undefined && self.total_capacity !== null) {
        if (self.total_capacity >= 100) {
          console.log('maior que 100%')

          uploader.stop()

          this.$q
            .dialog({
              title: self.lang.appcomponents.files.full_storage,
              message: self.lang.appcomponents.files.full_message,
              ok: 'Ok'
            })
            .then(() => {
              self.$root.$emit('clean_Files_toUpload')
              self.$root.$emit('exitPropertie')
            })
        } else {
          // console.log('[UploadFile]', file)
        }
      } else {
        // console.log('[UploadFile]', file)
      }
    },
    handlePluploadUploadProgress (uploader, file) {
      this.$root.$emit('uploadFileProgress', uploader, file)
    },
    handlePluploadFileUploaded (uploader, file, info) {
      let self = this
      // console.log('[FileUploaded]', file)
      self.$root.$emit('fileUploaded_success', file)
      self.setFileAsUploded(file)
      self.getLibrariesInfo()
    },
    handlePluploadUploadComplete (uploader, file) {
      let self = this

      // Quantidade de files transferidos
      // self.$ga.event('Media', 'Upload Files', self.instanceID, uploader.files.length)

      // Tempo total de Upload
      self.total_time = timer.getTotalTimeValues().seconds
      //  self.$ga.event('Media', 'Upload Time', self.instanceID, self.total_time)

      // Limpa tempo total e Limpa contador
      self.total_time = 0
      timer.stop()
      // timer.reset()

      // this.$root.$emit('clean_upload_list')

      this.$root.$emit('openDrawer', 'show_uploads')
      this.$root.$emit('showPane', 'show_uploads')
      // console.log(self.type)
      self.getLibrary(self.type)
    },
    handlePluploadError (uploader, err) {
      let self = this
      Loading.hide()

      if (err.file.type.includes('audio')) {
        console.log(
          'Error #' +
            err.code +
            ': ' +
            err.message +
            ': for File name: ' +
            err.file.name
        )
        self.$root.$emit('errorMessage', err)

        deleteFile(err.file.fileId)
          .then(() => {
            // console.log('File: ' + err.file.name + ' deleted!')
          })
          .catch((err) => {
            console.log(err)
            const exception = err.message || err
            self.$ga.exception(exception)
          })
      }
    },
    getFileFormat (name) {
      let re = /(?:\.([^.]+))?$/
      let ext = re.exec(name)[1]

      if (ext !== undefined) return ext
      else return ''
    },
    saveImage (up, file, libraryType) {
      let self = this
      //let value = code(32)
      let value = uuidv4(32)
      
      value = String(value)
      value = value
        .replace('-', '')
        .replace('-', '')
        .replace('-', '')
        .replace('-', '')

      file.fileId = value

      up.settings.multipart_params.key =
        'media/image/' + value + '.' + self.getFileFormat(file.name)
      up.settings.multipart_params.Filename =
        value + '.' + self.getFileFormat(file.name)

      let postData = {}

      if (file.name !== null && file.name !== undefined && file.name !== '') {
        postData.FileFormat = '.' + self.getFileFormat(file.name)
        postData.Name = file.name.replace(postData.FileFormat, '')
        postData.ImageId = file.fileId
        postData.Size = file.size
      }
      Loading.show()

      saveImageFile(postData)
        .then((response) => {
          file.status = plupload.UPLOADING
          up.trigger('UploadFile', file)
          console.log(response)
          self.Image = response

          s3policy()
          .then((response) => {
            console.log(response)
          })

          response.imageId + response.fileFormat 
          getImgUrl(response.imageId + response.fileFormat)
              .then(response => {
                console.log(response)
                self.post.imageUrl = response
                self.post.image = response
              })
              if (this.isEdit == true) {
                self.post.image = response.imageId + response.fileFormat 
                Loading.hide()

              }
                Loading.hide()

          // console.log(self.Image )

          // gtm.logEvent('Library', 'SaveImage', 'Image', file.fileId)
        })
        .catch((error) => {
          timer.stop()  
          console.log(error)
          // gtm.logEvent('Library', 'SaveImage', 'Error', error.message || error)
          Loading.hide()
        })
    },

    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    }
  },
  created () {
      console.log(window.innerWidth)
      console.log(screen.width)
      console.log(screen.height)

      let haveConfig
        localforage.getItem('AppConfig')
        .then(res => {
            this.getConfiguration()
            haveConfig = res
        if(haveConfig === null) {
            //   console.log(haveConfig)
            this.appConfig.id = 0
        } else {
            this.appConfig = res

            console.log(this.appConfig)
        }
      })
    //   this.postConfiguration()
    // this.getAllUrls()
  },
  mounted () {
      let self = this
    // Upload Image Library
    s3policy()
      .then((response) => {
        self.upInstancePicture = new plupload.Uploader({
          // runtimes: 'html5',
          runtimes: 'html5,browserplus,silverlight,gears,html4',
          drop_element: 'drop_images',
          browse_button: 'images', // you can pass in id...
          container: 'uploader_Container', // ... or DOM Element itself
          unique_names: false,
          rename: true,
          url: 'https://app-aires-studio.s3.amazonaws.com/',
          multipart_params: {
            key: 'media/teste/filename', // 'media/image/${filename}', // use filename as a key
            Filename: 'filename', // '${filename}', // adding this to keep consistency across the runtimes
            acl: 'public-read',
            'Content-Type': 'application/octet-stream',
            AWSAccessKeyId: response.AWSAccessKeyId,
            policy: response.policy,
            signature: response.signature
          },
          filters: {
            mime_types: [
              { title: 'Image files', extensions: 'jpeg,jpg,gif,png,bmp,webp' },
              { title: 'Zip files', extensions: 'zip ' }
            ]
          },
          resize: {
            quality: 50
          },
          preinit: {
            Init: (up, info) => {
              // console.log('[Init]', 'Info:', info, 'Features:', up.features)
            }
          },
          init: {
            PostInit: () => {},
            FilesAdded: (up, files) => {
              // console.log('IMAGE add')
              for (var i = 0; i < files.length; i++) {
                // console.log('File added:', files[i].name)
                self.upInstancePicture.start()
                // Inicia o contador no primeiro file
                if (i === 0) {
                  timer.start()
                }
              }
            },
            FileFiltered: (up, file, files) => {
              // file.upload_type = 10
              this.$root.$emit('openDrawer', 'show_uploads')
              this.$root.$emit('showPane', 'show_uploads')
              this.$root.$emit('addFiles', file)
            },
            BeforeUpload: (up, file) => {
              // self.getCurrentLanguage()
              if (
                self.total_capacity !== undefined &&
                self.total_capacity !== null
              ) {
                if (self.total_capacity < 100) {
                  self.saveImage(up, file, 10)
                } else {
                  console.log('maior que 100%')
                  self.$q
                    .dialog({
                      title: self.lang.appcomponents.files.full_storage,
                      message: self.lang.appcomponents.files.full_message,
                      ok: 'Ok'
                    })
                    .then(() => {
                      this.$root.$emit('openDrawer', 'show_uploads')
                      this.$root.$emit('showPane', 'show_uploads')
                    })
                }
              } else {
                self.total_capacity = sessionStorage.getItem('total_storage')
                if (self.total_capacity < 100) {
                  self.saveImage(up, file, 10)
                } else {
                  self.$q
                    .dialog({
                      title: self.lang.appcomponents.files.full_storage,
                      message: self.lang.appcomponents.files.full_message,
                      ok: 'Ok'
                    })
                    .then(() => {
                      this.$root.$emit('openDrawer', 'show_uploads')
                      this.$root.$emit('showPane', 'show_uploads')
                    })
                }
              }
              return false
            },
            UploadFile: (up, file) => {
              // console.log('[UploadFile]', file)
            },
            UploadProgress: (up, file) => {
              self.$root.$emit('uploadFileProgress', up, file)
            },
            FileUploaded: (up, file, info) => {
              self.$root.$emit('fileUploaded_success', file)
            },
            UploadComplete: (up, file) => {

              // TODO Preciso buscar as informações da instancia
              // self.getIntanceContent()
              // QUantidade de files transferidos
              // self.$ga.event('Image', 'Upload Image', self.instanceID, up.files.length)
              // Tempo total de Upload
              self.total_time = timer.getTotalTimeValues().seconds
              // self.$ga.event('Image', 'Upload Time', self.instanceID, self.total_time)
              // Limpa tempo total e Limpa contador
              self.total_time = 0
              timer.stop()
              // timer.reset()
              this.$root.$emit('update_recentUploads')
              this.$root.$emit('openDrawer', 'show_uploads')
              this.$root.$emit('showPane', 'show_uploads')
            },
            Error: (up, err) => {
              console.log(
                'Error #' +
                  err.code +
                  ': ' +
                  err.message +
                  ': for File name: ' +
                  err.file.name
              )
              self.$root.$emit('errorMessage', err)
              const exception = err.message || err
              self.$ga.exception(exception)
              // Exclui a imagem que não foi para o S3
              deleteImageFile(err.file.fileId)
                .then(() => {
                  // console.log('File: ' + err.file.name + ' deleted!')
                })
                .catch((error) => {
                  console.log(error)
                  const exception = error.message || error
                  self.$ga.exception(exception)
                })
            }
          }
        })
        self.upInstancePicture.init()
      })
      .catch((error) => {
        console.log(error)
        // const exception = error.message || error
        // self.$ga.exception(exception)
      })
  },
  watch: {
    showPromoBanner(val) {
      this.color = val
    }
  }
}
</script>
<style scoped>
.img-phone {
    width: 20.5vw;
}
.previewApp {
    width: 18.5vw;
    top: 177px;
    /* left: 37.2vw; */
    margin-left: 1vw;
    position: absolute;
    height: 10vh;
    overflow: hidden;
}
.app {
    width: 21vw;
    position: absolute;
    /* position: relative;   */
    /* right: 29vw;    */
}
.preview {
    position: relative;
    left: 53vw;
    top: 20vh;
    width: 19vw;
    height: 66vh;
}   
.ar-frame {
    position: absolute;
    display: block;
    top: 10.5vh;
    left: 103.5vh;
    width: 21vw;
}
.ar-screen {
    position: absolute;
    top: 22vh;
    left: 51.7vw;
    display: block;
    font-size: 0;
    transition-property: left,top,opacity;
    transition-duration: .3s;
    transition-timing-function: ease-in-out;
    transform: translate3d(0,0,0);
    overflow: hidden;
}
.iframe {
    width: 18.6vw;
    height: 51.5vh;
}
.roundImage {
  border-radius: 50%;
}

/* @media screen and (min-device-width: 500px) and (max-device-width: 1440px) { 
.ar-frame {
    position: absolute;
    display: block;
    top: 12.5vh;
    left: 50.5vw; */
    /* width: 21vw; */
    /* width: 427.261px;
    height: 839px; */
/* }
.ar-screen {
    position: absolute;
    top: 20vh;
    left: 51.7vw;
    display: block;
    font-size: 0;
    transition-property: left,top,opacity;
    transition-duration: .3s;
    transition-timing-function: ease-in-out;
    transform: translate3d(0,0,0);
    overflow: hidden;
}

.iframe {
    width: 18.6vw;
    height: 57.6vh;
}

.app {
    position: absolute;
    left: 4vw;
    top: 0vh;
}

} */


/* @media only screen and (min-device-width: 1880px){
.ar-frame {
    position: absolute;
    display: block;
    top: 10.5vh;
    left: 103.5vh;
}
.ar-screen {
position: absolute;
    top: 20vh;
    left: 51.7vw;
    display: block;
    font-size: 0;
    transition-property: left,top,opacity;
    transition-duration: .3s;
    transition-timing-function: ease-in-out;
    transform: translate3d(0,0,0);
    overflow: hidden;
}
.roundImage {
  border-radius: 50%;
}
.iframe {
    width: 18.6vw;
    height: 68.9vh;
}
} */
</style>