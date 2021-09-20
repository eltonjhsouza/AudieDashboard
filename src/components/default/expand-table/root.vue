<template>
  <div>
    <q-table
      class="my-style-header"
      dense
      flat
      bordered
      hide-bottom
      :data="folder.childrens"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="blue-grey-10"
              flat
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'expand_more'"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="w-150"
            :class="{ 'pad-left': col.name === 'description' }"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="!props.expand" :props="props">
          <q-td colspan="100%" style="padding:unset; padding-left:30px;">
            <div class="text-left" style="border-left: 1px solid #e0e0e0;">
              <folder
                v-for="child in [{ childrens: props.row.childrens }]"
                :key="child.id"
                v-bind:folder="child"
                v-bind:columns="columns"
              ></folder>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import Folder from "./folders.vue"

export default {
  name: "root",
  props: ["folder", "columns"],
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0
      }
    }
  },
  components: {
    Folder
  }
}
</script>

<style lang="sass">
.my-style-header
  .q-table__top,
  thead tr:first-child th
    background-color: #dce2e4

  .q-table--bordered
    border: 1px solid rgba(0,0,0,0.15)
</style>
