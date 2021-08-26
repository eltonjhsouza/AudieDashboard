<template>
    <q-card class="q-ma-md full-widht">

        <div class="">
            <div class="q-ma-md">
                <q-btn label="Adicionar Nova"  class="bg-cyan-8 text-white q-mt-md" to="NewPost"/>
            </div>
        </div>
      <div class="q-ma-sm">
        <q-item-label header>Noticias cadastradas</q-item-label>
      </div>
      <q-list bordered padding class="rounded-borders" v-for="item in posts" :key="item.id" style="width: 100%">

      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-img
          class="roundImage"
          style="height: 50px; width: 50px"
          :src="item.imageUrl" />
        </q-item-section>
        <q-item-section >
          <q-item-label lines="1"> {{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.summary }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1"> {{ 'Author'}}</q-item-label>
          <q-item-label caption>{{ item.auhor }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1"> {{ 'Categoria'}}</q-item-label>
          <q-item-label caption>{{ item.category }}</q-item-label>
        </q-item-section>


        <q-item-section>
          <q-item-label lines="1"> {{ 'Publicado'}}</q-item-label>
          <q-item-label caption>{{ item.publishedAt }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="deletePost(item.id)"/>
            <q-btn class="gt-xs" size="12px" flat dense round @click="editPost(item)" icon="edit" />
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>
    </q-list> 
    </q-card>
</template>

<script>
import { Loading } from "quasar"
import noImage from 'src/assets/no-image.png'

import { getPosts, getImgUrl, deletePost } from '../service.js'

export default {
  name: "PagNews",
    data() {
      return {
        noImage: noImage,
        posts: []
    }
  },
  methods: {
    editPost (item) {
      this.$router.push({ name: 'NewPost', params: item })
    },
    deletePost (val) {
      Loading.show()
      deletePost(val)
        .then(response => {            
          if (response == 'ok') {
            Loading.hide()
            this.$q.dialog({
              title: 'Post',
              message: 'Post removido com sucesso'
            }).onOk(() => {
              this.posts = []
              this.getPosts()
              // this.$router.push({ path: '/'})
            })
          }
        })
        .catch(error => {
          Loading.hide()
          console.log(error)
        })
    },
  getImgUrl (val) {
    let url
    getImgUrl(val)
      .then(response => {
        url = response
      })
      return url
  },
  getPosts () {
    getPosts()
      .then(response => {
        response.forEach(element => {

          this.posts.push(element)

        });
          console.log(this.posts)
      })
  }
    
  },
  mounted () {
    this.getPosts()
    // console.log(this.$route.params)
    // console.log(this.noImage)
  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>