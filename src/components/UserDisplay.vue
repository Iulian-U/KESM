<template>
  <a-space size="large">
    <a-dropdown @select="handleSelect">
      <div class="bg-indigo-600 w-20 h-20 rounded-full flex justify-center items-center cursor-pointer lg:w-10 lg:h-10">
        <p class="font-semibold text-3xl lg:text-lg text-white tracking-wider">{{ storeUser.firstNameInitial }}{{ storeUser.lastNameInitial }}</p>
      </div>

      <template #content>
        <a-doption>Logout</a-doption>
      </template>
    </a-dropdown>
  </a-space>
</template>

<script setup>
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import { useUserStore } from "../stores/userInfo";

const storeUser = useUserStore();

import getUser from "../composables/getUser";

//Firebase imports
import { auth } from "../firebase/firebaseInit";
import { signOut } from "firebase/auth";

const { user } = getUser();
const router = useRouter();

const handleSelect = () => {
  signOut(auth);
};

watchEffect(() => {
  if (!user.value) {
    router.push("/login");
  }
});
</script>

<style>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
