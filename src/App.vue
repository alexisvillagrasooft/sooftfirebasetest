<template>
  <v-app>
    <v-main class="py-6 px-15">
      <Home v-if="user" />
      <AuthLogin v-else :setUser="setUser" />
    </v-main>
  </v-app>
</template>

<script>
import AuthLogin from "./views/AuthLogin.vue";
import Home from "./views/Home";
export default {
  components: { Home, AuthLogin },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    setUser(usr) {
      this.user = usr;
    },
  },
};
</script>

<style></style>
