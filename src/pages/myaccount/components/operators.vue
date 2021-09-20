<template>
  <q-page class="flex flex-center">
    <div style="padding: 50px;">
      <div class="q-mb-md text-h5 text-center">
        {{ "Selecione o Operador" }}
      </div>
      <div
        class="q-mb-md text-body1 text-grey-6"
        style="width: 60vw; text-align:center;"
      >
        {{
          'Para acessar a aplicação use os operadores, cada operador pode ter permissões de acesso diferentes. Para mais operadores acesse o menu "Usuários e Operadores" dentro da aplicação'
        }}
      </div>
      <div class="flex flex-center">
        <div>
          <div
            id="style-station"
            class="scroll-list-stations"
            style="height:50vh; width:300px;"
          >
            <q-list link style="padding:0px;">
              <q-item
                v-for="(item, index) in listOperators"
                @click.native="openOperator(item)"
                :key="index"
                clickable
              >
                <q-item-section side>
                  <div
                    class="avatar"
                    :class="getProfileBg(item.profileName)"
                    style="border-radius: 3px;"
                  >
                    <q-icon name="person" size="50px" color="white" />
                  </div>
                </q-item-section>
                <q-item-section class="text-center" style="font-size:14px;">
                  <q-item-label label>
                    <b class="q-ml-sm q-mr-sm q-title">{{ item.name }}</b>
                    {{ "(" + item.profileName + ")" }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="q-ma-lg flex justify-between">
        <q-btn
          class="q-mt-md"
          no-caps
          color="orange-8"
          icon="arrow_back"
          :label="'Voltar para Emissoras'"
          @click="gotoStations()"
        />
        <q-btn
          class="q-mt-md"
          no-caps
          color="orange-8"
          :label="'O que são Operadores?'"
          @click="showModal()"
        />
      </div>
    </div>

    <q-dialog v-model="passwordModal">
      <q-card>
        <q-card-section>
          <div class="flex justify-between">
            <div class="q-ma-sm text-h6">
              {{ "Informe a chave de acesso do operador" }}
            </div>
            <div class="q-ma-sm">
              <q-btn
                flat
                round
                dense
                color="black"
                icon="close"
                @click="passwordModal = false"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="flex" style="font-size:1rem;">
            <q-icon class="text-grey-8 q-mr-sm" name="person" size="20px" />
            <b>{{
              selectedOperator.name + " (" + selectedOperator.profileName + ")"
            }}</b>
          </div>
          <q-input
            class="q-ma-sm"
            outlined
            dense
            v-model="password"
            label="PIN"
            type="password"
            autofocus
            @keyup.enter="checkPin()"
          />
          <div
            v-if="error.status"
            class="q-ml-md text-red text-caption"
            style="max-width: 250px;"
          >
            {{ error.errorMessage }}
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg flex justify-between">
            <q-btn
              no-caps
              outline
              color="black"
              :label="'Cancelar'"
              @click="passwordModal = false"
            />
            <q-btn
              no-caps
              color="orange-8"
              label="Entrar"
              @click="checkPin()"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="operatorsModal">
      <q-card style="width:60vw;">
        <q-card-section>
          <div class="flex justify-between">
            <div class="text-h5">
              {{ $t("myaccount.user_operators.what_are_operators") }}
            </div>
            <q-btn
              dense
              round
              flat
              color="black"
              icon="close"
              @click="operatorsModal = false"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <help-operators :language="currentLanguage" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Loading } from "quasar"
import { getOperatorsBySoftware, getCustomerProfile } from "../service.js"
import { pallete } from "src/assets/pallete.js"
import { mapGetters, mapActions } from "vuex"
import helpOperators from "./help-operators.vue"

let profiles = []

export default {
  name: "PageOperators",
  data() {
    return {
      listOperators: [],
      listProfiles: [],
      selectedOperator: {
        name: "",
        profileName: ""
      },
      password: "",
      error: {
        errorMessage: "",
        status: false
      },
      passwordModal: false,
      operatorsModal: false
    }
  },
  computed: {
    ...mapGetters({
      currentLanguage: "currentLanguage"
    })
  },
  methods: {
    ...mapActions({
      set_operator: "setOperator"
    }),
    showModal() {
      this.operatorsModal = true
    },
    gotoStations() {
      this.$router.push({ name: "stations" })
    },
    openOperator(item) {
      if (item.pin.length > 0) {
        this.error = {
          status: false,
          errorMessage: ""
        }
        this.passwordModal = true
        this.selectedOperator = item
      } else {
        this.passwordModal = false
        Loading.show()
        this.savePermissions(item)
      }
    },
    checkPin() {
      if (this.password === this.selectedOperator.pin) {
        this.passwordModal = false
        Loading.show()
        this.savePermissions(this.selectedOperator)
      } else {
        this.error.status = true
        this.error.errorMessage =
          "Pin inválido. Tente novamente ou entre em contato com o administrador da emissora."
      }
    },
    savePermissions(item) {
      sessionStorage.setItem("operatorName", item.name)
      this.set_operator(item)
        .then(() => {
          this.$router.push({ path: "/Home" })
          Loading.hide()

        })
        .catch((err) => console.log(err))
    },
    getOperators() {
      Loading.show()
      getOperatorsBySoftware(15)
        .then((response) => {
          this.listOperators = response
          Loading.hide()
        })
        .catch((error) => {
          console.log(error)
          Loading.hide()
        })
    },
    getCustomerProfile() {
      Loading.show()
      getCustomerProfile()
        .then((response) => {
          Loading.hide()
          profiles = response
          this.filterProfileBySoftware(15)
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
        })
    },
    filterProfileBySoftware(id) {
      this.listProfiles = []
      this.listProfiles = profiles.filter((v) => v.software.softwareId === id)
    },
    selectColorByProfileName(name) {
      let item = this.listProfiles.filter((v) => v.name === name)
      let id = 0

      if (item.length > 0) {
        id = item.length
        while (id > pallete.lenth) {
          id = item.length - pallete.lenth
        }
      }

      return id
    },
    getProfileBg(profile) {
      let colorId = this.selectColorByProfileName(profile)
      return "bg-" + pallete[colorId]
    }
  },
  created() {
    this.getOperators()
    this.getCustomerProfile()
  },
  components: {
    // helpOperators
  }
}
</script>

<style>
.operators-card {
  color: #424242;
  width: 80px;
  height: 80px;
  cursor: pointer;
  text-align: center;
  margin: 20px;
}
.operators-card .avatar {
  border-radius: 3px;
  width: 60px;
  height: 60px;
}
.scroll-list-stations {
  border: 1px solid #999;
  color: #424242;
  border-radius: 5px;
  height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: block;
  position: relative;
}
.q-list {
  border: none;
}

.scroll-list-stations > .q-list > .q-item {
  border-bottom: 1px dashed #999;
  padding-top: 15px;
  padding-bottom: 15px;
}

.scroll-list-stations > .q-list > .q-item:hover {
  background-color: #dfdfdf;
}

#style-station::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

#style-station::-webkit-scrollbar {
  width: 8px;
  padding-right: 5px;
}

#style-station::-webkit-scrollbar-thumb {
  background-color: #419bbf;
  border: 2px solid #419bbf;
  border-radius: 5px;
}
</style>
