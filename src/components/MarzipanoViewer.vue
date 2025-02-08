<template>
    <div ref="pano" id="pano"></div>
    <!-- ✅ Tooltip follows the cursor -->
  <div v-if="store.tooltipVisible" class="hotspot-tooltip" :style="tooltipStyle">
    {{ store.tooltipText }}
  </div>
  </template>
  
  <script>
  import {computed, onMounted, ref, watch } from "vue";
  import { useAppStore } from "../store/index.js";
  
  export default {
    setup() {
      const pano = ref(null);
      const store = useAppStore();
      let viewer = null;
      let scene = null;
      let Marzipano = null;

        // ✅ Compute Tooltip Position
    const tooltipStyle = computed(() => ({
      top: `${store.tooltipY}px`,
      left: `${store.tooltipX}px`,
    }));

  
      onMounted(async () => {
        if (!pano.value) return;
  
        Marzipano = (await import("marzipano")).default || (await import("marzipano"));
  
        console.log("✅ Marzipano loaded:", Marzipano);
  
        // ✅ Initialize Viewer
        viewer = new Marzipano.Viewer(pano.value);
  
        // ✅ Fetch scenes from API before loading the first scene
        await store.fetchScenes();
        if (store.currentScene) {
          loadScene(store.currentScene);
        }
  
        // ✅ Watch for Scene Changes
        watch(() => store.currentScene, (newScene) => {
          loadScene(newScene);
        });
      });
  
      // ✅ Load Scene Dynamically from API Data
      const loadScene = (sceneId) => {
        const sceneData = store.scenes.find((s) => s.id === sceneId);
        if (!sceneData) return;
  
        const source = Marzipano.ImageUrlSource.fromString(sceneData.panorama);
        const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
        const limiter = Marzipano.RectilinearView.limit.traditional(4000, Math.PI / 2);
        const view = new Marzipano.RectilinearView(null, limiter);
        scene = viewer.createScene({ source, geometry, view });
  
        scene.switchTo();
  
        // ✅ Attach Hotspots
        const hotspotContainer = scene.hotspotContainer();
        sceneData.hotspots.forEach((hotspot) => {
          const hotspotElement = document.createElement("div");
          hotspotElement.classList.add("hotspot");
          hotspotElement.innerHTML = `<img class="hotspot-img" src="${hotspot.image}" alt="Hotspot">`;
          hotspotElement.title = hotspot.title;
  
          // ✅ Click Event to Change Scene
          hotspotElement.addEventListener("click", () => {
            store.switchScene(hotspot.scene);
          });

          hotspotElement.addEventListener("mouseenter", (e) => {
            store.showTooltip(e, hotspot.title);
            });

            hotspotElement.addEventListener("mousemove", store.updateTooltipPosition);
            hotspotElement.addEventListener("mouseleave", store.hideTooltip);

  
          // ✅ Add Hotspot to Scene
          hotspotContainer.createHotspot(hotspotElement, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });
      };
  
      return { pano, store, tooltipStyle };
    }
  };
  </script>
  
  <style scoped>

  </style>
  