<template>
  <q-carousel
    v-model="slide"
    swipeable
    animated
    infinite
    navigation
    control-color="teal-10"
    padding
    arrows
    height="300px"
    class="text-black rounded-borders"
  >
    <q-carousel-slide
      v-for="(item, index) in slider"
      :key="`anim-${index}`"
      :name="index"
    >
      <div class="text-center">
        <img class="q-mb-lg" :src="item.icon" width="300px" />
        <div class="q-subheading">
          {{ item.label1 }}
        </div>
        <div class="q-subheading">
          {{ item.label2 }}
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import operators from "src/assets/operators/operators.png"
import profiles from "src/assets/operators/profiles.png"
import users from "src/assets/operators/users.png"
import createOperator from "src/assets/operators/create-operator.png"
import { mapGetters } from "vuex"

export default {
  name: "HelpOperators",
  props: ["language"],
  data() {
    return {
      slide: 0,
      slider: [],
      lorem: ""
    }
  },
  computed: {
    ...mapGetters({
      currentLanguage: "currentLanguage"
    })
  },
  methods: {
    loadComponent() {
      this.slider = [
        {
          icon: operators,
          label1: this.$t("myaccount.user_operators.slide.operators1"),
          label2: this.$t("myaccount.user_operators.slide.operators2")
        },
        {
          icon: profiles,
          label1: this.$t("myaccount.user_operators.slide.profiles1"),
          label2: this.$t("myaccount.user_operators.slide.profiles2")
        },
        {
          icon: createOperator,
          label1: this.$t("myaccount.user_operators.slide.createOperator1"),
          label2: this.$t("myaccount.user_operators.slide.createOperator2")
        },
        {
          icon: users,
          label1: this.$t("myaccount.user_operators.slide.users1"),
          label2: ""
        }
      ]
    }
  },
  created() {
    this.loadComponent()
  },
  mounted() {
    this.loadComponent()
  },
  watch: {
    language() {
      this.loadComponent()
    }
  }
}
</script>
