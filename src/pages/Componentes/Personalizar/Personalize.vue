<template>
    <q-card class="q-ma-md q-pa-md full-widht">

            <div class="flex justify-start">
                <div class="flex q-ma-md">
                <q-item-label header>Gerencie aqui as informaçoes da sua Rádio</q-item-label>

                </div>
            </div>

    <div class="flex justify-between q-gutter-md">
        <div class="" style="max-width:900px">
            <q-item-section >
                <q-item-label class="text-h6 text-blue-grey-9">{{ 'Nome do Aplicativo' }}
                    <q-icon name="help_outline" color="black">
                        <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Este é o nome que será exibido nas lojas de aplicativos' }}
                        </div>
                        </q-tooltip>
                    </q-icon>
                </q-item-label>
            </q-item-section>
                <q-item class="q-ml-md" >
                    <q-item-section>
                        <q-item-label>
                        <q-input
                            v-model="stationName"
                            float-label="Nome do Aplicativo"
                            autocomplete="off"
                        />
                        </q-item-label>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>
                        <q-btn
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
        <q-separator spaced="lg"/>
            <div class="q-mt-md" >
            <q-item-section >
                <q-item-label class="text-h6 text-blue-grey-9">{{ 'Cores do Aplicativo' }}
                    <q-icon name="help_outline" color="black">
                        <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'Defina as 3 cores básicas do aplicativo' }}
                        </div>
                        </q-tooltip>
                    </q-icon>
                </q-item-label>
            </q-item-section>
            <q-list class="flex justify-start">

                <q-item class="q-ml-md flex" >
                    <q-item-section>
                        <q-item-label > Defina a cor Primária </q-item-label>
                    </q-item-section>
                    <q-item-section thumbnail>
                        <q-input 
                            v-model="bgPrimary"  
                            dense
                            outlined
                            :style="'color: white; background-color:'+ bgPrimary">
                            <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color
                                        v-model="bgPrimary"
                                        no-header
                                        no-footer
                                    />
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </q-item-section>
                </q-item>

                <q-item class="q-ml-md flex" >
                    <q-item-section>
                        <q-item-label > Defina a cor Secundária </q-item-label>
                    </q-item-section>
                    <q-item-section thumbnail>
                        <q-input 
                            v-model="bgSecondary"  
                            dense
                            outlined
                            :style="'color: white; background-color:'+ bgSecondary">
                            <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color
                                        v-model="bgPrimary"
                                        no-header
                                        no-footer
                                    />
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </q-item-section>
                </q-item>

                <q-item class="q-ml-md flex" >
                    <q-item-section>
                        <q-item-label > Defina a cor Terciária </q-item-label>
                    </q-item-section>
                    <q-item-section thumbnail>
                        <q-input 
                            v-model="bgTerciary"  
                            dense
                            outlined
                            :style="'color: white; background-color:'+ bgTerciary">
                            <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-color
                                        v-model="bgPrimary"
                                        no-header
                                        no-footer
                                    />
                                </q-popup-proxy>
                            </q-icon>
                            </template>
                        </q-input>
                    </q-item-section>
                </q-item>
            </q-list>
            </div>    
        <q-separator spaced="lg" />

            <div class="q-mt-md">
            <q-item-label class="text-h6 text-blue-grey-9" >{{ 'Exibir nome da música e capa do álbum' }}
                <q-icon name="help_outline" color="black">
                    <q-tooltip style="font-size: 14px">
                        <div>
                        {{ 'A Imagem padrão será utilizada quando não for possível obeter a imagem de determinado recurso como: Notícias, promoções, capa de disco e etc.:' }}
                        </div>
                    </q-tooltip>
                </q-icon>
            </q-item-label>
                <q-item >
                    <q-item-label class="q-ml-sm">
                    <q-toggle v-model="musicInfo" class="q-mr-md flex" label="Permite exibir ou não as informções da musica em execução e a capa do disco" />
                    </q-item-label>
                </q-item>
            </div>
        <q-separator spaced="lg"/>
    
            <div class="q-mt-md">
                <q-item-label class="text-h6 text-blue-grey-9">{{ 'Ícone do Aplicativo' }}
                    <q-icon name="help_outline" color="black">
                        <q-tooltip style="font-size: 14px">
                            <div>
                            {{ 'Ícone exibido na bandeija de apps após a instalação' }}
                            </div>
                        </q-tooltip>
                    </q-icon>
                </q-item-label>
                <q-item class="">
                    <q-item-section avatar class="q-gutter-sm">
                        <q-btn color="primary" icon="add" label="Upload" />
                        <span>Arquivos permitidos Imagens (JPG e PNG) </span>
                        <span>Tamanho máximo 10 MB </span>
                        <span>Dimensão 1024x1024 </span>
                    </q-item-section>
                    <q-item-section>
                        <q-img
                            :src="noImage"
                            style="height: 140px; max-width: 150px"
                            class="q-ma-sm"
                        >
                        <template v-slot:error>
                        <div class="absolute-full flex flex-center bg-grey-8 text-white">
                            Nenhuma imagem selecionada
                        </div>
                        </template>
                    </q-img>
                    </q-item-section>

                </q-item>
            </div>
        </div>

        <div class="preview q-ml-md flex" >
            <div class="flex">
                <span class="text-blue-grey-9 q-mr-md"> Preview do App </span>
            </div>
            <div class="flex">
                <!-- <iframe id="android-iframe" frameborder="0" src="https://v0-14.quasar-framework.org/quasar-play/android/index.html#/showcase/style-and-identity/color-palette"></iframe> -->
                <PreviewApp />
            </div>
        </div>
    </div>

    </q-card>
</template>

<script>
import noImage from 'src/assets/no-image.png'
import PreviewApp from '../PreviewApp/PreviewApp.vue'


// import { saveUrl, getAllUrls, updateUrlById, deleteUrlById } from '../service.js'
// import { Dialog } from 'quasar'

export default {
  name: "Personalize",
  components : {
      PreviewApp
  },
    data() {
      return {
        noImage: noImage,
        musicInfo: true,
        stationName: 'Radio ABC',
        primaryColor: '#0097a7',
        bgPrimary: '#0097a7',
        bgSecondary: '#26A69A',
        bgTerciary: '#dd4b39'
    }
  },
  methods: {

  },
  mounted () {
    this.getAllUrls()
  },
  watch: {
    primaryColor(val) {
      this.color = val
    }
  }
}
</script>
<style scoped>
.roundImage {
  border-radius: 50%;
}
</style>