<template>
  <h2>{{ currentWeek.week }}</h2>
</template>

<script setup>
import { weekStore } from "../stores/weekStore";

const currentWeek = weekStore();
</script>

<style></style>
