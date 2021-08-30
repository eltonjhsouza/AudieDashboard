<template>
    <q-card class="q-ma-md full-widht">

        <div class="flex justify-start">
            <div>
              <q-item-label header>Informe o endereço do arquivo XML contendo informações da mídia em execução</q-item-label>
            </div>
        </div>
        <div class="flex q-ma-md">
            <q-btn label="Adicionar Novo" class="bg-cyan-8 text-white" @click="addModal=true"/>
        </div>

      <q-list bordered padding class="rounded-borders" v-for="item in lstUrls" :key="item.id" style="width: 100%">

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1">{{ item.description }}</q-item-label>
        </q-item-section>
        
        <q-item-section>
          <q-item-label lines="1">{{ item.type.description }}</q-item-label>
        </q-item-section>


        <q-item-section>
          <q-item-label lines="1">{{ item.url }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge v-if="item.isActive == true" rounded color="green" label="Ativo" />
          <q-badge v-else rounded color="red" label="Inativo" />
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="_delete(item)"/>
            <q-btn class="gt-xs" size="12px" flat dense round icon="edit" @click="openEditModal(item)"/>
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

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
import { saveUrl, updateUrlById, deleteUrlById, getAllUrlsByTypeId  } from '../service.js'
import { Dialog } from 'quasar'

export default {
  name: "Metadata",
    data() {
      return {
        editModal: false,
        addModal: false,
        lstUrls: [],
        urlStreaming: {
          description: '',
          url: '',
          status: true,
          TypeId: 4
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
              this.getAllUrlsByTypeId()
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
              this.getAllUrlsByTypeId()
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
              this.getAllUrlsByTypeId()
            })

          }
        })
    },
    getAllUrlsByTypeId () {
     let self = this
      getAllUrlsByTypeId(this.urlStreaming.TypeId)
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
    }
  },
  mounted () {
    this.getAllUrlsByTypeId()
  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>