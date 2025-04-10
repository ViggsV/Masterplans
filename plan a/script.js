Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZGYyYmNlYi02ZmY3LTQyY2MtYTRmOC0yNjAwN2NkNWVmN2UiLCJpZCI6MjkxNzQ5LCJpYXQiOjE3NDQwNTUyODF9.FMlRK2zFaLH4SS3VEstNyegrRIrXx2fK-FYsif4JNgU";

const viewer = new Cesium.Viewer("cesiumContainer", {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  sceneModePicker: false,
  homeButton: false,
  fullscreenButton: false,
  navigationHelpButton: false,
  geocoder: false,
  infoBox: false,
  selectionIndicator: false,
  creditContainer: document.createElement("div"),

  // destroy background quickfix
  contextOptions: {
    webgl: {
      alpha: true,
    },
  },
});

// zoomed in a tad bit
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, 90000000),
});

//max zoom distance
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 90000000;

// destroy background
viewer.scene.skyBox.destroy();
viewer.scene.skyBox = undefined;
viewer.scene.sun.destroy();
viewer.scene.sun = undefined;
viewer.scene.skyAtmosphere.destroy();
viewer.scene.skyAtmosphere = undefined;
viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0);
viewer.scene.moon.show = false;

let rotationSpeed = -0.000005; // Default rotation speed
const maxZoom = 1000000; // Max zoom height (in meters) where rotation is slowest
const minZoom = 5000; // Min zoom height (in meters) where rotation stops
const maxRotationSpeed = -0.005; // Max rotation speed (you can tweak this value)

viewer.scene.postUpdate.addEventListener(function () {
  const zoomLevel = viewer.scene.camera.positionCartographic.height;

  // Calculate rotation speed based on zoom level
  if (zoomLevel < minZoom) {
    rotationSpeed = 0; // Stop rotation when zoomed in too close
  } else {
    // Smooth exponential function for gradual slowdown
    const zoomRatio = (zoomLevel - minZoom) / (maxZoom - minZoom);
    // Exponential decay for smoother slowdown
    rotationSpeed = -0.000005 * Math.pow(zoomRatio, 2); // Gradual slowdown

    // Apply max rotation speed cap
    if (rotationSpeed < maxRotationSpeed) {
      rotationSpeed = maxRotationSpeed; // Cap speed when zoomed out
    }
  }

  // Apply rotation
  viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, rotationSpeed);
});



// Closer (zoom in) → height is smaller
const ZOOM_CLOSE = 20000000; // Cards disappear here
const ZOOM_FAR = 90000000; // Cards fully visible here

const camera = viewer.camera;

const cards = [
  { el: document.querySelector(".left-card"), direction: "left" },
  { el: document.querySelector(".right-card"), direction: "right" },
  { el: document.querySelector(".bottom-card"), direction: "bottom" },
  { el: document.querySelector(".top-left-card"), direction: "top-left" },
  { el: document.querySelector(".top-right-card"), direction: "top-right" },
  { el: document.querySelector(".bottom-left-card"), direction: "bottom-left" },
  {
    el: document.querySelector(".bottom-right-card"),
    direction: "bottom-right",
  },
  { el: document.querySelector(".top-center-card"), direction: "top" },
  { el: document.querySelector(".mid-top-left"), direction: "mid-top-left" },
  { el: document.querySelector(".mid-top-right"), direction: "mid-top-right" },
  {
    el: document.querySelector(".mid-bottom-left"),
    direction: "mid-bottom-left",
  },
  {
    el: document.querySelector(".mid-bottom-right"),
    direction: "mid-bottom-right",
  },
];

