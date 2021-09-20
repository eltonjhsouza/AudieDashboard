<template>
  <q-card style="min-width: 50vw;">
    <q-card-section
      class="q-pa-md"
      style="text-align: center; height:325px; overflow: hidden;"
    >
      <transition-group :name="back ? 'slideback' : 'slide'">
        <div v-if="currentIndex === 0" key="0">
          <div class="q-mt-md q-mb-md text-h4 text-blue-10">
            {{ $t("components.guide_tour.welcome") }}
          </div>
          <div class="text-subtitle1">
            {{ $t("components.guide_tour.detail1") }}
          </div>
          <div class="text-subtitle1">
            {{ $t("components.guide_tour.detail2") }}
          </div>
          <div class="q-pa-xs flex flex-center">
            <q-card
              class="q-ma-md bg-orange text-white guide-option-card"
              @click="
                () => {
                  this.back = false
                  this.currentIndex = 2
                }
              "
            >
              <div class="q-pa-md flex justify-around">
                <q-icon color="white" name="get_app" size="30px" />
                <div class="q-ma-xs text-subtitle2">
                  {{ $t("components.guide_tour.import_XML") }}
                </div>
              </div>
            </q-card>
            <q-card
              class="q-ma-md bg-orange text-white guide-option-card"
              @click="
                () => {
                  this.back = false
                  this.currentIndex = 3
                }
              "
            >
              <div class="q-pa-md flex justify-around">
                <q-icon color="white" name="file_copy" size="30px" />
                <div class="q-ma-xs text-subtitle2">
                  {{ $t("components.guide_tour.start_new") }}
                </div>
              </div>
            </q-card>
          </div>
          <div class="q-mt-md text-caption">
            {{ $t("components.guide_tour.disable_guide_tour_detail") }}
          </div>
        </div>

        <div v-if="currentIndex === 1" key="1">
          <div class="flex flex-center">
            <q-btn
              class="q-ma-lg"
              round
              dense
              icon="arrow_back"
              color="blue-10"
              outline
              @click="prev()"
              style="position: absolute; left: 0;"
            />
            <div class="q-mt-md q-mb-md text-h4 text-blue-10">
              {{ $t("components.guide_tour.to_start") }}
            </div>
            <div></div>
          </div>
          <div class="text-subtitle1">
            {{ $t("components.guide_tour.detail2") }}
          </div>
          <div class="q-pa-xs flex flex-center">
            <q-card
              class="q-ma-md text-blue-10 guide-option-card"
              @click="
                () => {
                  this.back = false
                  this.currentIndex = 2
                }
              "
            >
              <div class="q-pa-md" style="text-align: center;">
                <q-icon color="orange" name="get_app" size="50px" />
                <div class="q-mt-md text-subtitle2">
                  {{ $t("components.guide_tour.import_XML") }}
                </div>
              </div>
            </q-card>
            <q-card
              class="q-ma-md text-blue-10 guide-option-card"
              @click="
                () => {
                  this.back = false
                  this.currentIndex = 3
                }
              "
            >
              <div class="q-pa-md" style="text-align: center;">
                <q-icon color="orange" name="file_copy" size="50px" />
                <div class="q-mt-md text-subtitle2">
                  {{ $t("components.guide_tour.start_new") }}
                </div>
              </div>
            </q-card>
          </div>
        </div>

        <div v-if="currentIndex === 2" key="2">
          <div class="flex flex-center">
            <q-btn
              class="q-ma-lg"
              round
              dense
              icon="arrow_back"
              color="blue-10"
              outline
              @click="
                () => {
                  this.back = false
                  this.currentIndex = 0
                }
              "
              style="position: absolute; left: 0;"
            />
            <!--$t("components.guide_tour.alright")-->
            <div class="q-mt-md q-mb-md text-h4 text-blue-10">
              {{ "Importar XML" }}
            </div>
            <div></div>
          </div>
          <!--$t("components.guide_tour.detail3")-->
          <div class="text-subtitle1">
            {{ "Para importar o XML são necessários apenas 3 passos:" }}
          </div>
          <!--<q-btn class="q-ma-md" color="orange" @click="showUploadXML_Tour">{{
            $t("components.guide_tour.lets_go")
          }}</q-btn>-->
          <div class="q-mt-md q-mb-md flex flex-center">
            <div style="width: 20%">
              <img :src="xmlStep1" style="width:50px; heigth: 50px;" />
              <div class="text-caption">
                {{ "1º Passe sobre o menu lateral esquerdo" }}
              </div>
            </div>

            <div style="width: 20%">
              <img :src="arrow1" style="width:100px; heigth: 50px;" />
            </div>

            <div style="width: 20%">
              <img :src="xmlStep2" style="width:50px; heigth: 50px;" />
              <div class="text-caption">
                {{ "2º Clique na opção de Configurações" }}
              </div>
            </div>

            <div style="width: 20%">
              <img :src="arrow2" style="width:100px; heigth: 50px;" />
            </div>

            <div style="width: 20%">
              <img :src="xmlStep3" style="width:50px; heigth: 50px;" />
              <div class="text-caption">
                {{
                  "3º Acesse a opção Importar XML e faça o upload do arquivo do seu computador"
                }}
              </div>
            </div>
          </div>

          <div class="q-mt-md text-caption">
            {{ $t("components.guide_tour.disable_guide_tour_detail") }}
          </div>
        </div>

        <div v-if="currentIndex === 3" key="3">
          <div class="flex flex-center">
            <q-btn
              class="q-ma-lg"
              round
              dense
              icon="arrow_back"
              color="blue-10"
              outline
              @click="
                () => {
                  this.back = false
                  this.currentIndex = 0
                }
              "
              style="position: absolute; left: 0;"
            />
            <div class="q-mt-md q-mb-md text-h4 text-blue-10">
              {{ "Criar novos registros" }}
            </div>
            <div></div>
          </div>
          <div class="text-subtitle1">
            {{ $t("components.guide_tour.detail4") }}
          </div>
          <!--<q-btn class="q-ma-md" color="orange" @click="showGuideTour_Tour">{{
            $t("components.guide_tour.lets_go")
          }}</q-btn>-->

          <div class="q-mt-md q-mb-md flex flex-center">
            <div style="width: 40%">
              <img :src="index" style="width:50px; heigth: 50px;" />
              <div class="text-caption">
                {{
                  "A tela inicial possui os paineis Anunciantes e Contratos com a opção criar um novo registro"
                }}
              </div>
            </div>

            <div style="width: 20%">
              <img :src="arrow1" style="width:100px; heigth: 50px;" />
            </div>

            <div style="width: 40%">
              <div class="flex flex-center">
                <img
                  :src="personAdd"
                  style="width:50px; heigth: 50px;"
                  class="q-ml-sm q-mr-sm"
                />
                <img
                  :src="contract"
                  style="width:50px; heigth: 50px;"
                  class="q-ml-sm q-mr-sm"
                />
                <img
                  :src="registers"
                  style="width:50px; heigth: 50px;"
                  class="q-ml-sm q-mr-sm"
                />
              </div>
              <div class="text-caption">
                {{
                  "No menu lateral além de permitir criar novos Anunciantes e Contratos, na opção Cadastros permite criar os registros de Programas, Categorias entre outros"
                }}
              </div>
            </div>
          </div>
          <div class="q-mt-md text-caption">
            {{ $t("components.guide_tour.disable_guide_tour_detail") }}
          </div>
        </div>
      </transition-group>
    </q-card-section>

    <q-separator />

    <q-card-actions class="flex justify-between">
      <q-checkbox
        v-model="disableGuideTour"
        color="primary"
        :label="$t('components.guide_tour.disable_guide_tour')"
      />
      <q-btn
        class="q-mr-md"
        outline
        color="grey-8"
        no-caps
        @click="close_modal"
        >{{ $t("components.skip") }}</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { Cookies } from "quasar"
