<template>
    <q-card class="flex q-ma-md full-widht">

        <div class="flex justify-start">
            <div class="flex q-ma-md">
                <q-btn label="Adicionar Novo" class="bg-cyan-8 text-white" @click="addCategoryModal=true"/>
            </div>
        </div>
  
      <q-item-label header>Endereços de Streamig Cadastrados</q-item-label>
      <q-list bordered padding class="rounded-borders" v-if="noData==true" style="width: 100%">
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1">{{ 'Não existe categoria cadastrada' }}</q-item-label>
          <!-- <q-item-label caption>Ciclismo é visto por como um dos melhores modais de transporte</q-item-label> -->
        </q-item-section>
      </q-item>
    </q-list>



      <q-list bordered padding class="rounded-borders" v-for="item in category" :key="item.id" style="width: 100%">

      <q-item clickable v-ripple>
        <!-- <q-item-section avatar top>
          <q-img
          class="roundImage"
          style="height: 50px; width: 50px"
          src="https://static.plox.com.br/uploads/body/2021-08/c1692c24623e04c60bed-foto-corridad-de-bike.jpg" />
        </q-item-section> -->

        <q-item-section>
          <q-item-label lines="1">{{ item.name }}</q-item-label>
          <!-- <q-item-label caption>Ciclismo é visto por como um dos melhores modais de transporte</q-item-label> -->
        </q-item-section>

        <q-item-section side>
          <q-badge v-if="item.isActive == true" rounded color="green" label="Ativo" />
          <q-badge v-else rounded color="red" label="Inativo" />
          <!-- <q-item-label caption>Ciclismo é visto por como um dos melhores modais de transporte</q-item-label> -->
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="deleteCategory(item)"/>
            <q-btn class="gt-xs" size="12px" flat dense round icon="edit" @click="editCategory(item)"/>
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="addCategoryModal" persistent>
      <q-card style="width:350px">
        <q-card-section class="">
          <q-input outlined v-model="name" label="Nome da Categoria" />
          <div class="q-ma-sm flex justify-start">
          <q-toggle v-model="status" class="q-mr-md flex" label="Status" />
          <div class="flex q-mt-md">
          <q-badge v-if="status==false" rounded color="red" label="Inativo" style="height: max-content;"/>
          <q-badge v-else rounded color="green" label="Ativo" style="height: max-content;" />
          </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" @click="saveCategory(name, status)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editCategoryModal" persistent>
      <q-card style="width:350px">
        <q-card-section class="">
          <q-input outlined v-model="payload.name" label="Nome da Categoria" />
          <div class="q-ma-sm flex justify-start">
          <q-toggle v-model="status" class="q-mr-md flex" label="Status" />
          <div class="flex q-mt-md">
          <q-badge v-if="payload.isActive==false" rounded color="red" label="Inativo" style="height: max-content;"/>
          <q-badge v-else rounded color="green" label="Ativo" style="height: max-content;" />
          </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Atualizar" color="primary" @click="updateCategory(payload, status)" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-card>
</template>

<script>
import { getCategory, getCategoryById, updateCategory, deleteCategory, addCategory } from '../service.js'
import { Dialog } from 'quasar'

export default {
  name: "PageCategory",
    data() {
      return {
        editCategoryModal: false,
        addCategoryModal: false,
        category: [],
        name: '',
        status: true,
        payload: {},
        noData: false
    }
  },
  methods: {
    editCategory (item) {
      // console.log(item)
      this.editCategoryModal = true
      this.name = item.name
      this.status = item.isActive
      this.payload = item

      // updateCategory(item.id, payload)
      //   .then(response => {
      //     console.log(response)
      //   })
      // this.$router.push({ name: 'NewPost', params: item })
    },
    updateCategory (payload, status) {
      this.payload = payload
      this.payload.isActive = status
      console.log(this.payload)
      updateCategory(this.payload.id, this.payload)
      .then(response => {
        console.log(response)
        this.editCategoryModal = false
      })
    },
    getCategory () {
      getCategory()
        .then(response => {
          if(response === 'No data found') {
            this.noData = true
            console.log(this.noData)
          } else {
            this.noData = false
            response.forEach(element => {
            this.category.push(element)
            });
          }
            console.log(this.noData)
        })
    },
    deleteCategory (item) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Tem certeza que deseja remover essa categoria?'
      }).onOk(() => {
        deleteCategory(item.id)
        .then(response => {
          // console.log(response)
          this.editCategoryModal = false
          if(response == 'ok') {
            this.editCategoryModal = false
            this.category = []
            this.getCategory()
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
    saveCategory (name, status) {
      console.log(name)
      console.log(status)
      this.payload = {
        name: name,
        isActive: status
      }
      addCategory(this.payload)
        .then(response => {
          console.log(response)
          if(response == 'ok') {
            this.addCategoryModal = false
            this.category = []
            this.getCategory()
          }
        })
    }
    
  },
  mounted () {
    this.getCategory()
  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>