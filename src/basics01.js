import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
/*
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

*/

/* changing the position of an object
mesh.position.x = 0.8;
mesh.position.y = 0.600000001;
mesh.position.z = 1;

*/

// same as above 
//mesh.position.set(0,0,-3);

// finding the distance from the center of the scene
// and the object's current position
//console.log(mesh.position.length())

// noramlizes the position vector so that
// mesh.position.length() is 1.
//mesh.position.normalize();

/* scaling object
mesh.scale.x = 1.5;
mesh.scale.y = 0.5;
mesh.scale.z = 1;
//mesh.scale.set(1.5, 0.5, 1)
*/

// Rotating objects
/*
mesh.rotation.x = 1
mesh.rotation.y = 1;
mesh.rotation.z = Math.PI / 2;
*/
//mesh.rotation.set(0,1,1)

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

//-------------------
//creating groups

const group  = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial({color: 0xff0000})
)

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial({color: 0x00ff00})
)

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial({color: 0x0000ff})
)

cube2.position.x = 1.2;
cube2.position.y = 1.2;


cube3.position.x = -1.2;
cube3.position.y = -1.2;

group.add(cube1)
group.add(cube2)
group.add(cube3)

group.rotation.z = (Math.PI / 4) * 7;

//---------------------------------------------------------
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

/*
camera.position.x = 1
camera.position.y = 1
*/
camera.position.z = 3


//camera.lookAt(mesh.position)
scene.add(camera)

// finding the distance from the object  
// to the camera
//console.log(mesh.position.distanceTo(camera.position))
//scene.add(mesh)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)