<template>
  <div class="w-full h-screen flex justify-center items-center forgotPasswordBackground">
    <!-- Display loading icon if auth is pending status is true -->
    <div class="z-40 absolute bg-indigo-500 w-full h-screen opacity-60 flex items-center justify-center" v-show="isPending">
      <div>
        <Loader />
      </div>
    </div>
    <!-- Form container -->
    <div class="bg-white p-16 rounded-sm shadow-md">
      <!-- Kesm logo -->
      <div class="flex justify-center">
        <div class="kesm_logo">KESM</div>
      </div>
      <!-- Form title -->
      <h2 class="text-indigo-500 text-xl font-semibold">Password Reset</h2>

      <!-- Form description -->
      <p class="mt-2 opacity-70">Forgot your password? Enter your email to reset it</p>

      <!-- Form Layout container -->
      <a-space direction="vertical" size="large" :style="{ width: '350px' }">
        <a-form :model="form" :layout="layout">
          <!-- Email input -->
          <a-form-item field="email">
            <a-input v-model="form.email" placeholder="Please enter your email" allow-clear>
              <template #prefix>
                <icon-email />
              </template>
            </a-input>
          </a-form-item>

          <!-- Error message display -->
          <div class="text-red-400 italic">
            {{ error }}
          </div>

          <!-- modal display if user successfully reset password -->
          <a-config-provider :locale="enUS">
            <a-modal v-model:visible="visible" @ok="handleOk" hideCancel :closable="false">
              <template #title> Password Reset </template>
              <div>Your password reset request has been submitted successfully! You will receive a password reset link shortly.</div>
            </a-modal>
          </a-config-provider>

          <!-- Form submit button -->
          <a-form-item>
            <a-button type="outline" @click="handleSubmit()">Reset</a-button>
          </a-form-item>
          <div class="my-2 text-gray-500 hover:text-indigo-700 italic">
            <router-link :to="{ name: 'login' }">Back to login</router-link>
          </div>
        </a-form>
      </a-space>
    </div>
  </div>
</template>

<script setup>
// En language import for arco component
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";

// Vue utils imports
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

//Composable import
import useForgotPassword from "../../composables/useForgotPassword";

//Component import
import Loader from "../../components/Loader.vue";

const router = useRouter();

let visible = ref(false);

//Modal Function to execute when user clicks on 'ok' button
const handleOk = () => {
  router.push({ name: "login" });
};

// Destructure composable to use its functions and variables inside the current component
const { forgotPassword, error, isPending } = useForgotPassword();

// Variable to define the layout of the form
const layout = ref("vertical");

// Store email value
const form = reactive({
  email: null,
});

//Function to reset the user password using useForgotPassword composable
const handleSubmit = async () => {
  await forgotPassword(form.email);

  if (!error.value) {
    visible.value = true;
  }
};
</script>

<style scoped>
.forgotPasswordBackground {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1123%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%23SvgjsLinearGradient1124)'%3e%3c/rect%3e%3cuse xlink:href='%23SvgjsSymbol1131' x='0' y='0'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsSymbol1131' x='0' y='720'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsSymbol1131' x='720' y='0'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsSymbol1131' x='720' y='720'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsSymbol1131' x='1440' y='0'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsSymbol1131' x='1440' y='720'%3e%3c/use%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1123'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='10.94%25' y1='-19.44%25' x2='89.06%25' y2='119.44%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1124'%3e%3cstop stop-color='rgba(131%2c 126%2c 225%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(66%2c 61%2c 151%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath d='M-1 0 a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0z' id='SvgjsPath1127'%3e%3c/path%3e%3cpath d='M-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0z' id='SvgjsPath1129'%3e%3c/path%3e%3cpath d='M-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0z' id='SvgjsPath1125'%3e%3c/path%3e%3cpath d='M2 -2 L-2 2z' id='SvgjsPath1130'%3e%3c/path%3e%3cpath d='M6 -6 L-6 6z' id='SvgjsPath1126'%3e%3c/path%3e%3cpath d='M30 -30 L-30 30z' id='SvgjsPath1128'%3e%3c/path%3e%3c/defs%3e%3csymbol id='SvgjsSymbol1131'%3e%3cuse xlink:href='%23SvgjsPath1125' x='30' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='30' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='30' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='30' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='30' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='30' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='30' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1127' x='30' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='30' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='30' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='30' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='30' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='90' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='90' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='90' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='90' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='90' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='90' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='90' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='90' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='90' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='90' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='90' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='90' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='150' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='150' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='150' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='150' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='150' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='150' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='150' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='150' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='150' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='150' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='150' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='150' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='210' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='210' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1127' x='210' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='210' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='210' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='210' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='210' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1127' x='210' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='210' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='210' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='210' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='210' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='270' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='270' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='270' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='270' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='270' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='270' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='270' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1127' x='270' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='270' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='270' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='270' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='270' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='330' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='330' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1127' x='330' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='330' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='330' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='330' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='330' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='330' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1127' x='330' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='330' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='330' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='330' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='390' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='390' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='390' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='390' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='390' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='390' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='390' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='390' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='390' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='390' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='390' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='390' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='450' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='450' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='450' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='450' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='450' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='450' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='450' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='450' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='450' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='450' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='450' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='450' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='510' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='510' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='510' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='510' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='510' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='510' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='510' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='510' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='510' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='510' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='510' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='510' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='570' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='570' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='570' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='570' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='570' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='570' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='570' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='570' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='570' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='570' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='570' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='570' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='630' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='630' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='630' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='630' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='630' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='630' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='630' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='630' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='630' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='630' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='630' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='630' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='690' y='30' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='690' y='90' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1126' x='690' y='150' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1125' x='690' y='210' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='690' y='270' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='690' y='330' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='690' y='390' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1129' x='690' y='450' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='690' y='510' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='690' y='570' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1130' x='690' y='630' stroke='rgba(131%2c 126%2c 225%2c 1)'%3e%3c/use%3e%3cuse xlink:href='%23SvgjsPath1128' x='690' y='690' stroke='rgba(131%2c 126%2c 225%2c 1)' stroke-width='3'%3e%3c/use%3e%3c/symbol%3e%3c/svg%3e");
}
</style>
