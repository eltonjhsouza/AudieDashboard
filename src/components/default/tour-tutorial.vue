<template>
  <div>
    <v-tour name="myTour" :steps="steps" :options="myOptions">
      <template slot-scope="tour">
        <transition-group name="fade">
          <div v-for="(step, index) of tour.steps" :key="step.target">
            <v-step
              :class="{
                ajustAdd: tour.currentStep === 1,
                ajustProgramming: tour.currentStep === 2
              }"
              v-if="tour.currentStep === index"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
            >
              <template>
                <div slot="actions" class="flex justify-between">
                  <q-btn
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.skip"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.skip_tour") }}</q-btn
                  >
                  <q-btn
                    v-if="!tour.isFirst"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.previousStep"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.prev") }}</q-btn
                  >
                  <q-btn
                    v-if="!tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.nextStep"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.next") }}</q-btn
                  >
                  <q-btn
                    v-if="tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.stop"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.finish") }}</q-btn
                  >
                </div>
              </template>
            </v-step>
          </div>
        </transition-group>
      </template>
    </v-tour>

    <v-tour name="tourImportXML" :steps="stepsImportXML" :options="myOptions">
      <template slot-scope="tour">
        <transition-group name="fade">
          <div v-for="(step, index) of tour.steps" :key="step.target">
            <v-step
              :class="{ ajustleft: tour.currentStep === 0 }"
              v-if="tour.currentStep === index"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
            >
              <template>
                <div slot="actions" class="flex justify-between">
                  <q-btn
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.skip"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.skip_tour") }}</q-btn
                  >
                  <!--q-btn v-if="!tour.isFirst" dense outline color="white" no-caps size="md" @click="tour.previousStep" class="q-pl-sm q-pr-sm">Voltar</q-btn>
                  <q-btn v-if="!tour.isLast" dense outline color="white" no-caps size="md" @click="tour.nextStep" class="q-pl-sm q-pr-sm">Próximo</q-btn-->
                  <q-btn
                    v-if="tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.stop"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.finish") }}</q-btn
                  >
                </div>
              </template>
            </v-step>
          </div>
        </transition-group>
      </template>
    </v-tour>

    <v-tour name="listTemplate" :steps="stepsTemplate" :options="myOptions">
      <template slot-scope="tour">
        <transition-group name="fade">
          <div v-for="(step, index) of tour.steps" :key="step.target">
            <v-step
              v-if="tour.currentStep === index"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
            >
              <template>
                <div slot="actions" class="flex justify-between">
                  <q-btn
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.skip"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.skip_tour") }}</q-btn
                  >
                  <q-btn
                    v-if="!tour.isFirst"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.previousStep"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.prev") }}</q-btn
                  >
                  <q-btn
                    v-if="!tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.nextStep"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.next") }}</q-btn
                  >
                  <q-btn
                    v-if="tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.stop"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.finish") }}</q-btn
                  >
                </div>
              </template>
            </v-step>
          </div>
        </transition-group>
      </template>
    </v-tour>

    <v-tour name="tourBreaks" :steps="stepsBreaks" :options="myOptions">
      <template slot-scope="tour">
        <transition-group name="fade">
          <div v-for="(step, index) of tour.steps" :key="step.target">
            <v-step
              v-if="tour.currentStep === index"
              :step="step"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
            >
              <template>
                <div slot="actions" class="flex justify-between">
                  <q-btn
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.skip"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.skip_tour") }}</q-btn
                  >
                  <q-btn
                    v-if="!tour.isFirst"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.previousStep"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.prev") }}</q-btn
                  >
                  <q-btn
                    v-if="!tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.nextStep"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.next") }}</q-btn
                  >
                  <q-btn
                    v-if="tour.isLast"
                    dense
                    outline
                    color="white"
                    no-caps
                    size="md"
                    @click="tour.stop"
                    class="q-pl-sm q-pr-sm"
                    >{{ $t("components.finish") }}</q-btn
                  >
                </div>
              </template>
            </v-step>
          </div>
        </transition-group>
      </template>
    </v-tour>
  </div>