import xmlStep1 from "src/assets/xml-step-1.png"
import xmlStep2 from "src/assets/settings.png"
import xmlStep3 from "src/assets/xml-step-3.png"
import arrow1 from "src/assets/curly-arrow-1.png"
import arrow2 from "src/assets/curly-arrow-2.png"
import index from "src/assets/index.png"
import personAdd from "src/assets/person_add.png"
import contract from "src/assets/contract.png"
import registers from "src/assets/registers.png"

export default {
  name: "GuideTour",
  data() {
    return {
      disableGuideTour: false,
      back: false,
      currentIndex: 0,
      xmlStep1,
      xmlStep2,
      xmlStep3,
      arrow1,
      arrow2,
      index,
      personAdd,
      contract,
      registers
    }
  },
  computed: {
    ...mapGetters({
      disableTour: "disableTour"
    })
  },
  methods: {
    ...mapActions({
      set_tour_disable: "setTourDisable"
    }),
    close_modal() {
      this.$root.$emit("closeGuideTour")
    },
    next() {
      this.back = false
      this.currentIndex++
    },
    prev() {
      this.back = true
      this.currentIndex--
    },
    showUploadXML_Tour() {
      this.close_modal()
      // this.$tours["tourImportXML"].start()
    },
    showGuideTour_Tour() {
      this.close_modal()
      // this.$tours["myTour"].start()
    }
  },
  created() {
    // let guidetour = sessionStorage.getItem('guidetour') === 'false' ? false : true
    // this.disableGuideTour = guidetour

    if (Cookies.has("commercial_guidetour")) {
      let _cookie = Cookies.get("commercial_guidetour")
      this.disableGuideTour = _cookie
    } else {
      this.disableGuideTour = false
    }
  },
  watch: {
    disableGuideTour() {
      // console.log(this.disableGuideTour)
      // this.set_tour_disable(this.disableGuideTour).then(() => { }).catch(err => console.log(err))
      // sessionStorage.setItem('guidetour', this.disableGuideTour)
      Cookies.set("commercial_guidetour", this.disableGuideTour)
    }
  }
}
</script>

<style>
.guide-option-card {
  cursor: pointer;
  width: 160px;
  height: 60px;
}
.option-card:hover > div > i {
  color: #9e9e9e !important;
}
.option-card:hover > div > .text-subtitle2 {
  color: #9e9e9e !important;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slideback-leave-active,
.slideback-enter-active {
  transition: 0.3s;
}
.slideback-enter {
  transform: translate(-100%, 0);
}
.slideback-leave-to {
  transform: translate(100%, 0);
}

.div-slider {
  overflow: hidden;
  position: relative;
  height: 100px;
  width: 90%;
}

.div-slider .card {
  position: absolute;
  height: 100px;
  width: 90%;
  background-color: #60adff;
}
</style>
