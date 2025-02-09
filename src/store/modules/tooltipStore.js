import { defineStore } from "pinia";
import { ref } from "vue";

export const useTooltipStore = defineStore("tooltip", () => {
  const tooltipVisible = ref(false);
  const tooltipText = ref("");
  const tooltipX = ref(0);
  const tooltipY = ref(0);

  const showTooltip = (event, text) => {
    tooltipText.value = text;
    tooltipVisible.value = true;
    updateTooltipPosition(event);
  };

  const hideTooltip = () => {
    tooltipVisible.value = false;
  };

  const updateTooltipPosition = (event) => {
    tooltipX.value = event.clientX + 10;
    tooltipY.value = event.clientY - 40;
  };

  return {
    tooltipVisible,
    tooltipText,
    tooltipX,
    tooltipY,
    showTooltip,
    hideTooltip,
    updateTooltipPosition,
  };
});