</template>

<script>
import Vue from "vue"
import VueTour from "vue-tour"

require("vue-tour/dist/vue-tour.css")
Vue.use(VueTour)
export default {
  name: "TourTutorial",
  data() {
    return {
      myOptions: {
        useKeyboardNavigation: false
      },
      steps: [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: this.$t("components.new_steps.menu")
          },
          content: this.$t("components.new_steps.menu_detail"),
          before: (type) =>
            new Promise((resolve, reject) => {
              // Time-consuming UI/async operation here
              resolve("foo")

              // console.log(this.$route.name)
              if (this.$route.name !== "new") {
                this.$router.push({ name: "new" })
              }
            })
        },
        {
          target: "#v-step-1",
          header: {
            title: this.$t("components.new_steps.registrations")
          },
          content: this.$t("components.new_steps.registrations_detail"),
          params: {
            placement: "left-top"
          }
        },
        {
          target: "#v-step-2",
          header: {
            title: this.$t("components.new_steps.programming")
          },
          content: this.$t("components.new_steps.programming_detail"),
          params: {
            placement: "left-top"
          }
        },
        {
          target: ".v-step-3",
          header: {
            title: this.$t("components.new_steps.advertisers")
          },
          content: this.$t("components.new_steps.advertisers_detail")
        },
        {
          target: ".v-step-4",
          header: {
            title: this.$t("components.new_steps.contracts")
          },
          content: this.$t("components.new_steps.contracts_detail")
        },
        {
          target: ".v-step-5",
          header: {
            title: this.$t("components.new_steps.properties")
          },
          content: this.$t("components.new_steps.properties_detail")
        },
        {
          target: ".v-step-6",
          header: {
            title: this.$t("components.new_steps.new_advertiser")
          },
          content: this.$t("components.new_steps.new_advertiser_detail")
        }
      ],
      stepsImportXML: [
        {
          target: "#v-step-xml-0",
          header: {
            title: this.$t("components.xml_steps.import_xml")
          },
          content: this.$t("components.xml_steps.import_xml_detail1"),
          params: {
            placement: "left-top"
          },
          before: (type) =>
            new Promise((resolve, reject) => {
              // Time-consuming UI/async operation here
              resolve("foo")

              // console.log(this.$route.name)
              if (this.$route.name !== "new") {
                this.$router.push({ name: "new" })
              }
            })
        },
        {
          target: ".v-step-xml-1",
          header: {
            title: this.$t("components.xml_steps.import_xml")
          },
          content: this.$t("components.xml_steps.import_xml_detail2")
        },
        {
          target: ".v-step-xml-2",
          header: {
            title: this.$t("components.xml_steps.import_xml")
          },
          content: this.$t("components.xml_steps.import_xml_detail3")
        }
      ],
      stepsTemplate: [
        {
          target: "#v-template-step-0", // We're using document.querySelector() under the hood
          header: {
            title: "Modelos de Programação"
          },
          content:
            "Aqui é listado todos os Modelos de Programação cadastros, mostrando os dias da semana que ele é usado ou as datas específicas."
        },
        {
          target: "#v-template-step-1",
          header: {
            title: "Criar Modelo"
          },
          content:
            "Esse botão permite cadastrar um novo Modelo, que depois precisa ser configurado.",
          params: {
            placement: "left-top"
          }
        },
        {
          target: "#v-template-step-2",
          header: {
            title: "Configurar Modelo"
          },
          content:
            "Aqui você poderá configurar o seu modelo definindo os dias da semana que ele irá ser usado ou definir o modelo para uma ou mais datas específicas.",
          params: {
            placement: "left-top"
          }
        },
        {
          target: "#v-template-step-3",
          header: {
            title: "Editar Modelo"
          },
          content:
            "Após configurar um Modelo. Selecione na lista e clique neste botão para configurar cada bloco do seu Modelo de Programação."
        }
      ],
      stepsBreaks: [
        {
          target: "#v-breaks-step-0",
          header: {
            title: "Editar Blocos"
          },
          content:
            "Selecione este botão para permitir editar e adicionar inserções aos blocos."
        },
        {
          target: "#v-breaks-step-1", // We're using document.querySelector() under the hood
          header: {
            title: "Adicionar Intervalo Comercial"
          },
          content:
            "Este botão permite adicionar um novo bloco comercial no Modelo de Programação."
        },
        {
          target: "#v-breaks-step-2",
          header: {
            title: "Definir Programas"
          },
          content:
            "Por padrão os blocos que não são comerciais vem indefinidos. É possível associar esses blocos a um Programa definindo aqui as informações do Programa.",
          params: {
            placement: "left-top"
          }
        },
        {
          target: "#v-breaks-step-3",
          header: {
            title: "Bloco"
          },
          content:
            "Este é um bloco da sua Programação. No cabeçalho é mostrado algumas informações. Passe o mouse sobre o item para saber do que se trata cada informação.",
          params: {
            placement: "left-top"
          }
        },
        {
          target: "#v-breaks-step-4",
          header: {
            title: "Editar Intervalo Comercial"
          },
          content:
            "Aqui é possível Editar o intervalo comercial, como horário, duração ou excluir o bloco."
        },
        {
          target: "#v-breaks-step-5",
          header: {
            title: "Adicionar Inserções"
          },
          content:
            "Aqui é possível adicionar o tipo das inserções que serão programadas no bloco."
        }
      ]
    }
  },
  methods: {
    loadComponent() {
      this.steps = [
        {
          target: "#v-step-0", // We're using document.querySelector() under the hood
          header: {
            title: this.$t("components.new_steps.menu")
          },
          content: this.$t("components.new_steps.menu_detail"),
          before: (type) =>
            new Promise((resolve, reject) => {
              // Time-consuming UI/async operation here
              resolve("foo")

              // console.log(this.$route.name)
              if (this.$route.name !== "new") {
                this.$router.push({ name: "new" })
              }
            })
        },
        {
          target: "#v-step-1",
          header: {
            title: this.$t("components.new_steps.registrations")
          },
          content: this.$t("components.new_steps.registrations_detail"),
          params: {
            placement: "left-top"
          }
        },
        {
          target: "#v-step-2",
          header: {
            title: this.$t("components.new_steps.programming")
          },
          content: this.$t("components.new_steps.programming_detail"),
          params: {
            placement: "left-top"
          }
        },
        {
          target: ".v-step-3",
          header: {
            title: this.$t("components.new_steps.advertisers")
          },
          content: this.$t("components.new_steps.advertisers_detail")
        },
        {
          target: ".v-step-4",
          header: {
            title: this.$t("components.new_steps.contracts")
          },
          content: this.$t("components.new_steps.contracts_detail")
        },
        {
          target: ".v-step-5",
          header: {
            title: this.$t("components.new_steps.properties")
          },
          content: this.$t("components.new_steps.properties_detail")
        },
        {
          target: ".v-step-6",
          header: {
            title: this.$t("components.new_steps.new_advertiser")
          },
          content: this.$t("components.new_steps.new_advertiser_detail")
        }
      ]

      this.stepsImportXML = [
        {
          target: "#v-step-xml-0",
          header: {
            title: this.$t("components.xml_steps.import_xml")
          },
          content: this.$t("components.xml_steps.import_xml_detail1"),
          params: {
            placement: "left-top"
          },
          before: (type) =>
            new Promise((resolve, reject) => {
              // Time-consuming UI/async operation here
              resolve("foo")

              // console.log(this.$route.name)
              if (this.$route.name !== "new") {
                this.$router.push({ name: "new" })
              }
            })
        },
        {
          target: ".v-step-xml-1",
          header: {
            title: this.$t("components.xml_steps.import_xml")
          },
          content: this.$t("components.xml_steps.import_xml_detail2")
        },
        {
          target: ".v-step-xml-2",
          header: {
            title: this.$t("components.xml_steps.import_xml")
          },
          content: this.$t("components.xml_steps.import_xml_detail3")
        }
      ]
    }
  },
  created() {
    this.loadComponent()
  }
}
</script>
