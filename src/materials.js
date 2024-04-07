import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { materialAlphaTest } from 'three/examples/jsm/nodes/Nodes.js';

/**
 * Sizes
 */

const sizes = {
    width: 600,
    height: 400,
}

// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTextures = textureLoader.load('/textures/matcaps/3.png');
const gradientTextures = textureLoader.load('/textures/gradients/3.jpg');


const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',

])

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xa000ff);
// material.alphaMap = doorAlphaTexture
// material.opacity = 0.5;
// material.transparent = true;
// material.side = THREE.DoubleSide  //more expensive

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true;

// we get an illusion that the objects are being illuminated
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTextures;

// const material = new THREE.MeshDepthMaterial()

//material that reacts to light
// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color(0xff0000);

// const material = new THREE.MeshToonMaterial();

// const material = new THREE.MeshStandardMaterial();
// // material.shininess = 1000;
// material.metalness = 0;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5)
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0;
material.envMap = environmentMapTexture;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
scene.add(sphere)
sphere.position.x = -1.2;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)
scene.add(plane)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
scene.add(torus)
torus.position.x = 1.2;


// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);


/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)

// OrbitControls allows the camera to rotate around an object
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//renderer.render(scene, camera)



const mouse = {
    x: 0,
    y: 0,
}


// ANIMATE
const clock = new THREE.Clock();

const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width - 0.5;
    mouse.y = e.clientY / sizes.height - 0.5;

})