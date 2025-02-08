<template>
  <div v-if="store.tooltipVisible" class="tooltip" :style="tooltipStyle">
    {{ store.tooltipText }}
    <span class="tooltip-arrow"></span> <!-- ✅ Mũi tên chỉ vào Hotspot -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useAppStore } from "../store/index.js";

export default {
  setup() {
    const store = useAppStore();

    // ✅ Compute tooltip position dynamically
    const tooltipStyle = computed(() => ({
      top: `${store.tooltipY}px`,
      left: `${store.tooltipX}px`
    }));

    return { store, tooltipStyle };
  }
};
</script>

<style scoped>
/* ✅ Tooltip Styling */
.tooltip {
  position: fixed; /* ✅ Tooltip follows cursor */
  background: rgba(33, 33, 33, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
}

/* ✅ Tooltip Arrow */
.tooltip-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(33, 33, 33, 0.9);
}
</style>
