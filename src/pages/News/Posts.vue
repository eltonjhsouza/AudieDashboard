<template>
<q-page>
    <q-breadcrumbs class="text-orange q-mt-md q-ml-md" active-color="secondary">
      <span class="q-ml-md text-h6 text-grey-8"> Adicionar Novo Post </span>

    </q-breadcrumbs>
  <q-card class="q-ma-lg full-widht">

  <!-- <div class="flex justify-start q-mt-lg">
    <span class="q-ml-md text-h6 text-grey-8"> Adicionar Novo Post </span>
      <!-- <div class="flex q-ma-md">
          <q-btn label="Adicionar Nova"/>
      </div>
  </div> -->
  <div class="flex q-pa-xl">

  <div class="col q-mt-md">
      <!-- <q-list bordered padding class="rounded-borders" style="widht: 100%"> -->
        <div class="q-ma-sm">
          <q-input v-model="post.title" label="Título" outlined dense/>
        </div>
        <div>
        </div>

     <!-- </q-list>  -->

      <q-list bordered padding class="rounded-borders q-mt-md" style="widht: 100%; height: 82%">
         <span class="q-ml-md q-my-md text-h6 text-grey-8"> Descrição </span>
        <div class="q-ma-sm">
          <q-editor
            v-model="post.description"
            :dense="$q.screen.lt.md"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />
        </div>
        <div>
        </div>
      </q-list> 
  </div>
  <div class="col">
    <div class="col justify-around q-pa-md"> 
        <q-list bordered class="rounded-borders q-pa-md q-mb-md" style="min-width:600px">
              <div class="">
                <span class="q-ml-md q-my-md text-h6 text-grey-8">Escolher imagem da capa </span>
              </div>

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
                    v-if="isEdit == true"
                    :src="post.imageUrl"
                    style="height: 140px; max-width: 150px"
                    class="q-ma-sm"
                  >
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center bg-grey-8 text-white">
                        Nenhuma imagem selecionada
                      </div>
                    </template>
                  </q-img>
                  <q-img
                    v-else
                    :src="post.image"
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

        </q-list>
        <q-list bordered class="rounded-borders q-pa-md" style="min-width:500px">
          <q-expansion-item
            expand-separator
            label="Status e Visibilidade"
          >
          <div class="flex justify-between">
            <div>
              <span class="q-ml-md q-my-md text-subtitle text-grey-8 flex"> Visibilidade </span>
            </div>
            <div class="q-mt-md">
              <q-badge outline dense color="orange" label="Públic" />
            </div>
          </div>

          <div class="flex justify-between">
            <div>
              <span class="q-ml-md q-my-md text-subtitle text-grey-8 flex"> Visibilidade </span>
            </div>
            <div class="q-mt-md">
              <q-badge outline dense color="green" label="Imediatamente" />
            </div>
          </div>
          </q-expansion-item>
          <q-expansion-item
            expand-separator
            label="Categorias"
          >
          <q-option-group
            :options="category"
            type="checkbox"
            v-model="selectedCategory"
            />
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="Resumo"
          >
          <q-list bordered >
            <q-item tag="label" v-ripple>
              <q-item-section>
               <span class="q-ml-md q-my-md text-subtitle text-grey-8"> Escreva um resumo (Opcional) </span>

                <q-input
                  v-model="post.summary"
                  outlined 
                  type="textarea"
                />
              </q-item-section>
            </q-item>
          </q-list> 
          </q-expansion-item>
        </q-list>
    </div>
  </div>

  </div>
    <q-list class="flex justify-end q-mb-md q-mr-md">
      <q-btn class="q-ma-md bg-cyan-8 text-white" label="Publicar" @click="prePost(post)"/>
      <!-- <q-btn v-else class="q-ma-md bg-cyan-8 text-white" label="Publicar" @click="prePost(post)"/> -->
    </q-list>  
  </q-card>

</q-page>

</template>

