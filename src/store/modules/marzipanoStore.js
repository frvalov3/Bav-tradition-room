import { defineStore } from "pinia";
import { ref } from "vue";

export const useMarzipanoStore = defineStore("marzipano", () => {
  const currentScene = ref("scene1");
  const scenes = ref([]);

  const switchScene = (scene) => {
    currentScene.value = scene;
  };

  // ✅ Hàm cập nhật scenes sau khi fetch từ API
  const setScenes = (newScenes) => {
    scenes.value = newScenes;
  };

  return {
    currentScene,
    scenes,
    switchScene,
    setScenes,
  };
});
