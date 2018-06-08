// import React from 'react'
// import {render} from 'react-dom'
import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import ColladaLoader from 'three-collada-loader'
// import {Provider} from 'react-redux'

// import App from './components/App'

// import store from './store'
{/* <script src = "TrackballControls.js"></script>
var TrackballControls = require('three-trackballcontrols'); */}


var scene,
    camera,
    renderer,
    controls;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(-5, 12, 10);
camera.lookAt( scene.position );

renderer = new THREE.WebGLRenderer({
  alpha: true,
	antialias: true
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

controls = new TrackballControls( camera );
controls.rotateSpeed = 5.0;
controls.zoomSpeed = 3.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = true;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;

/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var light_colour  = '#FAFAFA',
    ambientLight  = new THREE.AmbientLight( '#EEEEEE' ),
    hemiLight     = new THREE.HemisphereLight( light_colour, light_colour, 0 ),
    light         = new THREE.PointLight( light_colour, 1, 100 );

hemiLight.position.set( 0, 50, 0 );
light.position.set( 0, 20, 10 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( light );


/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

// var axisHelper = new THREE.AxisHelper( 1.25 );
// scene.add( axisHelper );


/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderThreeDObject() {
  renderer.render( scene, camera );
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
controls.addEventListener( 'change', renderThreeDObject );

// Avoid constantly rendering the scene by only 
// updating the controls every requestAnimationFrame
function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update();
}

animationLoop();


/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
	renderThreeDObject();
}, false );


/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var tawhiri,
    loader = new ColladaLoader();

function loadCollada( collada ) {
  tawhiri = collada.scene;
  tawhiri.position.set(0.4, 0, 0.8);
  scene.add(tawhiri);
  renderThreeDObject();
}

loader.options.convertUpAxis = true;
loader.load( '/assets/images/tawhiri.dae', loadCollada);

// Background scene

// Load the background texture
var loader =  new THREE.TextureLoader()
var texture = loader.load( '/assets/images/sunset.svg' );
var backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshBasicMaterial({
        map: texture
    }));

backgroundMesh .material.depthTest = false;
backgroundMesh .material.depthWrite = false;

// Create your background scene
var backgroundScene = new THREE.Scene();
var backgroundCamera = new THREE.Camera();
backgroundScene .add(backgroundCamera );
backgroundScene .add(backgroundMesh );


// Rendering function
var go = function () {
    requestAnimationFrame(go);

    renderer.autoClear = false;
    renderer.clear();
    renderer.render(backgroundScene , backgroundCamera );
    renderer.render(scene, camera);
};

go();

// var color = 0x000000;

// // Create your main scene
// var scene = new THREE.Scene();

// // Create your main camera
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// // Create lights
// var light = new THREE.PointLight(0xEEEEEE);
// light.position.set(20, 0, 20);
// scene.add(light);

// var lightAmb = new THREE.AmbientLight(0x777777);
// scene.add(lightAmb);

// // Create your renderer
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create a cube
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshLambertMaterial({
//     color: 0xff00ff,
//     ambient: 0x121212,
//     emissive: 0x121212
//  });

// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // Set up the main camera
// camera.position.z = 5;

// // Load the background texture
// var loader =  new THREE.TextureLoader()
// var texture = loader.load( '/assets/images/group.jpg' );
// var backgroundMesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(2, 2, 0),
//     new THREE.MeshBasicMaterial({
//         map: texture
//     }));

// backgroundMesh .material.depthTest = false;
// backgroundMesh .material.depthWrite = false;

// // Create your background scene
// var backgroundScene = new THREE.Scene();
// var backgroundCamera = new THREE.Camera();
// backgroundScene .add(backgroundCamera );
// backgroundScene .add(backgroundMesh );

// // Rendering function
// var go = function () {
//     requestAnimationFrame(go);

//     // Update the color to set
//     if (color < 0xdddddd) color += 0x0000ff;

//     // Update the cube color
//     cube.material.color.setHex(color);

//     // Update the cube rotations
//     cube.rotation.x += 0.05;
//     cube.rotation.y += 0.02;

//     renderer.autoClear = false;
//     renderer.clear();
//     renderer.render(backgroundScene , backgroundCamera );
//     renderer.render(scene, camera);
// };

// go();

// // document.addEventListener('DOMContentLoaded', () => {
// //   render(
// //     <Provider store={store}>
// //       <App />
// //     </Provider>,
// //     document.getElementById('app')
// //   )
// // })


