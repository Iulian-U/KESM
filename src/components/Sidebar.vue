<template>
  <a-menu
    :style="{ width: '280px', height: '100%' }"
    :collapsed="storeSidebar.isOpen"
    class="shadow"
  >
    <div class="mt-4 h-10 flex justify-center">
      <a-space>
        <div
          v-if="!storeSidebar.isOpen"
          class="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 select-none"
        >
          <p
            class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-700"
          >
            KESM
          </p>
        </div>

        <div
          v-else
          class="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 select-none"
        >
          <p
            class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-700"
          >
            K
          </p>
        </div>
      </a-space>
    </div>

    <!-- Menu Option Wrapper -->
    <div class="mt-5 border-t">
      <!-- Main Options Wrapper -->
      <div class="mt-1">
        <a-space v-if="!storeSidebar.isOpen">
          <p class="p-2 ml-1 font-semibold text-slate-600">Main</p>
        </a-space>
        <!-- Dashboard Menu Item -->
        <router-link to="/">
          <a-menu-item key="1">
            <template #icon><vue-feather type="home" size="18"></vue-feather></template>
            Dashboard
          </a-menu-item>
        </router-link>

        <!-- Procedures Menu Item -->
        <router-link to="/procedures">
          <a-menu-item key="2">
            <template #icon><vue-feather type="clipboard" size="18"></vue-feather></template>
            Procedures
          </a-menu-item>
        </router-link>
      </div>

      <div class="border-t"></div>

      <!-- Escalation files options Wrapper -->
      <div class="mt-1">
        <a-space v-if="!storeSidebar.isOpen">
          <p class="p-2 ml-1 font-semibold text-slate-600">Escalation Files</p>
        </a-space>
        <!-- Weekly Points Menu Item -->
        <router-link to="/weekly-points-file">
          <a-menu-item key="3">
            <template #icon><vue-feather type="file-text" size="18"></vue-feather></template>
            Weekly Points
          </a-menu-item>
        </router-link>

        <!-- Quality Escalation Points Menu Items -->
        <a-sub-menu key="4">
          <template #icon><vue-feather type="file-plus" size="18"></vue-feather></template>
          <template #title>Quality Escalation</template>

          <router-link to="/account-reactivate">
            <a-menu-item key="4_0">Account Reactivate</a-menu-item>
          </router-link>

          <router-link to="/set-to-redeem">
            <a-menu-item key="4_1">Set to redeem</a-menu-item>
          </router-link>

          <router-link to="/sleeping-201">
            <a-menu-item key="4_2">Sleeping 201/202</a-menu-item>
          </router-link>

          <router-link to="/psreason-escalated-to-quality">
            <a-menu-item key="4_3">psReason escalato to Quality</a-menu-item>
          </router-link>
        </a-sub-menu>

        <!-- Special Surveys Menu Items -->
        <a-sub-menu key="5">
          <template #icon><vue-feather type="star" size="18"></vue-feather></template>
          <template #title>Special Surveys</template>

          <router-link to="/beverages-diary">
            <a-menu-item key="5_0">Beverages Diary</a-menu-item>
          </router-link>

          <router-link to="/brightlabs">
            <a-menu-item key="5_1">Brightalbs</a-menu-item>
          </router-link>

          <router-link to="/etcd-diary">
            <a-menu-item key="5_2">ETCD Diary</a-menu-item>
          </router-link>

          <router-link to="/tgi">
            <a-menu-item key="5_3">TGI</a-menu-item>
          </router-link>
        </a-sub-menu>

        <!-- Social Media Menu Items -->
        <a-sub-menu key="6">
          <template #icon><vue-feather type="message-circle" size="18"></vue-feather></template>
          <template #title>Social Media</template>

          <router-link to="/site-review-tickets">
            <a-menu-item key="6_0">Site Review Tickets</a-menu-item>
          </router-link>

          <router-link to="/social-media-review">
            <a-menu-item key="6_1">Social Media Review</a-menu-item>
          </router-link>
        </a-sub-menu>

        <!-- ME and Mobiworkx Menu Item -->
        <router-link to="/me-and-mobiworkx">
          <a-menu-item key="7">
            <template #icon><vue-feather type="globe" size="18"></vue-feather></template>
            ME and Mobiworkx
          </a-menu-item>
        </router-link>

        <!-- IHUT Voicemail Menu Item -->
        <router-link to="/ihut-voicemail-log">
          <a-menu-item key="8">
            <template #icon><vue-feather type="voicemail" size="18"></vue-feather></template>
            IHUT Voicemail Log
          </a-menu-item>
        </router-link>

        <div class="border-t"></div>

        <a-space v-if="!storeSidebar.isOpen">
          <p class="p-2 ml-1 font-semibold text-slate-600">Useful Tools and Links</p>
        </a-space>

        <!-- LP Vendor -->
        <a href="#">
          <a-menu-item key="9">
            <template #icon><vue-feather type="credit-card" size="18"></vue-feather></template>
            Rewards Catalog
          </a-menu-item>
        </a>

        <!-- LP Vendor -->
        <a href="#">
          <a-menu-item key="10">
            <template #icon><vue-feather type="layout" size="18"></vue-feather></template>
            Internal Helpdesk
          </a-menu-item>
        </a>
      </div>
    </div>
  </a-menu>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useSidebarStore } from "../stores/sidebar";
const storeSidebar = useSidebarStore();
</script>

<style>
router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}

.arco-menu-item .arco-menu-selected {
  background-color: red;
}
</style>
