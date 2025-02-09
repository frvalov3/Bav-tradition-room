<template>
  <Transition name="fade">
    <div v-if="store.tooltipVisible" class="tooltip" :style="tooltipStyle">
      {{ store.tooltipText }}
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";
import { useTooltipStore } from "@/store/modules/tooltipStore.js";

const store = useTooltipStore();

const tooltipStyle = computed(() => ({
  top: `${store.tooltipY}px`,
  left: `${store.tooltipX}px`,
}));
</script>

<style scoped>
.tooltip {
  position: absolute;
  background: rgba(33, 33, 33, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 10s ease-in-out;
  transform: translate(-50%, -100%);
  pointer-events: none;
  z-index: 9999;
}

/* ✅ Keep tooltip visible while inside hotspot */
.tooltip.show {
  opacity: 1;
  visibility: visible;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.tooltip.fade-enter-to {
  opacity: 1;
  visibility: visible;
}
</style>