// When height is ZOOM_CLOSE → progress is 0
// When height is ZOOM_FAR → progress is 1
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Define card style update function
function updateCardStyles() {
  const isMobile = window.innerWidth <= 768;
  const height = viewer.camera.positionCartographic.height;
  const progress = clamp(mapRange(height, ZOOM_CLOSE, ZOOM_FAR, 0, 1), 0, 1);
  const offsetTwo = 50 * (1 - progress);
  const offset = 30 * (1 - progress);
  const scale = mapRange(progress, 0, 1, 0.5, 1);

  if (isMobile) {
    // On mobile, remove inline styles to let CSS handle stacking
    cards.forEach(({ el }) => {
      el.style.transform = '';
      el.style.opacity = '';
    });
  } else {
    // On desktop, apply dynamic styles as before
    cards.forEach(({ el, direction }) => {
      let transform = `scale(${scale})`;
      switch (direction) {
        case "left":
          transform += ` translateX(-${offset}vw) translateY(-50%)`;
          break;
        case "right":
          transform += ` translateX(${offset}vw) translateY(-50%)`;
          break;
        case "bottom":
          transform += ` translateY(${offset}vh) translateX(-50%)`;
          break;
        case "top":
          transform += ` translateY(-${offset}vh) translateX(-50%)`;
          break;
        case "top-left":
          transform += ` translate(-${offset}vw, -${offset}vh)`;
          break;
        case "top-right":
          transform += ` translate(${offset}vw, -${offset}vh)`;
          break;
        case "bottom-left":
          transform += ` translate(-${offset}vw, ${offset}vh)`;
          break;
        case "bottom-right":
          transform += ` translate(${offset}vw, ${offset}vh)`;
          break;
        case "mid-top-left":
          transform += ` translate(-${offsetTwo * 0.2}vw, -${offset * 0.2}vh)`;
          break;
        case "mid-top-right":
          transform += ` translate(${offsetTwo * 0.2}vw, -${offset * 0.2}vh)`;
          break;
        case "mid-bottom-left":
          transform += ` translate(-${offsetTwo * 0.2}vw, ${offset * 0.2}vh)`;
          break;
        case "mid-bottom-right":
          transform += ` translate(${offsetTwo * 0.2}vw, ${offset * 0.2}vh)`;
          break;
      }
      el.style.transform = transform;
      el.style.opacity = progress;
    });
  }
}

// Add event listener for camera changes
viewer.camera.changed.addEventListener(updateCardStyles);

// Set initial styles
updateCardStyles();

// Update styles on window resize (e.g., device rotation)
window.addEventListener('resize', updateCardStyles);


// adding background text

document.addEventListener('DOMContentLoaded', () => { // Make sure DOM is ready

  const wallContainer = document.getElementById('background-text-wall');
  if (!wallContainer) return; // Exit if container not found

  const phrases = [
    "All your base are belong to us",
    "World is mine",
    "Hello World",
    "I know Kung Fu",
    "Wake up, Neo...",
    "There is no spoon",
    "Segmentation fault",
    "NullPointerException",
    "sudo make me a sandwich",
    "init 0",
    "rm -rf /", // Use with caution in real life! ;)
    "Plan A",
    "Take over the world",
    "42",
    "while(true);",
    "console.log('Victory');",
    ":(){ :|:& };:", // Fork bomb - symbolic!
  ];

  const numberOfPhrases = 150; // Adjust how many phrases to generate
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  for (let i = 0; i < numberOfPhrases; i++) {
    const textElement = document.createElement('span');
    //textElement.classList.add('background-text');
    textElement.className = 'absolute text-[rgba(100,100,120,0.08)] font-mono whitespace-nowrap select-none pointer-events-none';

    // Pick a random phrase
    textElement.textContent = phrases[Math.floor(Math.random() * phrases.length)];

    // Random position (allow going slightly off-screen for better distribution)
    const top = Math.random() * 110 - 5; // -5% to 105% vertical position
    const left = Math.random() * 110 - 5; // -5% to 105% horizontal position

    // Random size (adjust range as needed)
    const fontSize = 1 + Math.random() * 1.5; // e.g., 1rem to 2.5rem



    // Random subtle opacity variation (on top of base CSS opacity)
    const opacity = 0.5 + Math.random() * 0.5; // 0.5 to 1.0 (multiplied by CSS rgba alpha)

    // Apply styles
    textElement.style.top = `${top}vh`;
    textElement.style.left = `${left}vw`;
    textElement.style.fontSize = `${fontSize}rem`;
    textElement.style.opacity = opacity; // Modulates the base CSS opacity

    wallContainer.appendChild(textElement);
  }

  

}); // End DOMContentLoaded