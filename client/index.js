import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import ColladaLoader from 'three-collada-loader'

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

var light_colour  = '#ad002d',
    ambientLight  = new THREE.AmbientLight( '#ffb300' ),
    hemiLight     = new THREE.HemisphereLight( light_colour, light_colour, 0 ),
    light         = new THREE.PointLight( light_colour, 1, 100 );

hemiLight.position.set( 0, 50, 0 );
light.position.set( 0, 20, 10 );

scene.add( ambientLight );
scene.add( hemiLight );
scene.add( light );


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

// https://webdesign.tutsplus.com/tutorials/a-noobs-guide-to-threejs--cms-28639


//navbar
document.getElementById("example").style.display = "none";

var show = function (elem) {
	elem.style.display = 'block';
};

var hide = function (elem) {
	elem.style.display = 'none';
};

var toggle = function (elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};

// Listen for click events
document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	if (!event.target.classList.contains('toggle')) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);


