
<template style="max-width:100px">
  <q-layout view="hHh lpR fFf">
    <q-header elevated style="background-color: transparent; backdrop-filter: blur(20px);">
      <q-toolbar class="flex justify-center q-ma-sm">
          <!-- <div class="flex justify-start">
            <q-icon v-show="this.$route.name != 'home'" name="chevron_left" size="30px" @click="gotoHome"/>
          </div> -->
        <q-img :src="logomarca" class="flex" style="max-width:100px" />
          <div class="flex justify-start">
            <!-- <q-icon name="ios_share" size="30px" /> -->
          </div>
      </q-toolbar>
    </q-header>

  <q-footer style="background-color: #00537159; backdrop-filter: blur(20px);">

    <q-expansion-item 
      dark
      expand-icon-toggle
      switch-toggle-side
      expand-icon-class="iconExpand"
      expand-icon="expand_less"
      expanded-icon-class="iconExpanded"
      expanded-icon="chevron_left"
      @after-hide="hideMenu(0)"
      @show="hideMenu(1)">
        <template v-slot:header >
          <q-item-section avatar v-show="openedCover">
            <q-img
            class="roundImage cropImg"
            :src="cover_img" />
          </q-item-section>

          <q-item-section v-show="openedCover">
            <div class="text-uppercase">
            {{ player.curArtist }}
            </div>
            <div class="text-caption">
            {{ player.curMus }}
            </div>
          </q-item-section>
          <q-item-section side style="z-index: index 1;" v-show="openedCover">
            <div class="row items-center" >
              <audio
              id="audioTag"
              ref="audioFile"
              src="https://radio.stmsrv.com:25584" />
              <q-btn :icon="iconPlayer" flat style="font-size: 20px" @click="changeIcon()"/>
            </div>
          </q-item-section>

          <q-item-section avatar v-show="openedCover==false" class="q-ml-xl q-mr-xl">
             <q-img :src="logomarca" class="flex justify-center" style="width:100px" />
          </q-item-section>
          <q-item-section avatar v-show="openedCover==false" class="q-ml-md">

          </q-item-section>
          <q-item-section avatar v-show="openedCover==false" class="">
            <q-icon name="ios_share" size="30px" />
          </q-item-section>
        </template>

        <q-card style="height:calc(100vh - 9vh);overflow-y: auto; background-color: transparent; backdrop-filter: blur(25px);">
          <q-footer style="background-color: transparent; backdrop-filter: blur(25px);">
          <q-card-section class="flex justify-center">
            <q-img
            class="q-mt-xl flex"
            width="56vw"
            height="30vh"
            :src="cover_img"
            style="border-radius: 10px"
            />
          </q-card-section>
          <div class="col q-ma-md q-pa-sm q-gutter-sm">
            <div class="flex justify-center text-h4">
              <span class="text-white"> <b>{{ player.curArtist }}</b></span>
            </div>
            <div class="flex justify-center text-h5">
              <span class="text-white"> {{ player.curMus }} </span>
            </div>
            <div class="flex justify-center">
              <q-btn color="white" flat text-color="white" style="border-radius: 20px" label="VER LETRA" hidden @click="getLetter"/>
            </div>
          </div>
            <PlayerBarCover :data="iconPlayer" />
          </q-footer>
        </q-card>
    </q-expansion-item>

    <q-toolbar-title
      :style="'background-color: #005371; backdrop-filter: none;' + styles"
      v-show="this.$route.name != 'cover'">
        <q-tabs
          v-model="tab"
          dense
          align="justify"
          class="menuTabs"
        >
          <q-tab class="text" name="home" icon="home" label="Home" no-caps  @click="gotoHome"/>
          <q-tab class="text-weight-thin" name="promo" label="Promoções"  icon="style" no-caps  @click="gotoPromo"/>
          <q-tab class="text-weight-thin" name="tv" label="TV" icon="live_tv" no-caps  @click="gotoHome"/>
          <q-tab class="text-weight-thin" name="redes" label="Redes Sociais"  icon="people_alt" no-caps @click="gotoSocial"/>
        </q-tabs>
      </q-toolbar-title>
  </q-footer>

    <!-- <q-page-container> -->
      <!-- <router-view /> -->
      <div class="wrapper center q-mt-md">
          <div class="item q-ml-sm">
            <Banners />
          </div>
      </div>
      <VideoPlayer />
      <News />
    <!-- </q-page-container> -->


      <q-dialog v-model="showLetter" full-width full-height>
        <q-card class="text-white" style="background-color: #00000080; backdrop-filter: blur(10px); border-radius:10px;">
          <q-card-section >
            <q-btn flat icon="fas fa-arrow-left" color="text-white" v-close-popup />
            <div class="text-h6"> {{ player.curMus }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none scroll"  style="max-height: 80vh">
            <q-img :src="logomarca" class="flex justify-end q-ma-md" style="width:103px" />
            <!-- <span v-html="musicLetter"/> -->
            <!-- <Letter :data="musicLetter" v-if="musicLetter==1  "/> -->
          </q-card-section>
        </q-card>
      </q-dialog>
  </q-layout>
</template>

<script>
import noImage from 'src/assets/no-image.png'
import defaultLogo from './Logo.png'
import PlayerBarCover from './PlayerPreview/Player-barCover.vue'
import News from './PostsPreview/News.vue'
import Banners from './Banners/Banners.vue'
import VideoPlayer from './Video/VideoPlayer.vue'

export default {
  name: "PreviewApp",
  components: {
    PlayerBarCover,
    News,
    Banners,
    VideoPlayer
  },
  props: ['data'],
    data() {
      return {
        show: false,
        cover_img: noImage,
        showLetter: false,
        logomarca: defaultLogo,
        tab: 'mails',
        iconPlayer: 'play_arrow',
        openedCover: true,
        styles: '',
        player: {
          curArtist: 'Nome do Artista',
          curMus: 'Nome da Musica',
          nextArt: 'Prox Artista',
          nextMus: 'Prox Musica'
        }
    }
  },
  methods: {
    hideMenu (val) {
      if (val === 1) {
        console.log(val)
        this.styles = 'height: 0px'
        this.openedCover = false
      } else {
        this.styles = ''
        this.openedCover = true
      }
    },
    gotoHome () {
    },
    gotoSocial () {
    },
    gotoPromo () {
    },
    getLetter () {
    }
  },
  mounted () {
      // this.logomarca = this.data
      console.log(this.logomarca)
      console.log(this.$route.name)
  },
  watch: {
    primaryColor(val) {
      this.color = val
    }
  }
}
</script>
<style scoped>
.wrapper {
    overflow-x: auto;
    display: flex;
}
.wrapper::-webkit-scrollbar {
    widows: 0;
    display: none;
}
.wrapper .item {
    /* min-width: 110px; */
    /* line-height: 110px; */
    margin-right: 10px;
}

.q-item.q-item-type.row.no-wrap.q-item--dark {
    height: 10vh;
}

@media only screen and (max-width: 1920px) {
  .cropImg {
    widows: 20px;
}
.q-item.q-item-type.row.no-wrap.q-item--dark {
    height: 10vh;
}
}
</style>