<template>
<div class="q-ma-sm">
  <template >
    <div class="flex justify-evenly news" style="background-color: #00516c;">
      <div class="flex" v-for="item in news" :key="item.publishedAt">
        <q-card class="cardNews q-mb-sm" @click="gotoNews(item)">
        <q-img
          :src="item.imageUrl"
          v-if="item.imageUrl != ''"
          >
            <div class="absolute-bottom titleNews text-weight-light">
              <span>{{ item.title }}</span>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </template>
</div>
</template>
<script>
import Axios from 'axios'
import { date } from 'quasar'
// import localforage from 'localforage'
import { getNews } from 'src/pages/Componentes/service.js'
import axios from 'axios'

const moment = require('moment')

export default {
  name: 'News',
  //   components: { date },
  data () {
    return {
      img: '',
      subject: '',
      pub: '',
      news: [],
      isLoading: false
    }
  },
  methods: {
    async getNews () {
      let date = moment(Date.now()).format('YYYY-MM-DD')
      const noticias = []
      this.isLoading = true
      // var uri = 'https://newsapi.org/v2/everything?q=all&apiKey=043097549b174edd84cd9d36d04d3e79&from=' + date + '&language=pt'
      // var uri = 'https://appradio-backend.herokuapp.com/getNews'
      getNews()
        .then(response => {
          console.log('News')
          console.log(response)
            // localforage.setItem('APP_NEWS', JSON.stringify(response))
            response.forEach(element => {
              this.isLoading = false
              noticias.push(element)
            })
            })

      // getNews(date).then(response => {
      //   localforage.setItem('APP_NEWS', JSON.stringify(response))
      //   response.articles.forEach(element => {
      //     this.isLoading = false
      //     noticias.push(element)
      //   })
      // })
      
      console.log(noticias)
      this.news = noticias
    },

    gotoNews (news) {
      this.$router.push({ name: 'noticia', params: news })
      console.log(news)
    },
    formatDate (data) {
      const newDate = date.formatDate(data, 'DD-MM-YYYY')
      return newDate
    }
  },
  mounted () {
    const firstLoading = window.localStorage.getItem('FirstLoading')
    console.log(this.firstLoading)

    this.getNews()


    // comentei as linhas abaixo a fim de tentar identificar o motivo das noticias não aparecerem no celular
    // if (parseInt(firstLoading) === 1) {
    //   console.log('Segundo carregamento')
    //   // window.localStorage.setItem('FirstLoading', 1)
    //   this.getLocalNews()
    // } else {
    //   window.localStorage.setItem('FirstLoading', 1)
    //   this.getNews()
    // }
    // this.getTotalArtiles()
    console.log(this.news.length)
  }
}

</script>
<style scoped>
.news {
  width: 20vw;
  height: 25vh;
}
.cardNews {
  width: 38vh;
  /* width: 190px;
  height: 250px; */
}
.section {
  height: 20px;
}
.titleNews {
  /* max-height: 80px; */
  backdrop-filter: blur(10px);
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}
@media only screen and (max-width: 380px) {

.cardNews {
  width: 170px;
}
}
@media only screen and (max-width: 320px) {

.cardNews {
  width: 150px;
}
}
@media only screen and (min-device-width: 420px) and (max-device-width: 570px) and (orientation:portrait) {
.cardNews {
  width: 250px;
}
}
</style>
