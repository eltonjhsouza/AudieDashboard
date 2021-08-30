<template>
  <q-page>
    <div style="padding:30px;">
      <q-card class="bigger" color="white" text-color="black">
        <q-card-section class="relative-position">
          <div style="display:flex;">
            <div id="settings-icon">
              <q-icon
                name="fas fa-cogs"
                style="padding:10px; font-size:75px;"
              />
            </div>
            <div id="settings-title" class="q-pl-lg q-pt-md">
              <div class="ellipsis">{{ 'Configurações' }}</div>
              <div class="ellipsis">
                {{ 'Rádio' }}・<span
                  slot="subtitle"
                  class="text-faded"
                  >{{ 'station_name' }}</span
                >
              </div>
            </div>
          </div>
        </q-card-section>
        <!-- <q-card-separator color="black" /> -->
        <q-card-section style="padding:0px;">
          <q-tabs
            v-model="tab"
            narrow-indicator
            dense
            align="justify"
            class="text-primary"
          >
            <q-tab :ripple="false" name="radio"  label="Rádio" />
            <q-tab :ripple="false" name="streamsources" @click="tab='streamsources'" label="Stream Sources" />
            <q-tab :ripple="false" name="metadata" label="Metadata Url" />
            <q-tab :ripple="false" name="podcast" label="Podcast RSS" />
            <q-tab :ripple="false" name="news" label="Notícias RSS" />

          </q-tabs>
          <q-separator />
            <q-tab-panels v-model="tab">
              <q-tab-panel name="radio">
                <StationInfo />
              </q-tab-panel>

              <q-tab-panel name="streamsources">
                <streaming />
              </q-tab-panel>

              <q-tab-panel name="metadata">
                <Metadata />
                
              </q-tab-panel>

              <q-tab-panel name="podcast">
                <PodcastRss />
              </q-tab-panel>

              <q-tab-panel name="news">
                <NewsRss />
              </q-tab-panel>
            </q-tab-panels>

        </q-card-section>
      </q-card>
    </div>

    <!-- <q-modal  :content-css="{ minWidth: '25vw' }">
      <div style="padding: 20px">
        <div class="q-title q-mb-md">
          {{ 'User Name' }}
        </div>
        <q-field class="q-mb-sm q-mt-lg">
          <q-input
            v-model="user_name"
            :float-label="'User'"
            autofocus
          />
        </q-field>
        <div class="flex q-mt-lg" style="justify-content:flex-end;">
          <q-btn
            class="q-ma-md"
            no-caps
            color="primary"
            @click="changeUserName"
            label="Salvar"
          />
        </div>
      </div>
    </q-modal>

    <q-modal  :content-css="{ minWidth: '25vw' }">
      <div style="padding: 20px">
        <div class="q-title q-mb-md">
          {{ $t('layout.settings.edit_station_name') }}
        </div>
        <q-field class="q-mb-sm q-mt-lg">
          <q-input
            v-model="user_name"
            :float-label="'User'"
            autofocus
          />
        </q-field>
        <div class="flex q-mt-lg" style="justify-content:flex-end;">
          <q-btn
            class="q-ma-md"
            no-caps
            color="primary"
            @click="changeStationName"
            :label="'Save'"
          />
        </div>
      </div>
    </q-modal> -->
  </q-page>
</template>

<script>
import Streaming from '../Componentes/Streaming/Streaming.vue'
import Metadata from '../Componentes/Metadados/Metadata.vue'
import PodcastRss from '../Componentes/PodcastRss/PodcastRss.vue'
import NewRss from '../Componentes/Metadados/Metadata.vue'
import News from '../News/News.vue'
import NewsRss from '../Componentes/NewsRss/NewsRss.vue'
import StationInfo from '../Componentes/StationInfo/StationInfo.vue'


export default {
  data () {
    return {
      tab: 'radio',
      editUserName: false,
      editStationName: false,
      lang: '',
      user_acronym: '',
      user_name: 'Elton',
      user_email: 'eltonjhsouza@gmail.com',
      station_name: '',
      images: [],
      showImage: ''
    }
  },
  methods: {
  },
  created () {

  },
  components: {
    Streaming,
    Metadata,
    PodcastRss,
    NewRss,
    News,
    NewsRss,
    StationInfo
  }
}
</script>

<style>
.q-table-container {
  background: rgb(36, 15, 15);
}
.q-toolbar {
  min-height: 30px;
}
.colorBlack textarea {
  color: black !important;
}
.colorBlack .q-if-label-inner {
  color: #777 !important;
}
.background-cover {
  width: 200px;
  height: 100px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.select-background-cover {
  width: 150px;
  height: 80px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.full-width .q-btn-dropdown-current {
  width: 100%;
}
#settings-icon {
  border-radius: 20px;
  color: #fff;
  background-color: #777;
  width: 110px;
}
@media only screen and (max-width: 992px) {
  #settings-icon {
    border-radius: 10px;
    color: #fff;
    background-color: #777;
    width: 65px;
    height: 60px;
  }
  #settings-icon i {
    font-size: 38px !important;
  }
  #settings-title {
    padding-top: 0px;
    padding-left: 15px;
  }
}
</style>
