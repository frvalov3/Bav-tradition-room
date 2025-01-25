import Marzipano from "marzipano";

// Create the panorama viewer
const panoElement = document.getElementById("pano");
const viewer = new Marzipano.Viewer(panoElement);

// Load your panorama image
const source = Marzipano.ImageUrlSource.fromString("/src/assets/panorama.jpg");
const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
const limiter = Marzipano.RectilinearView.limit.traditional(4000, 100 * Math.PI / 180);
const view = new Marzipano.RectilinearView(null, limiter);

// Create the scene
const scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
});

// Display the scene
scene.switchTo();

// Add a hotspot to the panorama
const hotspotContainer = scene.hotspotContainer(); // Use the scene object here
const hotspotElement = document.createElement("div");
hotspotElement.className = "hotspot";
hotspotElement.innerHTML = `<div class="hotspot-content">MIS-BAV</div>`;
hotspotContainer.createHotspot(hotspotElement, { yaw: 0, pitch: 0 });

// Add event listener for interactivity
hotspotElement.addEventListener("click", () => {
  alert("Welcome to MIS of BAV!");
});