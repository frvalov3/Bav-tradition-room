import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAppStore = defineStore("app", () => {
  // ✅ Store active scene (current panorama)
  const currentScene = ref(null);
  const scenes = ref([]); // Store scenes dynamically from API

  // ✅ Fetch Scenes from API
  const fetchScenes = async () => {
    try {
    //   const response = await axios.get("https://api.example.com/scenes"); // Replace with actual API
    //fake Data
      const response = [
        {
          "id": "scene1",
          "panorama": "./assets/panorama.jpg",
          "hotspots": [
            { "id": 1, "yaw": 0.5, "pitch": -0.1, "image": "./assets/BAVhotspot.png", "scene": "scene2", "title": "BAV Tradition Room" },
            // { "id": 2, "yaw": -0.3, "pitch": 0.2, "image": "./assets/hotspot.png", "scene": "scene3" }
          ]
        },
        {
          "id": "scene2",
          "panorama": "./assets/cityView.jpg",
          "hotspots": [
            { "id": 3, "yaw": 0.3, "pitch": -0.15, "image": "./assets/hotspot.png", "scene": "scene1" }
          ]
        },
        {
          "id": "scene3",
          "panorama": "./assets/panorama3.jpg",
          "hotspots": [
            { "id": 4, "yaw": -0.2, "pitch": 0.1, "image": "./assets/hotspot.png", "scene": "scene1" }
          ]
        }
      ];
      scenes.value = response;

      // ✅ Set the first scene as the default
      if (scenes.value.length > 0) {
        currentScene.value = scenes.value[0].id;
      }
    } catch (error) {
      console.error("❌ Failed to fetch scenes:", error);
    }
  };

  // ✅ Switch Scene Dynamically
  const switchScene = (sceneId) => {
    const sceneExists = scenes.value.find((s) => s.id === sceneId);
    if (sceneExists) {
      currentScene.value = sceneId;
    } else {
      console.error(`❌ Scene ${sceneId} not found!`);
    }
  };

   // ✅ Tooltip Management
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
    currentScene,
    scenes,
    fetchScenes,
    switchScene,
    tooltipVisible, tooltipText, tooltipX, tooltipY,
    showTooltip, hideTooltip, updateTooltipPosition
  };
});
