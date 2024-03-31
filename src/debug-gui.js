import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from "lil-gui";
import gsap from 'gsap';



//Debug
const gui = new lil.GUI();

const store = {
    color: '#ffff00',
    spin: () => {
        gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + 10 })
    }
}

/**
 * Sizes
 */

const sizes = {
    width: 600,
    height: 400,
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// the last 3 parameters control the no. of triangles (details) on the material

const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: store.color })

const cube = new THREE.Mesh(
    geometry,
    material
)
scene.add(cube)


// Debug gui
gui.add(cube.position, 'y')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('elevation')

gui.add(cube.position, 'z')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('zoom')

gui.add(cube, 'visible');

gui.add(material, 'wireframe');

gui.addColor(material, 'color');

gui.add(store, 'spin');
// gui.add(cube, 'color')
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