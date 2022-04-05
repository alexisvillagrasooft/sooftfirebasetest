<template>
  <v-expansion-panels multiple v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-header color="primary white--text">
        Importar Autos
        <template v-slot:actions>
          <v-icon color="white"> $expand </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <FirebaseAddImport
          :saveMultiple="this.saveMultiple"
          :loading="this.loadingAdd"
          class="mt-4"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header color="primary white--text">
        Agregar Auto
        <template v-slot:actions>
          <v-icon color="white"> $expand </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <FirebaseAdd
          :saveCar="this.save"
          :loading="this.loadingAdd"
          class="mt-6"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel ex>
      <v-expansion-panel-header color="primary white--text">
        Listado de Autos
        <template v-slot:actions>
          <v-icon color="white"> $expand </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <FirebaseFilter
          :refreshCars="this.refresh"
          :searchAllCars="this.searchCars"
          :loading="this.loadingCars"
          class="mt-4"
        />
        <FirebaseTable
          :cars="this.cars"
          :loading="this.loadingCars"
          :loadingDel="this.loadingDelete"
          :deleteCar="this.deleteCar"
          :deleteMultipleCars="this.deleteMultipleCars"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
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
import firebaseApp from "../plugins/firebase";
import FirebaseTable from "../components/FirebaseTable";
import FirebaseFilter from "../components/FirebaseFilter";
import FirebaseAdd from "../components/FirebaseAdd";
import FirebaseAddImport from "../components/FirebaseAddImport";
const db = getFirestore(firebaseApp); // Obtiene la DB
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
    async deleteMultipleCars(refs) {
      this.loadingDelete = true;
      const batch = writeBatch(db);
      refs.forEach((car) => {
        const delDoc = car.ref;
        batch.delete(delDoc);
      });
      await batch.commit();
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
