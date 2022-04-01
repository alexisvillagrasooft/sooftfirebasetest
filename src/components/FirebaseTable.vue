<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    :loading="this.loadingCars"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
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
  },
  data() {
    return {
      sortBy: "created",
      sortDesc: true,
      headers: [
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
