<template>
  <div class="flex">
    <q-btn-dropdown
      flat
      no-caps
      color="white"
      icon="apps"
      class="apps-dropdown responsive-menu"
    >
      <q-card>
        <q-card-section style="padding:2px;">
          <div class="flex">
            <q-btn
              flat
              dense
              no-caps
              class="q-ma-md text-center"
              v-close-popup
              @click="gotoAires()"
            >
              <div>
                <q-img :src="aireslogo" width="30px" />
                <div class="text-caption">Aires Cloud</div>
              </div>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-btn-dropdown>
    <q-tooltip :delay="500" content-style="font-size: 12px">
      <div>{{ "Apps" }}</div>
    </q-tooltip>
  </div>
</template>

<script>
import aireslogo from "src/assets/aires-cloud-logo.png"
import { airesFrontUrl } from "src/config"
import { mapGetters } from "vuex"

export default {
  name: "ShowApps",
  data() {
    return {
      aireslogo
    }
  },
  computed: {
    ...mapGetters({
      currentStation: "selectedStation"
    })
  },
  methods: {
    gotoAires() {
      window.open(
        airesFrontUrl + "/account/stations/" + this.currentStation.stationId,
        "_label"
      )
    }
  }
}
</script>
