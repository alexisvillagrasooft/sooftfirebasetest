<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:[`item.created`]="{ item }">
      <span>{{ new Date(item.created).toLocaleString() }}</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "FirebaseTable",
  props: {
    cars: [],
    loading: { type: Boolean },
  },
  data() {
    return {
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
      ],
      desserts: [],
      loadingCars: false,
    };
  },
  watch: {
    cars: {
      immediate: true,
      handler(val) {
        this.desserts = val;
      },
    },
    loading: {
      immediate: true,
      handler(val) {
        this.loadingCars = val;
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
