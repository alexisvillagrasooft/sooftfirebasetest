<template>
  <v-form>
    <v-row class="pb-5">
      <v-col cols="12" md="3">
        <v-select
          :items="this.marcas"
          v-model="queryCars.marca"
          label="Marca"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          :items="this.modelos"
          v-model="queryCars.modelo"
          label="Modelo"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-select
          :items="this.tipos"
          v-model="queryCars.tipo"
          label="Tipo"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-select
          :items="this.motores"
          v-model="queryCars.motor"
          label="Motor"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="2" class="text-right">
        <v-btn
          :loading="loadingCars"
          :disabled="loadingCars"
          color="blue-grey"
          class="ma-2 white--text"
          icon
          small
          outlined
          @click="refresh"
        >
          <v-icon dark small> mdi-refresh</v-icon>
        </v-btn>
        <v-btn
          :loading="loadingCars"
          :disabled="loadingCars"
          color="info"
          rounded
          outlined
          small
          @click="searchCars"
        >
          Buscar
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { marcas, modelos, tipos, motores } from "../plugins/arrays";

export default {
  name: "FirebaseFilter",
  props: {
    refreshCars: { type: Function },
    searchAllCars: { type: Function },
    loading: { Type: Boolean },
  },
  data: () => ({
    marcas: marcas,
    modelos: modelos,
    tipos: tipos,
    motores: motores,
    loadingCars: false,
    queryCars: {
      marca: "",
      modelo: "",
      tipo: "",
      motor: "",
    },
  }),
  methods: {
    refresh() {
      this.refreshCars();
    },
    searchCars() {
      this.searchAllCars(this.queryCars);
    },
  },
  watch: {
    loading: {
      immediate: true,
      handler(val) {
        this.loadingCars = val;
      },
    },
  },
};
</script>

<style></style>
