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

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// the last 3 parameters control the no. of triangles (details) on the material
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);

// custom geometry

/**  random points
// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);
// for (let i = 0; i < count * 3 * 3; i++)
//     positionsArray[i] = (Math.random() - 0.5) * 2;
*/

// triangle 
const positionsArray = new Float32Array([
    0, 0, 0,    //x
    1, 0, 0,    //y
    0, 1, 0,    //z
]);

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const customGeometry = new THREE.BufferGeometry();
customGeometry.setAttribute('position', positionsAttribute);

const cube = new THREE.Mesh(
    customGeometry,
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
scene.add(cube)

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
    let elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width - 0.5;
    mouse.y = e.clientY / sizes.height - 0.5;

})