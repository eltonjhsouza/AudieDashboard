<template>
    <q-card class="q-ma-md full-widht">

        <div class="flex justify-start">
            <div class="flex q-ma-md">
                <!-- <q-btn label="Adicionar Novo" class="bg-cyan-8 text-white" @click="addModal=true"/> -->
            <q-item-label header>Gerencie aqui as informaçoes da sua Rádio</q-item-label>

            </div>
        </div>

  <div class="group q-ma-md">
    <q-item-section >
      <q-item-label >{{ 'Nome de Exbição' }}</q-item-label>
    </q-item-section>

    <div class="">
      <div class="q-ma-md">
        <q-item class="q-ml-md" >
          <q-item-section>
            <q-item-label>
              <q-input
                :disable="allowEdit"
                v-model="stationName"
                float-label="Nome da emissora"
                autocomplete="off"
              />
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-btn
              v-if="allowEdit"
              dense
              class="q-ma-md q-pl-md q-pr-md"
              no-caps
              color="primary"
              @click="editStation"
              label="Salvar"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
    <q-item-section >
        <q-item-label >{{ 'LogoMarca' }}</q-item-label>
    </q-item-section>
        <q-item class="q-ml-md" >
          <q-item-section>
            <q-item-label>
              <q-input type="file"/>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-btn
              v-if="allowEdit"
              dense
              class="q-ma-md q-pl-md q-pr-md"
              no-caps
              color="primary"
              @click="editStation"
              label="Salvar"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

      <q-item >
        <q-item-label class="q-ml-sm">
        <q-item-label >{{ 'Imagem Padrão' }}
          <q-icon name="help_outline" color="black">
            <q-tooltip style="font-size: 14px">
            <div>
            {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
            </div>
            </q-tooltip>
          </q-icon>
        </q-item-label>
        <q-toggle v-model="defaultImage" class="q-mr-md flex" label="Usar Logomarca como imagem padrão?" />
        </q-item-label>
      </q-item>

        <q-item class="q-ml-md" v-if="defaultImage == true" >
          <q-item-section>
        <q-item-label lines="1">{{ 'Faça o upload da imagem padrão' }}</q-item-label>
            <q-item-label>
              <q-input type="file"/>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-btn
              v-if="allowEdit"
              dense
              class="q-ma-md q-pl-md q-pr-md"
              no-caps
              color="primary"
              @click="editStation"
              label="Salvar"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

      <q-item >
        <q-item-label class="q-ml-sm">
        <q-item-label >{{ 'Exibir nome da música e capa do álbum' }}
          <q-icon name="help_outline" color="black">
            <q-tooltip style="font-size: 14px">
            <div>
            {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
            </div>
            </q-tooltip>
          </q-icon>
        </q-item-label>
        <q-toggle v-model="musicInfo" class="q-mr-md flex" label="Permite exibir ou não as informções da musica em execução e a capa do disco" />
        </q-item-label>
      </q-item>



      </div>


      </div>
    </div>

    <q-dialog v-model="addModal" persistent>
      <q-card style="width:350px">
        <q-card-section class="">
          <div class="q-mb-md">
            <q-input outlined v-model="urlStreaming.description" dense label="Nome" />
          </div>

          <div class="q-mb-md">
            <q-input outlined v-model="urlStreaming.url" dense label="Endereço do Streaming" />
          </div>

          <div class="q-ma-sm flex justify-start">
          <q-toggle v-model="urlStreaming.status" class="q-mr-md flex" label="Status" />
          <div class="flex q-mt-md">
          <q-badge v-if="urlStreaming.status==false" rounded color="red" label="Inativo" style="height: max-content;"/>
          <q-badge v-else rounded color="green" label="Ativo" style="height: max-content;" />
          </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="save(urlStreaming)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editModal" persistent>
      <q-card style="width:350px">
        <q-card-section class="">
          <div class="q-mb-md">
            <q-input outlined v-model="urlStreaming.description" dense label="Nome" />
          </div>

          <div class="q-mb-md">
            <q-input outlined v-model="urlStreaming.url" dense label="Endereço do Streaming" />
          </div>

          <div class="q-ma-sm flex justify-start">
          <q-toggle v-model="status" class="q-mr-md flex" label="Status" />
          <div class="flex q-mt-md">
          <q-badge v-if="urlStreaming.status==false" rounded color="red" label="Inativo" style="height: max-content;"/>
          <q-badge v-else rounded color="green" label="Ativo" style="height: max-content;" />
          </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Atualizar" color="primary" @click="update(urlStreaming, status)" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-card>
</template>

<script>
import { saveUrl, getAllUrls, updateUrlById, deleteUrlById } from '../service.js'
import { Dialog } from 'quasar'

export default {
  name: "StationInfo",
    data() {
      return {
        musicInfo: true,
        defaultImage: false,
        stationName: 'Radio ABC',
        allowEdit: true,
        editModal: false,
        addModal: false,
        lstUrls: [],
        urlStreaming: {
          description: '',
          url: '',
          status: true,
          TypeId: 1
        },
        type: '',
        status: true,
        payload: {},
        noData: false
    }
  },
  methods: {
    openEditModal (item) {
      // console.log(item)
      this.editModal = true
      this.urlStreaming = item
      // this.name = item.name
      this.status = item.isActive
    },
    update (payload, status) {
      // this.payload = payload
      payload.isActive = status
      // console.log(this.payload)
      updateUrlById(payload.id, payload)
      .then(response => {
        console.log(response)
        if (response == 'updated') {
            this.$q.dialog({
              title: 'Url',
              message: 'Url Atualizada com sucesso!'
            }).onOk(() => {
              this.editModal = false
              this.lstUrls = []
              this.getAllUrls()
            })
        }
        this.editModal = false
      })
      .catch(error => {
        console.log(error)
      })
    },

    _delete (item) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Tem certeza que deseja remover esse registro?'
      }).onOk(() => {
        deleteUrlById(item.id)
        .then(response => {
          if(response == 'ok') {

            this.$q.dialog({
              title: 'Url',
              message: 'Url removida com sucesso'
            }).onOk(() => {
              this.editModal = false
              this.lstUrls = []
              this.getAllUrls()
            })
          }
        })
        .catch(error => {
          if(error.response.status == 500) {
            this.$q.dialog({
              title: 'Categoria em Uso',
              message: 'Não é possível remover uma categoria que esteja em uso'
            }).onOk(() => {

            })
          }
          console.log(error.response.status)
        })
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

    },
    save(urlStreaming) {
        console.log(urlStreaming)

        saveUrl(urlStreaming)
        .then(response => {
          console.log(response)
          if(response === 'ok') {
            this.$q.dialog({
              title: 'Streaming',
              message: 'URL de streaming cadastrada com sucesso.'
            }).onOk(() => {
              this.lstUrls = []
              this.getAllUrls()
            })

          }
        })
    },
    getAllUrls () {
     let self = this
      getAllUrls()
        .then(response => {
          if (response.length > 0 ) {
            self.noData = false
          }
          response.forEach(element => {
            self.lstUrls.push(element)
          });
        })
    },
    getUrl () {
      getUrl(urlStreaming.TypeId)
        .then(response => {
          console.log(response)
        })
    },
    editStation () {
      this.allowEdit = false
    }
  },
  mounted () {
    this.getAllUrls()
  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>