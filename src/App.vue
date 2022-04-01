<template>
  <v-app>
    <v-main class="pa-5">
      <v-expansion-panels multiple v-model="panel">
        <v-expansion-panel>
          <v-expansion-panel-header> Importar Autos </v-expansion-panel-header>
          <v-expansion-panel-content>
            <FirebaseAddImport
              :saveMultiple="this.saveMultiple"
              :loading="this.loadingAdd"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header> Agregar Auto </v-expansion-panel-header>
          <v-expansion-panel-content>
            <FirebaseAdd :saveCar="this.save" :loading="this.loadingAdd" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel ex>
          <v-expansion-panel-header>
            Listado de Autos
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <FirebaseFilter
              :refreshCars="this.refresh"
              :searchAllCars="this.searchCars"
              :loading="this.loadingCars"
            />
            <FirebaseTable
              :cars="this.cars"
              :loading="this.loadingCars"
              :loadingDel="this.loadingDelete"
              :deleteCar="this.deleteCar"
            />
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
  writeBatch,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import firebaseConfig from "./plugins/firebase";
import FirebaseTable from "./components/FirebaseTable";
import FirebaseFilter from "./components/FirebaseFilter.vue";
import FirebaseAdd from "./components/FirebaseAdd.vue";
import FirebaseAddImport from "./components/FirebaseAddImport.vue";
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
    FirebaseFilter,
    FirebaseAdd,
    FirebaseAddImport,
  },
  data: () => ({
    loadingAdd: false,
    loadingCars: false,
    loadingDelete: false,
    panel: [2],
    queryCars: {
      marca: "",
      modelo: "",
      tipo: "",
      motor: "",
    },
    cars: [],
  }),
  methods: {
    async save(newCarsave) {
      this.loadingAdd = true;
      newCarsave.created = new Date();
      await addDoc(carsRef, newCarsave);
      await this.searchCars(this.queryCars);
      this.loadingAdd = false;
    },
    async saveMultiple(newCarsSave) {
      this.loadingAdd = true;
      const batch = writeBatch(db);
      newCarsSave.forEach((car) => {
        const newDoc = doc(carsRef);
        batch.set(newDoc, { ...car, created: new Date() });
      });
      await batch.commit();
      await this.searchCars(this.queryCars);
      this.loadingAdd = false;
    },
    async searchCars(queryCarsSearch) {
      this.loadingCars = true;
      this.cars = await this.getCars(queryCarsSearch);
      this.loadingCars = false;
    },
    async refresh() {
      this.queryCars = { marca: "", modelo: "", tipo: "", motor: "" };
      this.searchCars(this.queryCars);
    },
    async getCars(queryCarsSearch) {
      const { marca, modelo, tipo, motor } = queryCarsSearch;
      let filters = [];

      if (marca.length) filters.push(where("marca", "==", marca));
      if (modelo.length) filters.push(where("modelo", "==", modelo));
      if (tipo.length) filters.push(where("tipo", "==", tipo));
      if (motor.length) filters.push(where("motor", "==", motor));

      const q = query(carsRef, ...filters);
      const carsDocs = await getDocs(q);
      const cars = carsDocs.docs;
      return cars;
    },
    async deleteCar(ref) {
      this.loadingDelete = true;
      await deleteDoc(ref);
      await this.searchCars(this.queryCars);
      this.loadingDelete = false;
    },
  },
  async mounted() {
    await this.searchCars(this.queryCars);
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