<script>
import { Loading } from "quasar"

import noImage from 'src/assets/no-image.png'
import { 
  getCategory, 
  addPost, 
  s3policy, 
  saveImageFile, 
  getImgUrl,
  updatePost 
  } from '../service.js'
import plupload from 'plupload'
//import code from 'uuid'
import Timer from 'easytimer'
var timer = new Timer()

import { v4 as uuidv4 } from 'uuid';
import gtm from 'src/components/gtm'



function generateSelect(element) {
  return {
    label: element.name,
    value: element.id,
    ...element
  }
}

export default {
  name: 'Posts',
  data () {
    return {
      post: {
        title: '',
        description: 'Adicione aqui texto',
        summary: '',
        CategoryId: '',
        image: noImage,
        auhor: 'admin',
        isActive: true
      },
      isEdit: false,
      total_capacity: 0,
      current_type: 7,
      dragging: false,
      type: 7,
      files: [],
      pictures: [],
      upInstancePicture: {},
      category: [],
      selectedCategory: [],
      listFiles: [],
      screenHeight: window.innerHeight - 400,
      Image: {}
    }
  },
  methods: {
    checkFileSize (files) {
      return files.filter(file => file.size < 2048)
    },
    prePost (post) {
      if (this.isEdit == true ) {
        this.updatePost (post)
      } else {
        this.addPost(post)
      }

    },
    addPost (post) {
      post.category = this.selectedCategory.toString()
      post.CategoryId = parseInt(this.selectedCategory)
      console.log(post)
      console.log(this.selectedCategory)
      console.log(this.Image)
      this.post.image =  this.Image.imageId + this.Image.fileFormat 

    
      Loading.show()
      addPost(post)
        .then(response => {
          console.log(response)
          if (response == 'ok') {
            Loading.hide()
            this.$q.dialog({
              title: 'Novo Post',
              message: 'Post publicado com sucesso'
            }).onOk(() => {
              this.$router.push({ path: '/News', params: 'add'})
            })
          }
        })
        .catch(error => {
          Loading.hide()
          console.log(error)
        })
    },
    updatePost (post) {
      console.log(this.selectedCategory)
      post.categoryId = parseInt(this.selectedCategory)
      console.log(post)
        if (Number.isNaN(post.image)) {
              this.$q.dialog({
                title: 'Post',
                message: 'O campo Imagem é obrigatório'
              }).onOk(() => {
                // this.$router.push({ path: '/News'})
              })
        }
        if (Number.isNaN(post.categoryId)) {
              this.$q.dialog({
                title: 'Post',
                message: 'É necessário informar a categoria!'
              }).onOk(() => {
                // this.$router.push({ path: '/News'})
              })
        }
      Loading.show()
      updatePost(post.id, post)
        .then(response => {
          console.log(response)
          Loading.hide()
          if (response == 'updated') {
              this.$q.dialog({
                title: 'Post',
                message: 'Post atualizado'
              }).onOk(() => {
                this.$router.push({ path: '/News'})
              })
          }
        })
        .catch(error => {
          Loading.show()
          console.log(error)
        })
      // console.log(Number.isNaN(post.image))



// this.$q.dialog({
            //   title: 'Novo Post',
            //   message: 'Post editado com sucesso'
            // }).onOk(() => {
            //   // this.$router.push({ path: '/News'})
            // })
    },
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png')
    },
    getCategory () {
        getCategory()
          .then(response => {
            if(response === 'No data found') {
              this.noData = true
              console.log(this.noData)
            } else {
              this.noData = false
                console.log(response)
              let _category = response.map(generateSelect)
              this.category = _category
            }
          })
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
  mounted () {
    let self = this
    if(this.$route.params.id !== undefined) {
      this.post = this.$route.params
      this.isEdit = true

      this.selectedCategory = [this.post.categoryId]

      console.log(this.post)
    }
    console.log()
    this.getCategory()

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

  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>