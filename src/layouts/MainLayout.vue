<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Audie Dashboard
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
      :width="250"
    >
      <q-list bordered >
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section >
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Configurações do APP -->
          <q-expansion-item
            :header-inset-level="0"
            expand-separator
            icon="fas fa-mobile-alt"
            label="Aplicativo"
          >
          <q-list >
            <q-item clickable @click="goTo('News')" :inset-level="0.6" >
              <q-item-section thumbnail class="text-white">
                <q-icon name="far fa-newspaper"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>Posts</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="goTo('Category')" :inset-level="0.6"  >
              <q-item-section thumbnail class="text-white">
                <q-icon name="fas fa-layer-group"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>Categorias</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="goTo('Personalize')" :inset-level="0.6"  >
              <q-item-section thumbnail class="text-white">
                <q-icon name="palette"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>Personalizar</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="goTo('Settings')" :inset-level="0.6"  >
              <q-item-section thumbnail class="text-white">
                <q-icon name="settings"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>Settings</q-item-label>
              </q-item-section>
            </q-item>
          </q-list> 
          </q-expansion-item>

        <!-- Configurações Gerais -->
          <q-expansion-item
            :header-inset-level="0"
            expand-separator
            icon="settings"
            label="Configurações"
          >
          <q-list >
            <q-item clickable :inset-level="0.6" >
              <q-item-section thumbnail class="text-white">
                <q-icon name="far fa-newspaper"/>
              </q-item-section>
              <q-item-section>
                <q-item-label  @click="goTo()" >Noticias</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable :inset-level="0.6" >
              <q-item-section thumbnail class="text-white">
                <q-icon name="manage_accounts"/>
              </q-item-section>
              <q-item-section>
                <q-item-label  @click="goTo()" >Usuários e Permissões</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable :inset-level="0.6"  >
              <q-item-section thumbnail class="text-white">
                <q-icon name="radio"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>Emissora</q-item-label>
              </q-item-section>
            </q-item>
          </q-list> 
          </q-expansion-item> 
        <!-- </q-item> -->

        <!-- <q-expansion-item
          icon="map"
          label="Maps"
        >
          <q-list class="q-pl-sm">
            <q-item to="/Map" active-class="q-item-no-link-highlighting">
              <q-item-section thumbnail>
                <q-icon name="map"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Map</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/MapMarker" active-class="q-item-no-link-highlighting">
              <q-item-section thumbnail>
                <q-icon name="location_on"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Map Marker</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/StreetView" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="streetview"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Street View</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item> -->

        <!-- <q-item to="/Mail" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="email"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Mail</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>TreeTable</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Charts" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Charts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Cards" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Cards</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Tables" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Tables</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Contact" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Contact</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Checkout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="check_circle_outline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Checkout</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Calendar" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Calendar</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Taskboard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="done"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Taskboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Pagination" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Pagination</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Ecommerce" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="shopping_cart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Product Catalogues</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="menu_open"
          label="Menu Levels"
        >
          <q-item class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Level 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            :header-inset-level="0.85"
            label="Level 2"
          >
            <q-item class="q-ml-xl" style="margin-left: 55px  !important;" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Level 2.1</q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item
              :header-inset-level="1"
              label="Level 2.2"
            >
              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
                <q-item-section>
                  <q-item-label>Level 2.2.1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
                <q-item-section>
                  <q-item-label>Level 2.2.2</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item> -->
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import Messages from "./Messages";

    export default {
        name: 'MainLayout',

        components: {
            Messages,
            EssentialLink
        },
        methods: {
          goTo (path) {
                this.$router.push({ path: '/' + path })
          }
        },

        data() {
            return {
                leftDrawerOpen: false,
            }
        }
    }
</script>
