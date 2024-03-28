import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

//-------------------

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
// cube.position.x = 2;
scene.add(cube)

//---------------------------------------------------------
/**
 * Sizes
 */
const sizes = {
    width: 500,
    height: 400
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)



// ANIMATE
const clock = new THREE.Clock();

const animate = () => {
    let elapsedTime = clock.getElapsedTime();
    cube.position.x = 1 * Math.sin(elapsedTime);
    cube.position.y = 1 * Math.cos(elapsedTime);
    cube.position.z = 2 * Math.cos(elapsedTime);


    // cube.rotation.z += 0.04;


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// animate();