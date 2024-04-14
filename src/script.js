import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from "lil-gui";
import gsap from 'gsap';
import { Font, FontLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';


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
    width: window.innerWidth,
    height: window.innerHeight,
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');

/*
*   Fonts
*/
let textGeometry;

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    font => {
        textGeometry = new TextGeometry(
            'Shaker',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2,
            }
        )

        //Centering TEXT  OLD
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x * 0.5,
        //     - textGeometry.boundingBox.max.y * 0.5,
        //     - textGeometry.boundingBox.max.z * 0.5,
        // );

        //Centering TEXT NEW
        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text);

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

        for (let i = 0; i < 500; i++) {
            const donut = new THREE.Mesh(donutGeometry, material);
            scene.add(donut);

            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            donut.scale.set(scale, scale, scale)

        }

    }
);


/** Debug gui
 */

// gui.add(textGeometry, 'curveSegments')
//     .min(-1)
//     .max(20)
//     .step(1)
//     .name('curveSegment')

// gui.add(cube.position, 'z')
//     .min(-1)
//     .max(1)
//     .step(0.01)
//     .name('zoom')

// gui.add(cube, 'visible');

// gui.add(material, 'wireframe');

// gui.addColor(material, 'color');

// gui.add(store, 'spin');


// gui.add(cube, 'color')
/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 7
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

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    renderer.setSize(sizes.width, sizes.height)

})