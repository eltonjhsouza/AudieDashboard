<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" />
    <div class="q-my-md flex justify-between  ">
      <card-charts :data="live" style="min-width: 500px;"/>
      <card-cafe style="max-width: 550px; max-height: 150px" class="q-my-sm"/>
    </div>

    <div class="q-my-md flex justify-between  ">
      <todo-list />
      <card-help />
    </div>

    <div class="row q-col-gutter-sm  q-pb-sm">

      <!-- <card-time-line /> -->
    </div>

    <!-- <table-visits /> -->
  </q-page>
</template>

<script>
import { getActiveListeners, updateListenerStatus } from './service.js'
  export default {
    name: 'PageIndex',
    components: {
        CardHelp: () =>  import('components/cards/CardHelp'),
        CardCafe: () =>  import('components/cards/CardCafe'),
        CardSocial: () =>  import('components/cards/CardSocial'),
        CardCharts: () =>  import('components/cards/CardCharts'),
        TabSocial: () =>  import('components/tabs/TabSocial'),
        CardWithImage: () =>  import('components/cards/CardWithImage'),
        CardTimeLine: () =>  import('components/cards/CardTimeLine'),
        TodoList: () =>  import('components/list/TodoList'),
        TableVisits: () =>  import('components/tables/TableVisits'),
    },
    data() {
      return {
      live: 0,
      mode: 'list',
      messages: [
        {
            id: 5,
            name: 'Pratik Patel',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
            time: '10:42 PM'
        }, {
            id: 6,
            name: 'Winfield Stapforth',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
            time: '11:17 AM'
        }, {
            id: 1,
            name: 'Boy',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            time: '5:17 AM'
        }, {
            id: 2,
            name: 'Jeff Galbraith',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
            time: '5:17 AM'
        }, {
            id: 3,
            name: 'Razvan Stoenescu',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
            time: '5:17 AM'
        }
      ],
    }
  },
  methods: {
    updateListener () {
      getActiveListeners()
        .then(response => {
          // console.log(response.length)
          self.live = response.length
          this.$root.$emit('update_live', (self.live))   

        })
    }   
  },
  mounted () {
    let self = this
     this.$root.$on('update_listener', ()=> {
       this.updateListener()
     }) 
    // setInterval(() => {
        getActiveListeners()
          .then(response => {
            // console.log(response.length)
            self.live = response.length
            this.$root.$emit('update_live', (self.live))   
          })
      // }, 3000)
  }
}
</script>
