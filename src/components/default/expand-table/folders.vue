<template>
  <div>
    <q-table
      v-if="folder.childrens.length > 0"
      square
      dense
      flat
      hide-header
      hide-bottom
      :data="folder.childrens"
      :columns="columns"
      :pagination="pagination"
      selection="single"
      :selected.sync="selected"
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
              v-if="props.row.childrens.length > 0"
              size="sm"
              color="blue-grey-10"
              flat
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'expand_more'"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            @click="selectItem(props.row)"
            class="w-150"
            :class="{ 'pad-left': col.name === 'description' }"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr
          v-if="props.row.childrens.length > 0"
          v-show="props.expand"
          :props="props"
        >
          <q-td
            colspan="100%"
            style="padding:unset; padding-left:20px;"
            :props="props"
          >
            <div class="text-left" style="border-left: 1px solid #e0e0e0;">
              <folder
                v-for="child in props.row.childrens"
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
export default {
  name: "folder",
  props: ["folder", "columns"],
  data() {
    return {
      selected: [],
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0
      }
    }
  },
  methods: {
    expand() {
      this.folder.expanded = !this.folder.expanded
    },
    selectItem(row) {
      this.selected = []
      this.selected.push(row)
    }
  }
}
</script>

<style>
.w-150 {
  width: 150px;
}
.pad-left {
  /* padding-left: 50px; */
  width: 120px !important;
}
</style>
