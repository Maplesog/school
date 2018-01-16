var viewer = new Cesium.Viewer('cesiumContainer', {
	baseLayerPicker : false,
	timeline:false,
	animation:false,
	vrButton:true,
	sceneModePicker:false,
	infoBox:true,
	scene3DOnly:true,
	skyBox : new Cesium.SkyBox({
		sources : {
			positiveX : 'Resources/3.jpg',
			negativeX : 'Resources/5.jpg',
			positiveY : 'Resources/6.jpg',
			negativeY : 'Resources/1.jpg',
			positiveZ : 'Resources/4.jpg',
			negativeZ : 'Resources/2.jpg'
		}
	}),
});

console.log(viewer.scene.skyBox._command._modelMatrix)

// viewer.scene.skyBox._comman

// Bounding sphere
var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(116.5505088, 39.91020949, 30.44271623), 180.950374);

// Override behavior of home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
	// Fly to custom position
	viewer.camera.flyToBoundingSphere(boundingSphere);

	// Tell the home button not to do anything
	commandInfo.cancel = true;
});

// Set custom initial position
viewer.camera.flyToBoundingSphere(boundingSphere, {duration: 0});


// Add tileset. Do not forget to reduce the default screen space error to 1
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
	url: 'http://airspace-run.oss-cn-beijing.aliyuncs.com/chuanmei/3d_cseium.json',
	maximumScreenSpaceError : 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
	maximumNumberOfLoadedTiles : 1000 // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
}));

	
tileset.readyPromise.then(function() {
		//var boundingSphere = tileset.boundingSphere;
		 
		viewer.scene.skyBox._command._modelMatrix = Cesium.Matrix4.fromTranslation(tileset.boundingSphere.center);
		console.log(viewer.scene.skyBox._command._modelMatrix)
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.48, boundingSphere.radius * 3.5));
		viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
	
    var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -35);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
		tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

		

		
	
}).otherwise(function(error) {
    throw(error);
});

