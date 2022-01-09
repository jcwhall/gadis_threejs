import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import * as dat from 'lil-gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Font Loader
const loader = new FontLoader();
loader.load('fonts/Kanit-Black_Regular.json', function (font) {

    //Once font is loaded..
    
    //Create the materials, set colours
    const textMaterial = new THREE.MeshBasicMaterial();
    textMaterial.side = THREE.DoubleSide;
    textMaterial.color.setHex(0xFFE500);
    const textMaterial2 = new THREE.MeshBasicMaterial();
    textMaterial2.side = THREE.DoubleSide;
    textMaterial2.color.setHex(0xF29802);
    const textMaterial3 = new THREE.MeshBasicMaterial();
    textMaterial3.side = THREE.DoubleSide;
    textMaterial3.color.setHex(0xF0331F);
    const textMaterial4 = new THREE.MeshBasicMaterial();
    textMaterial4.side = THREE.DoubleSide;
    textMaterial4.color.setHex(0xB01D3A);

    //Message to display + font size
    const message = 'GADIS';
    const fontSize = 5;

    //Create the geometry of the text + center it
    const shapes = font.generateShapes(message, fontSize);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.center();

    //Create the text + add to scene + move position
    const text = new THREE.Mesh(geometry, textMaterial);
    scene.add(text);
    const text2 = new THREE.Mesh(geometry, textMaterial2);
    text2.position.set (-0.2, -0.2, -0.1);
    scene.add(text2);
    const text3 = new THREE.Mesh(geometry, textMaterial3);
    text3.position.set(-0.4, -0.4, -0.2);
    scene.add(text3);
    const text4 = new THREE.Mesh(geometry, textMaterial4);
    text4.position.set(-0.6, -0.6, -0.3);
    scene.add(text4);
});

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
//Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 10000)
//Move camera back a bit
camera.position.set(0, 0, 50);
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;
gui.add(controls,'autoRotate').name('Auto Rotate');
gui.close();

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//Set background colour
renderer.setClearColor(0x582D14);

//Animate
const tick = () => {

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()