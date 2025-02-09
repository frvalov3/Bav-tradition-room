<template>
    <div 
      class="hotspot"
      @mouseenter="showTooltip"
      @mousemove="updateTooltipPosition"
      @mouseleave="hideTooltip"
      @click="navigateToScene"
    >
      <img :src="hotspot.image" class="hotspot-img" />
      
      <!-- Tooltip -->
      <Transition name="fade">
        <div v-if="tooltipVisible" class="hotspot-tooltip" :style="tooltipStyle">
          {{ hotspot.title }}
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useMarzipanoStore } from "@/store/modules/marzipanoStore.js";
  
  const props = defineProps({
    hotspot: Object,
  });
  
  const store = useMarzipanoStore();
  const tooltipVisible = ref(false);
  const tooltipX = ref(0);
  const tooltipY = ref(0);
  
  const tooltipStyle = computed(() => ({
    top: `${tooltipY.value}px`,
    left: `${tooltipX.value}px`,
  }));
  
  const navigateToScene = () => {
    if (props.hotspot.scene) {
      store.switchScene(props.hotspot.scene);
    }
  };
  
  const showTooltip = (event) => {
    tooltipVisible.value = true;
    updateTooltipPosition(event);
  };
  
  const updateTooltipPosition = (event) => {
    tooltipX.value = event.clientX + 10;
    tooltipY.value = event.clientY - 40;
  };
  
  const hideTooltip = () => {
    tooltipVisible.value = false;
  };
  </script>
  
  <style scoped>
  .hotspot {
    position: absolute;
    cursor: pointer;
    display: inline-block;
  }
  
  .hotspot-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;
  }
  
  .hotspot-img:hover {
    transform: scale(1.1);
  }
  
  /* Tooltip Styling */
  .hotspot-tooltip {
    position: absolute;
    background: rgba(33, 33, 33, 0.9);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }
  
  .hotspot:hover .hotspot-tooltip {
    opacity: 1;
    visibility: visible;
  }
  
  /* Fade transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  