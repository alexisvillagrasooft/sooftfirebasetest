<template>
  <v-data-table
    item-key="id"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    :loading="this.loadingCars"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :single-select="singleSelect"
    v-model="selected"
    show-select
    loading-text="Cargando Autos"
    class="elevation-1"
  >
    <template v-slot:[`item.created`]="{ item }">
      <span>{{ new Date(item.created).toLocaleString() }}</span>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        :loading="loadingDelete"
        :disabled="loadingDelete"
        color="error"
        icon
        small
        outlined
        @click="deleteDoc(item.ref)"
      >
        <v-icon dark small> mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:footer>
      <v-btn
        :loading="loadingDelete"
        :disabled="loadingDelete"
        v-if="selected.length"
        color="error"
        outlined
        rounded
        small
        style="position: absolute; bottom: 2rem; left: 2rem"
        @click="deleteMultipleDocs(selected)"
      >
        <v-icon left dark small> mdi-delete</v-icon>Seleccionados ({{
          selected.length
        }})</v-btn
      >
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "FirebaseTable",
  props: {
    cars: [],
    loading: { type: Boolean },
    loadingDel: { type: Boolean },
    deleteCar: { type: Function },
    deleteMultipleCars: { type: Function },
  },
  data() {
    return {
      singleSelect: false,
      selected: [],
      sortBy: "created",
      sortDesc: true,
      headers: [
        { text: "Id", value: "id", align: " d-none" },
        {
          text: "Marca",
          align: "start",
          sortable: false,
          value: "marca",
        },
        { text: "Modelo", value: "modelo" },
        { text: "Tipo", value: "tipo" },
        { text: "Motor", value: "motor" },
        { text: "Año", value: "anio" },
        { text: "Color", value: "color" },
        { text: "Puertas", value: "puertas" },
        { text: "Combustible", value: "combustible" },
        { text: "Kilometros", value: "kilometros" },
        { text: "Transmision", value: "transmision" },
        { text: "Alta", value: "created" },
        { text: "Acciones", value: "actions" },
      ],
      desserts: [],
      loadingCars: false,
      loadingDelete: false,
    };
  },
  methods: {
    deleteDoc(doc) {
      this.deleteCar(doc);
    },
    async deleteMultipleDocs(docs) {
      // console.log(docs);
      await this.deleteMultipleCars(docs);
      this.selected = [];
    },
  },
  watch: {
    cars: {
      immediate: true,
      handler(val) {
        this.desserts = val.map((doc) => {
          return {
            ...doc.data(),
            created: doc.data().created.toDate(),
            ref: doc.ref,
            id: doc.ref.id,
          };
        });
      },
    },
    loading: {
      immediate: true,
      handler(val) {
        this.loadingCars = val;
      },
    },
    loadingDel: {
      immediate: true,
      handler(val) {
        this.loadingDelete = val;
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
