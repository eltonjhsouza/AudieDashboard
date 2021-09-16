<template>
    <div class="postsday wrapper center">
      <q-card class="card-day q-mr-sm" clickable flat bordered @click="gotoPage(item)" v-for="item in banner" :key="item.id">
          <q-img
              class="rounded-borders imgDay"  
              :src="item.imageUrl"
              style=""
          />
      </q-card>
    </div>
</template>
<script>
import banners1 from './promo01.png'
import banners2 from './promo02.png'
import banners3 from './promo03.png'

export default {
  name: 'DatePosts',
  components: { },
  data () {
    return {
      banner: [
        { id: 1, imageUrl: banners1 },
        { id: 2, imageUrl: banners2 },
        { id: 3, imageUrl: banners3 }
      ]
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
.card-day {
    width: 16vw;

}
.imgDay {
    width: 16vw;
}
.wrapper {
    overflow-x: auto;
    display: flex;
}
.wrapper::-webkit-scrollbar {
    widows: 0;
}
.wrapper .item {
    /* min-width: 110px; */
    /* line-height: 110px; */
    margin-right: 10px;
}
</style>
