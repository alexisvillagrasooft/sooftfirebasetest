# sooftfirebasev2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Configuración de Firestore Cloud


1 - Iniciar sesión en la siguiente página https://console.firebase.google.com/
2 - Hacemos click en "Agregar Proyecto" o seleccionamos uno ya existente
3 - Una vez dentro del proyecto nos dirigimos al servicio de "Firestore Database" y creamos una nueva base de datos
4 - En la pestaña Reglas vamos a configurar el acceso a la DB
5 - Ahora nos dirigimos a la pantalla de "Descripción General del Proyecto"
6- En esta pantalla tenemos la opción de generar la configuración dependiendo el dispositivo en el que se va a usar, en este caso vamos a seleccionar el "WEB" (tiene el icono en violeta)
7 - En esta pantalla deberías ver la configuración del SDK, en donde necesitamos tomar el firebaseConfig que tiene el siguiente formato:


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


Configuración en JS
1 - Con la configuración de firebase copiada, vamos a proceder a pegarla en el siguiente archivo
src/plugins/firebase.js


2 - Vamos a instalar vuefire y firebase con el siguiente comando (Se encuentra en el package.json todos los paquetes necesarios)
npm i vuefire firebase


3 - Ahora tenemos que importar la configuración de firebase en el archivo donde se va a usar (en este ejemplo se usa en el App.vue)
import firebaseConfig from "./plugins/firebase";


4 - Importamos el inicializador de app desde firebase
import { initializeApp } from "firebase/app";


5- Inicializamos la app con la configuración de nuestro firebase
const app = initializeApp(firebaseConfig); // Inicializa con la configuración de Firebase


6 - Importamos los recursos que vamos a usar de Firestore Cloud
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";


7 - Obtenemos la base de datos de Firestore
const db = getFirestore(app); // Obtiene la DB


8 - Instanciamos la colección en que vamos a trabajar (En mi caso le puse "cars")
let carsRef = collection(db, "cars"); // Si esta colección no existe en firestore se creara




Crud Basicos  de Firestore




Obtener todos los documentos de una colección
const q = query(carsRef); // carsRef es la instancia de la colección donde queremos buscar
const carsDocs = await getDocs(q);


Insertar un nuevo documento
addDoc(carsRef, this.newCar); // carsRef es la instancia de la coleccion donde queremos buscar y this.newCar es el objeto que vamos a insertar