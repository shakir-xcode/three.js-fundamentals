import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Sizes
 */

const sizes = {
    width: 600,
    height: 400,
}


// Canvas
const canvas = document.querySelector('canvas.webgl')


// Textures Loading - old way
// const img = new Image();
// const texture = new THREE.Texture(img);
// img.src = 'rb.png';
// img.onload = () => {
//     texture.needsUpdate = true;
//     console.log(texture)
// }

// Textures Loading - better way
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log('started')
}

loadingManager.onProgress = () => {
    console.log('in progress')
}

loadingManager.onLoad = () => {
    console.log('loaded..')
}

loadingManager.onError = () => {
    console.log('on error')
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('./rb.png')
const color_texture = textureLoader.load('./textures/color_texture.webp')
const alpha_texture = textureLoader.load('./textures/alpha_texture.webp');
const person_texture = textureLoader.load('./textures/person1.jpg');


// texture.repeat.x = 2;
// texture.repeat.y = 2;

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

//shifts the texture
// texture.offset.x = 0.5
// texture.offset.y = 0.5

// texture.rotation = Math.PI * 0.25

// texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// the last 3 parameters control the no. of triangles (details) on the material
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
// const geometry = new THREE.SphereGeometry(1, 32, 32);

const material = new THREE.MeshBasicMaterial({ map: texture })


const cube = new THREE.Mesh(
    geometry,
    material
)
scene.add(cube)

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1.2
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

renderer.render(scene, camera)



// const mouse = {
//     x: 0,
//     y: 0,
// }


// ANIMATE
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


// window.addEventListener('mousemove', (e) => {
//     mouse.x = e.clientX / sizes.width - 0.5;
//     mouse.y = e.clientY / sizes.height - 0.5;

// })