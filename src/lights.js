import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}


// set sizes on window resizing
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera aspect ratio
    camera.aspect = sizes.width / sizes.height;
    //update camera projection matrix
    camera.updateProjectionMatrix();
    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.4;
material.roughness = 0.1;
// material.envMap = environmentMapTexture;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
scene.add(sphere)
sphere.position.x = -1.2;

const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    material
)
scene.add(box)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    material
)
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.8;
scene.add(plane)


const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
scene.add(torus)
torus.position.x = 1.2;


// Lights
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.7);
scene.add(directionalLight)
directionalLight.position.set(-1.3, 0.7, 0);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x00ff00, 0.9);
// scene.add(hemisphereLight)


// Point light
const pointLight = new THREE.PointLight(0xff00ff, 0.9)
pointLight.position.set(2, 1, 0.7);
scene.add(pointLight);

// Rect Area Light
const rectAreaLight = new THREE.RectAreaLight(0xffff00, 2, 0.5, 0.5);
rectAreaLight.position.set(1, 1, 2);
rectAreaLight.lookAt(torus.position);
scene.add(rectAreaLight)

// Spot Light
const spotLight = new THREE.SpotLight(0xff0000, 4, 7, Math.PI * 0.1, 0.25, 0.7)
spotLight.position.set(0, 2, 2);
scene.add(spotLight)


/*
* Light Helpers
*/

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
scene.add(spotLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 0.2)
scene.add(rectAreaLightHelper)


/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
camera.position.y = 2
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