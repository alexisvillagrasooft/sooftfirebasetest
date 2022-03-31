<template>
  <v-app>
    <v-main class="pa-5">
      <v-expansion-panels multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header> Agregar Auto </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" md="3">
                  <!-- <v-text-field
                    v-model="newCar.marca"
                    label="Marca"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.marcas"
                    v-model="newCar.marca"
                    label="Marca"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <!-- <v-text-field
                    v-model="newCar.modelo"
                    label="Modelo"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.modelos"
                    v-model="newCar.modelo"
                    label="Modelos"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <!-- <v-text-field
                    v-model="newCar.tipo"
                    label="Tipo"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.tipos"
                    v-model="newCar.tipo"
                    label="Tipo"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <!-- <v-text-field
                    v-model="newCar.motor"
                    label="Motor"
                    required
                    dense
                  ></v-text-field> -->
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
                    :loading="loading"
                    :disabled="loading"
                    color="info"
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
          </v-expansion-panel-content> </v-expansion-panel
        ><v-expansion-panel ex>
          <v-expansion-panel-header>
            Listado de Autos
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row class="pb-5">
                <v-col cols="12" md="3">
                  <!-- <v-text-field
                    v-model="queryCars.marca"
                    label="Marca"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.marcas"
                    v-model="queryCars.marca"
                    label="Marca"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <!-- <v-text-field
                    v-model="queryCars.modelo"
                    label="Modelo"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.modelos"
                    v-model="queryCars.modelo"
                    label="Modelo"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <!-- <v-text-field
                    v-model="queryCars.tipo"
                    label="Tipo"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.tipos"
                    v-model="queryCars.tipo"
                    label="Tipo"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <!-- <v-text-field
                    v-model="queryCars.motor"
                    label="Motor"
                    required
                    dense
                  ></v-text-field> -->
                  <v-select
                    :items="this.motores"
                    v-model="queryCars.motor"
                    label="Motor"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn
                    :loading="loadingCars"
                    :disabled="loadingCars"
                    color="blue-grey"
                    class="ma-2 white--text"
                    @click="refresh"
                  >
                    <v-icon dark> mdi-refresh</v-icon>
                  </v-btn>
                  <v-btn
                    :loading="loadingCars"
                    :disabled="loadingCars"
                    color="info"
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
            <FirebaseTable :cars="this.cars" :loading="this.loadingCars" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-main>
  </v-app>
</template>

<script>
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "./plugins/firebase";
import FirebaseTable from "./components/FirebaseTable";
import { marcas, modelos, tipos, motores } from "./plugins/arrays";
const app = initializeApp(firebaseConfig); // Inicializa con la configuracion de Firebase
const db = getFirestore(app); // Obtiene la DB
let carsRef = collection(db, "cars"); // Obtiene la coleccion en cuestion

export default {
  name: "App",
  firebase: {
    cars: carsRef,
  },
  components: {
    FirebaseTable,
  },
  data: () => ({
    loading: false,
    loadingCars: false,
    marcas: marcas,
    modelos: modelos,
    tipos: tipos,
    motores: motores,
    panel: [1],
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
    queryCars: {
      marca: "",
      modelo: "",
      tipo: "",
      motor: "",
    },
    cars: [],
  }),
  methods: {
    async save() {
      this.loading = true;
      this.newCar.created = new Date();
      await addDoc(carsRef, this.newCar);
      this.cars = await this.getCars();
      this.loading = false;
    },
    async searchCars() {
      this.loadingCars = true;
      this.cars = await this.getCars();
      this.loadingCars = false;
    },
    async refresh() {
      this.queryCars = { marca: "", modelo: "", tipo: "", motor: "" };
      this.searchCars();
    },
    async getCars() {
      const { marca, modelo, tipo, motor } = this.queryCars;
      let filters = [];

      if (marca.length) filters.push(where("marca", "==", marca));
      if (modelo.length) filters.push(where("modelo", "==", modelo));
      if (tipo.length) filters.push(where("tipo", "==", tipo));
      if (motor.length) filters.push(where("motor", "==", motor));

      // console.log(filters);

      const q = query(carsRef, ...filters);
      const carsDocs = await getDocs(q);
      const cars = carsDocs.docs.map((doc) => {
        return { ...doc.data(), created: doc.data().created.toDate() };
      });
      return cars;
    },
  },
  async mounted() {
    this.cars = await this.getCars();
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
