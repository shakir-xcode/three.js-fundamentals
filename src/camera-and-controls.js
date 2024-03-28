import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Sizes
 */
const sizes = {
    width: 500,
    height: 400
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

//-------------------

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
// cube.position.x = 2;
scene.add(cube)

//---------------------------------------------------------

/**
 * Camera
 */
const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

/* 
* Orthographic camera
* in this mode, the size of the object stays same regardless of the distance from the camera;

const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
 */

// camera.position.x = 2
// camera.position.y = 2
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
renderer.render(scene, camera)



const mouse = {
    x: 0,
    y: 0,
}


// ANIMATE
const clock = new THREE.Clock();

const animate = () => {
    let elapsedTime = clock.getElapsedTime();

    // cube.rotation.y = elapsedTime;
    // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3;
    // camera.position.y = mouse.y * 7;
    // camera.position.z = - (Math.cos(mouse.x * Math.PI * 2)) * 3;
    // camera.lookAt(cube.position);


    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width - 0.5;
    mouse.y = e.clientY / sizes.height - 0.5;

})