<template>
  <q-card class="col">
    <q-card-section class="">
      <q-item>
      <q-item-section avatar>
        <q-avatar size="70px">
          <img src="http://playlist.ddns.com.br/files/App/aracaju/promo01.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ 'Nome da Emissora' }}</q-item-label>
        <q-item-label caption>
          {{ 'Sua Radio Sempre no AR' }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn label="Alterar Configurações" size="sm" class="bg-primary text-capitalize text-white"></q-btn>
      </q-item-section>
    </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardCafe"
}
</script>

<style scoped>

</style>
