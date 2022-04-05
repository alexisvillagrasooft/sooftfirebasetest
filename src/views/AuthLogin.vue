<template>
  <v-container fluid fill-height>
    <v-card class="mt-4 mx-auto text-center hidden-sm-only" min-width="320">
      <v-card-text>
        <v-card
          class="v-card--offset mx-auto"
          color="primary"
          elevation="4"
          dark
        >
          <v-card-text class="headline white--text"
            >GESTOR DE AUTOS</v-card-text
          >
          <v-card-text>
            <v-icon size="96">mdi-car</v-icon>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-form>
        <v-card-text>
          <v-text-field
            prepend-icon="mdi-account"
            v-model="username"
            label="Nombre de usuario*"
            name="username"
            type="text"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            v-model="password"
            label="Contraseña*"
            name="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <div class="caption grey--text text--darken-1 text-left">
            *Campos requeridos
          </div>
          <div v-if="error" class="caption red--text text--darken-1 text-left">
            Usuario o contraseña incorreto
          </div>
        </v-card-text>
        <v-card-actions>
          <v-row align="center" no-gutters>
            <v-col class="text-center">
              <div class="my-2">
                <v-btn color="primary" block @click="login">Acceder</v-btn>
              </div>
              <!-- <div>
                <v-btn color="primary" x-small text
                  >¿Olvidó su contraseña?</v-btn
                >
              </div>
              <div>
                <v-btn color="primary" x-small text>Registrarse</v-btn>
              </div> -->
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import firebaseApp from "../plugins/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

export default {
  name: "AuthLogin",
  props: { setUser: { type: Function } },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      error: false,
    };
  },
  methods: {
    async login() {
      try {
        this.error = false;
        const authLogin = await signInWithEmailAndPassword(
          auth,
          this.username,
          this.password
        );

        if (authLogin.user) this.setUser(authLogin.user);
      } catch (error) {
        this.error = true;
      }
    },
  },
};
</script>

<style></style>
