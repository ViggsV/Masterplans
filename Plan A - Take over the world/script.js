Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZGYyYmNlYi02ZmY3LTQyY2MtYTRmOC0yNjAwN2NkNWVmN2UiLCJpZCI6MjkxNzQ5LCJpYXQiOjE3NDQwNTUyODF9.FMlRK2zFaLH4SS3VEstNyegrRIrXx2fK-FYsif4JNgU";

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
    contextOptions : {
        webgl : {
        alpha : true,
        
        
        }
        }
  });

  // zoomed in a tad bit
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, 17000000),
  });

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
  