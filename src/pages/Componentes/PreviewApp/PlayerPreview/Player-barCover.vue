<template>
      <div class="row no-wrap flex justify-around" style="min-height: 150px;">
          <div class="q-ma-sm flex justify-around">
              <div class="q-mt-md">
                <q-btn icon="fas fa-thumbs-down" flat style="font-size: 20px" />
              </div>
              <div class="q-mb-sm" style="max-width: 185px;">
                <audio
                id="audioTag"
                ref="audioFile"
                src="https://radio.stmsrv.com:31696/" />
                <q-btn :icon="iconPlayer" flat style="font-size: 40px" @click="changeIcon()"/>
              </div>
              <div class="q-mt-sm">
                <q-btn icon="fas fa-thumbs-up" flat style="font-size: 20px"/>
              </div>
            </div>
        </div>
</template>
<script>
export default {
  name: 'PlayerBarCover',
  components: { },
  props: ['data'],
  data () {
    return {
      iconPlayer: 'fas fa-play-circle',
      cover_img: 'src/assets/no-image.png',
      player: {
        curArtist: 'Nome do Artista',
        curMus: 'Nome da Musica',
        nextArt: 'Prox Artista',
        nextMus: 'Prox Musica'
      }
    }
  },
  methods: {
    changeIcon () {
      console.log(this.iconPlayer)
      switch (this.iconPlayer) {
        case 'fas fa-play-circle':
          this.iconPlayer = 'fas fa-pause-circle'
          break
        case 'fas fa-pause-circle':
          this.iconPlayer = 'fas fa-pause-circle'
          break
        default:
          break
      }
      this.play()
    },
    play () {
      const audio = document.getElementById('audioTag')

      if (!this.playing) {
        audio.play()
        this.playing = true
        // this.sendListener()
        // this.checkAudioPlaying()
        console.log('Audio tocando')
      } else {
        audio.pause()
        this.playing = false
        // this.updateStatusListener()
        console.log('Audio pausado')
        this.iconPlayer = 'fas fa-play-circle'
      }
    },
    limitString (text) {
      const limit = 100
      var result = text.slice(0, limit)
      return result
    },
    goToCover () {
      this.$router.push({ name: 'cover' })
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>
