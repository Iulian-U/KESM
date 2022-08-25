<template>
  <div class="cover">
    <h2>Hi! For a better experience please access this website on a larger screen.</h2>
  </div>
  <div class="app flex flex-row h-screen area -z-50">
    <div class="z-50">
      <Sidebar v-if="!navigation" />
    </div>
    <div class="flex flex-col w-full z-50">
      <div class="navbar-container">
        <Navbar v-if="!navigation" />
      </div>
      <div
        :class="navigation ? 'login' : ' h-5/6 max-h-5/6 content m-auto overflow-auto rounded-md '"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    RouterLink,
    RouterView,
    Sidebar,
    Navbar,
  },

  data() {
    return {
      navigation: null,
    };
  },

  created() {
    this.checkRoute();
  },

  methods: {
    checkRoute() {
      if (
        this.$route.name === "login" ||
        this.$route.name === "register" ||
        this.$route.name === "forgotPassword"
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },

  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style scoped>
.content {
  width: 97%;
}
</style>
