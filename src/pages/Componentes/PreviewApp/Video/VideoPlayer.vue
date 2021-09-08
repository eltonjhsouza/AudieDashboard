<template>
    <div class="">
          <div class="Flex row justify-around q-pa-md q-mt-md" style="height:50px; background-color: #002748">
            <div class="flex">
              <q-btn class="flex" color="red" style="width: 65px; height: 22px; font-size: 8px;" label="AO VIVO" />
              <div class="col">
                <span class="text-white q-ml-sm">{{ 'The best of Music'}}</span>
                <span class="text-white q-ml-sm">{{ 'William Leal'}}</span>
              </div>
            </div>
            <div class="flex">
              <q-btn class="flex" color="red" style="width: 40px; height: 22px; font-size: 8px;" @click="showVideo = !showVideo">
                <template>
                  <q-icon name="fab fa-youtube" />
                </template>
              </q-btn>
              <div class="col">
              </div>
            </div>
          </div>
          <q-card class="cardVideo" flat v-if="showVideo == true" >
              <q-expansion-item
                group="somegroup"
                icon="fab fa-youtube"
                label="A ABC também é TV"
                default-closed
                header-class="text-red"
              >
                <div class="q-ma-sm q-pa-sm flex justify-center" id="video">
                  <iframe id="player_web_tv" class="cover" src="https://playerv.voxtvhd.com.br/video/willian103fm/1/false/false/c3RtdjEudm94dHZoZC5jb20uYnIrMQ==/16:9/nocover/nao" scrolling="no" frameborder="0" allowfullscreen />
                </div>
              </q-expansion-item>
          </q-card>
    </div>
</template>
<script>

export default {
  name: 'VideoPlayer',
  components: { },
  data () {
    return {
      showVideo: true
    }
  },
  methods: {
    gotoPage (item) {
      // this.$router.push({ name: 'cadastro', params: item })
    }
  },
  created () {
    // console.log(this.promo)
  }
}
</script>
<style scoped>
.cardVideo {
  border-radius: 0%;
}
</style>
