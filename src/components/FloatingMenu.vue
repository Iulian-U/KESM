<template>
  <a-trigger :trigger="['click', 'hover']" clickToClose position="top" v-model:popupVisible="popupVisible2">
    <div :class="`button-trigger ${popupVisible2 ? 'button-trigger-active' : ''}`">
      <IconClose v-if="popupVisible2" />
      <IconMessage :size="22" v-else />
    </div>
    <template #content>
      <a-menu :style="{ marginBottom: '-4px' }" mode="popButton" :tooltipProps="{ position: 'left' }" showCollapseButton>
        <a-menu-item key="1" @click="$emit('downloadData')">
          <template #icon><IconDownload :size="15"></IconDownload></template>
          Download Spreadsheet
        </a-menu-item>

        <a-menu-item key="2" @click="$emit('clearData')">
          <template #icon><IconEraser :size="15"> </IconEraser></template>
          Clear Spreadsheet
        </a-menu-item>
      </a-menu>
    </template>
  </a-trigger>
</template>
<script>
import { IconDownload, IconEraser, IconClose, IconMessage } from "@arco-design/web-vue/es/icon";

export default {
  components: {
    IconDownload,
    IconEraser,
    IconClose,
    IconMessage,
  },
  data() {
    return {
      popupVisible1: false,
      popupVisible2: false,
    };
  },
};
</script>
<style scoped>
.button-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
/* button left */
.button-trigger:nth-child(1) {
  left: 150px;
  background-color: #4f46e5;
}
.button-trigger:nth-child(1).button-trigger-active {
  background-color: #818cf8;
}
/* button right */
.button-trigger:nth-child(2) {
  left: 372px;
  background-color: rgb(var(--arcoblue-6));
}
.button-trigger:nth-child(3).button-trigger-active {
  background-color: var(--color-primary-light-4);
}
</style>
