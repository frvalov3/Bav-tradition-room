import { ref, watch, nextTick } from "vue";
import { useMarzipanoStore } from "@/store/modules/marzipanoStore.js";
import { useTooltipStore } from "@/store/modules/tooltipStore.js";
import axios from "axios";

export function useMarzipano(panoRef) {
  const marzipanoStore = useMarzipanoStore();
  const tooltipStore = useTooltipStore();
  let viewer = null;
  let scene = null;
  let Marzipano = null;

  // ✅ Fetch scenes từ API sử dụng
  const fetchScenes = async () => {
    try {
      // const response = await axios.get("");
      const response = [
        {
          "id": "scene1",
          "panorama": "./assets/panorama.jpg",
          "hotspots": [
            { "id": 1, "yaw": 0, "pitch": 0, "image": "./assets/BAVhotspot.png", "scene": "scene2", "title": "BAV Tradition Room" },
            // { "id": 2, "yaw": -0.3, "pitch": 0.2, "image": "./assets/hotspot.png", "scene": "scene3" }
          ]
        },
        {
          "id": "scene2",
          "panorama": "./assets/cityView.jpg",
          "hotspots": [
            { "id": 2, "yaw": 0.3, "pitch": -0.15, "image": "./assets/BAVhotspot.png", "scene": "scene1", "title": "BAV Tradition Room 2" }
          ]
        }
      ];
     
      marzipanoStore.setScenes(response);

    } catch (error) {
      console.error("❌ Error fetching scenes:", error);
    }
  };

  const loadScene = (sceneId) => {
    const sceneData = marzipanoStore.scenes.find((s) => s.id === sceneId);
    if (!sceneData) return;

    const source = Marzipano.ImageUrlSource.fromString(sceneData.panorama);
    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
    const limiter = Marzipano.RectilinearView.limit.traditional(4000, Math.PI / 2);
    const view = new Marzipano.RectilinearView(null, limiter);
    scene = viewer.createScene({ source, geometry, view });

    scene.switchTo(); // ✅ Attach Hotspots (Using Marzipano)
    const hotspotContainer = scene.hotspotContainer();
    sceneData.hotspots.forEach((hotspot) => {
      createHotspot(hotspot, hotspotContainer);
    });
  };

  // ✅ Function to Create Hotspots in Marzipano
  const createHotspot = (hotspot, container) => {
    const hotspotElement = document.createElement("div");
    hotspotElement.classList.add("hotspot");
    hotspotElement.innerHTML = `<img class="hotspot-img" src="${hotspot.image}" alt="Hotspot">`;

    // ✅ Click Event → Switch Scene
    hotspotElement.addEventListener("click", () => {
      marzipanoStore.switchScene(hotspot.scene);
    });

    // ✅ Tooltip Handling
    hotspotElement.addEventListener("mouseenter", (e) => {
      tooltipStore.showTooltip(e, hotspot.title);
    });

    hotspotElement.addEventListener("mousemove", tooltipStore.updateTooltipPosition);
    hotspotElement.addEventListener("mouseleave", tooltipStore.hideTooltip);

    // ✅ Add to Scene
    container.createHotspot(hotspotElement, { yaw: hotspot.yaw, pitch: hotspot.pitch });
  };


  const initializeMarzipano = async () => {
    if (!panoRef.value) return;

    //dynamic import cause of Marzipano does not support ES6 module like import Marzipano from "marzipano"
    Marzipano = (await import("marzipano")).default || (await import("marzipano"));
    viewer = new Marzipano.Viewer(panoRef.value);

    // ✅ Fetch Scenes từ API trước khi load Scene đầu tiên
    await fetchScenes();
    if (marzipanoStore.currentScene) await nextTick();
    loadScene(marzipanoStore.currentScene);

    watch(() => marzipanoStore.currentScene, async (newScene) => {
      await nextTick();
      loadScene(newScene);
    });
  };

  return { initializeMarzipano };
}
