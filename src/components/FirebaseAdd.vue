<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="3">
        <v-select
          :items="this.marcas"
          v-model="newCar.marca"
          label="Marca"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          :items="this.modelos"
          v-model="newCar.modelo"
          label="Modelos"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          :items="this.tipos"
          v-model="newCar.tipo"
          label="Tipo"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          :items="this.motores"
          v-model="newCar.motor"
          label="Motor"
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="newCar.anio"
          label="Año"
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="newCar.color"
          label="Color"
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="newCar.puertas"
          label="Puertas"
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="newCar.combustible"
          label="Combustible"
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="newCar.kilometros"
          label="Kilometros"
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="newCar.transmision"
          label="Transmision"
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn
          :loading="loadingAdd"
          :disabled="loadingAdd"
          color="info"
          rounded
          outlined
          small
          @click="save"
        >
          Agregar
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
  name: "FirebaseAdd",
  props: {
    saveCar: { type: Function },
    loading: { Type: Boolean },
  },
  data: () => ({
    marcas: marcas,
    modelos: modelos,
    tipos: tipos,
    motores: motores,
    loadingAdd: false,
    newCar: {
      marca: "Chevrolet",
      modelo: "Corsa",
      tipo: "Sedan",
      motor: "1.5",
      anio: "1994",
      color: "Gris",
      puertas: "5",
      combustible: "Nafta",
      kilometros: "105000",
      transmision: "Manual",
      created: new Date(),
    },
  }),
  methods: {
    save() {
      this.saveCar(this.newCar);
    },
  },
  watch: {
    loading: {
      immediate: true,
      handler(val) {
        this.loadingAdd = val;
      },
    },
  },
};
</script>

<style></style>
