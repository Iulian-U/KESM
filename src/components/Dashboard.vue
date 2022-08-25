<template>
  <!-- component -->
  <div class="bg-white h-full test">
    <div class="bg-white flex flex-col font-sans">
      <div class="container mx-auto px-8">
        <main class="flex flex-col-reverse sm:flex-row jusitfy-between items-center py-12">
          <div class="sm:w-2/5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1
              class="uppercase text-3xl text-indigo-500 font-bold leading-none tracking-wide mb-1"
            >
              Welcome back,
            </h1>
            <h1
              class="uppercase text-6xl text-indigo-700 font-bold leading-none tracking-wide mb-2"
            >
              {{ storeUser.fullName }}
            </h1>
            <div class="flex items-center">
              <h2
                class="uppercase text-2xl text-indigo-500 text-secondary tracking-widest font-semibold mb-6"
              >
                Current Week:
              </h2>
              <h2
                class="uppercase text-2xl custom_text text-secondary tracking-widest ml-2 font-semibold mb-6"
              >
                {{ storeWeek.week }}
              </h2>
            </div>
            <p class="text-gray-600 leading-relaxed font-semibold">Daily quote:</p>
            <p class="text-gray-600 leading-relaxed mb-12 italic">{{ randomQuote }}</p>
          </div>
          <div class="mb-16 sm:mb-0 mt-8 sm:mt-0 sm:w-3/5 sm:pl-12">
            <img src="../assets/20944999.png" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
// Stores import
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useUserStore } from "../stores/userInfo";
import { weekStore } from "../stores/weekStore";

// Stores variables
const storeWeek = weekStore();
const storeUser = useUserStore();

let randomQuote = ref("");

const api_url = "https://api.quotable.io/random";

onMounted(() => {
  // Get random quote from api
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      randomQuote.value = data.content;
    });
});
</script>

<style scoped>
.custom_text {
  color: #ff8881;
}

.test {
  min-height: 790px;
}
.svg_illustration {
  position: absolute;
  height: 20%;
  width: 20%;
  margin-left: 45rem;
  margin-top: 3rem;
}

/* media query */
@media (max-width: 768px) {
  .svg_illustration {
    margin-left: 0rem;
    margin-top: 0.5rem;
    height: 40%;
    width: 40%;
  }
}
</style>
