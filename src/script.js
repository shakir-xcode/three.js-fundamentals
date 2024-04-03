import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Sizes
 */

const sizes = {
    width: 600,
    height: 400,
}

// Textures
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTextures = textureLoader.load('/textures/matcaps/3.png');
const gradientTextures = textureLoader.load('/textures/gradients/3.jpg');



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

const material = new THREE.MeshDepthMaterial()


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