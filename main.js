// Get your own Bing Maps API key at https://www.bingmapsportal.com, prior to publishing your Cesium application:
Cesium.BingMapsApi.defaultKey = 'put your API key here'

// Construct the default list of terrain sources.
var terrainModels = Cesium.createDefaultTerrainProviderViewModels()

// Construct the viewer with just what we need for this base application
var viewer = new Cesium.Viewer('cesiumContainer', {
  //Hide the base layer picker
  baseLayerPicker: false,
  //Use OpenStreetMaps
  // imageryProvider : Cesium.createOpenStreetMapImageryProvider({
  // 	url : 'https://a.tile.openstreetmap.org/'
  // }),
  timeline: false,
  animation: false,
  vrButton: true,
  sceneModePicker: false,
  infoBox: true,
  scene3DOnly: true,
  // skyBox : new Cesium.SkyBox({
  // 	sources : {
  // 		positiveX : 'Resources/px.jpg',
  // 		negativeX : 'Resources/nx.jpg',
  // 		positiveY : 'Resources/py.jpg',
  // 		negativeY : 'Resources/ny.jpg',
  // 		positiveZ : 'Resources/pz.jpg',
  // 		negativeZ : 'Resources/nz.jpg'
  // 	}
  // }),
  terrainProviderViewModels: terrainModels,
  selectedTerrainProviderViewModel: terrainModels[1] // Select STK high-res terrain
})

// No depth testing against the terrain to avoid z-fighting
viewer.scene.globe.depthTestAgainstTerrain = false

// viewer.scene.skyBox._comman

// Bounding sphere
var boundingSphere = new Cesium.BoundingSphere(
  Cesium.Cartesian3.fromDegrees(116.5505088, 39.91020949, 30.44271623),
  180.950374
)

// Override behavior of home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(
  commandInfo
) {
  // Fly to custom position
  viewer.camera.flyToBoundingSphere(boundingSphere)

  // Tell the home button not to do anything
  commandInfo.cancel = true
})

// Set custom initial position
viewer.camera.flyToBoundingSphere(boundingSphere, { duration: 0 })

// Add tileset. Do not forget to reduce the default screen space error to 1
var tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url:
      '3d_cseium.json', //模型json串
    maximumScreenSpaceError: 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
    maximumNumberOfLoadedTiles: 1000 // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
  })
)

tileset.readyPromise
  .then(function() {
    //var boundingSphere = tileset.boundingSphere;

    viewer.camera.viewBoundingSphere(
      boundingSphere,
      new Cesium.HeadingPitchRange(0.0, -0.48, boundingSphere.radius * 3.5)
    )
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)

    var cartographic = Cesium.Cartographic.fromCartesian(
      tileset.boundingSphere.center
    )
    var surface = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      0.0
    )
    var offset = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      -35
    )
    var translation = Cesium.Cartesian3.subtract(
      offset,
      surface,
      new Cesium.Cartesian3()
    )
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  })
  .otherwise(function(error) {
    throw error
  })

var entity2 = viewer.entities.add({
  name: 'zhuyaoquyu',
  polygon: {
    material: new Cesium.ImageMaterialProperty({
      image: '../Scene/nz.png',
      transparent: true
    }),
    height: 120,
    hierarchy: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        113,
        42.5,
        113,
        37.5,
        119,
        37.5,
        119,
        42.5
      ])
    },

    outline: false
  }
})

var entity2 = viewer.entities.add({
  name: 'zhuyaoquyu',
  polygon: {
    material: new Cesium.ImageMaterialProperty({
      image: '../Scene/pz.png',
      transparent: true
    }),
    height: 100000,
    hierarchy: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        114.0,
        42.0,
        114.0,
        38.0,
        118.0,
        38.0,
        118.0,
        42.0
      ])
    },

    outline: false
  }
})

viewer.entities.add({
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([114.0, 38.0, 114.0, 42.0]),
    maximumHeights: [100000, 100000],
    minimumHeights: [-100000, -100000],
    outline: false,
    material: new Cesium.ImageMaterialProperty({
      image: '../Scene/px.png',
      transparent: true
    }) //Cesium.Color.fromRandom({alpha : 0.7})
  }
})

viewer.entities.add({
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([118.0, 38.0, 118.0, 42.0]),
    maximumHeights: [100000, 100000],
    minimumHeights: [-100000, -100000],
    outline: false,

    material: new Cesium.ImageMaterialProperty({
      image: '../Scene/nx.png',
      transparent: true
    }) //Cesium.Color.fromRandom({alpha : 0.7})
  }
})

viewer.entities.add({
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([114.0, 42.0, 118.0, 42.0]),
    maximumHeights: [100000, 100000],
    minimumHeights: [-100000, -100000],
    outline: false,
    material: new Cesium.ImageMaterialProperty({
      image: '../Scene/ny.png',
      transparent: true
    }) //Cesium.Color.fromRandom({alpha : 0.7})
  }
})

viewer.entities.add({
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([114.0, 38.0, 118.0, 38.0]),
    maximumHeights: [100000, 100000],
    minimumHeights: [-100000, -100000],
    outline: true,
    material: new Cesium.ImageMaterialProperty({
      image: '../Scene/py.png',
      transparent: false
    }) //Cesium.Color.fromRandom({alpha : 0.7})
  }
})
