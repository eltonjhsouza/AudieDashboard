<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="text-primary">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section>
            <div class="text-h6 text-grey-8">Tutoriais, dicas e conteúdo para sua rádio</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="">
        <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" :ratio="16/9"/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ToDoList',
  components: {
    Todo: () =>  import('components/Todo'),
  },
  data () {
    return {
      layout: 'dense',
      side: 'right'
    }
  }
}
</script>