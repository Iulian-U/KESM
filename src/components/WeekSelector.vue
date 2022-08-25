<template>
  <a-config-provider :locale="enUS">
    <a-button @click="handleClick">Week Select</a-button>
    <a-modal v-model:visible="visible" @ok="() => this.$message.success('Week updated successfully')" @cancel="handleCancel" width="auto">
      <template #title> Please select the current week </template>
      <div class="flex justify-center">
        <a-input-number :style="{ width: '320px' }" placeholder="Please Select Week" :default-value="500" mode="button" v-model="storeWeek.week" />
      </div>
    </a-modal>
  </a-config-provider>
</template>

<script>
import { ref } from "vue";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import { weekStore } from "../stores/weekStore";

export default {
  data() {
    return {
      enUS,
    };
  },
  setup() {
    const storeWeek = weekStore();

    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    };

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel,
      storeWeek,
    };
  },
};
</script>
