<template>
  <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-8 bg-white shadow">
    <div class="relative flex items-center justify-between">
      <!-- Button to collapse the sidebar based on sidebar collapse state stred in pinia -->
      <div class="inline-flex items-center">
        <a-button :style="{ padding: '0 12px', height: '30px', lineHeight: '30px', marginBottom: '4px', background: '#4f46e5' }" type="primary" @click="storeSidebar.toggleSidebarCollapse">
          <icon-menu-unfold v-if="storeSidebar.isOpen" />
          <icon-menu-fold v-else />
        </a-button>
      </div>

      <!-- Items when menu is not collapsed -->
      <ul class="flex items-center hidden space-x-8 lg:flex">
        <li>
          <WeekSelector />
        </li>
        <li>
          <UserDisplay />
        </li>
      </ul>
      <div class="lg:hidden">
        <button aria-label="Open Menu" title="Open Menu" class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50" @click="storeNavbar.toggleNavbarMenu">
          <vue-feather type="menu" size="18"></vue-feather>
        </button>
        <div v-if="storeNavbar.isMenuOpen" class="absolute top-0 left-0 w-full z-50">
          <div class="p-5 bg-white border rounded shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p>Menu</p>
              </div>
              <div>
                <button aria-label="Close Menu" title="Close Menu" class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" @click="storeNavbar.toggleNavbarMenu">
                  <vue-feather type="x" size="18"></vue-feather>
                </button>
              </div>
            </div>

            <!-- Items when menu is collapsed -->
            <nav>
              <ul class="space-y-4 flex flex-col justify-center items-center">
                <li>
                  <UserDisplay />
                </li>
                <li>
                  <WeekSelector />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeekSelector from "../components/WeekSelector.vue";
import { useNavbarStore } from "../stores/navbar";
import { useSidebarStore } from "../stores/sidebar";
import { useUserStore } from "../stores/userInfo";
import { useWeeklyPointsStore } from "../stores/Escalation_Files_Stores/pointsStore";
import { IconMenuFold, IconMenuUnfold } from "@arco-design/web-vue/es/icon";
import UserDisplay from "../components/UserDisplay.vue";
import { ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";

//firebase imports
import { auth } from "../firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseInit";
import { getDocs, collection, onSnapshot, query, where } from "firebase/firestore";

const storeUser = useUserStore();
const storeNavbar = useNavbarStore();
const storeSidebar = useSidebarStore();
const storePoints = useWeeklyPointsStore;

onMounted(() => {
  storeUser.getInfo();
});
</script>
