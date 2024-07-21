import { Scene, Mesh, SphereGeometry, MeshStandardMaterial, AmbientLight, DirectionalLight, PerspectiveCamera, WebGLRenderer, AxesHelper, PlaneGeometry, Group, BoxGeometry, Vector3, ConeGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = (document.querySelector('canvas.webgl') || document.createElement('canvas.webgl')) as HTMLCanvasElement

// Scene
const scene = new Scene();

// Axes helper
const axesHelper = new AxesHelper(5);
scene.add(axesHelper);

/**
 * House
 */
// Floor
const floorDimensions = {
  width: 20,
  height: 20
}
const floor = new Mesh(
  new PlaneGeometry(floorDimensions.width, floorDimensions.height),
  new MeshStandardMaterial()
);
floor.rotation.x = - Math.PI * 0.5
scene.add(floor);

// House container
const house = new Group();
scene.add(house);

// Walls
const wallsDimensions = {
  width: 4,
  height: 2.5,
  depth: 4
}
const walls = new Mesh(
  new BoxGeometry(wallsDimensions.width, wallsDimensions.height, wallsDimensions.depth),
  new MeshStandardMaterial()
);
walls.position.y = wallsDimensions.height / 2;
house.add(walls);

// Roof
const roofDimensions = {
  radius: 3.5,
  height: 1.5,
}
const roof = new Mesh(
  new ConeGeometry(roofDimensions.radius, roofDimensions.height, 4),
  new MeshStandardMaterial()
);
roof.position.y = wallsDimensions.height + roofDimensions.height / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const doorDimensions = {
  width: 2.2,
  height: 2.2
}
const door = new Mesh(
  new PlaneGeometry(doorDimensions.width, doorDimensions.height),
  new MeshStandardMaterial({ color: '#ff0000' })
);
door.position.y = doorDimensions.height / 2;
door.position.z = wallsDimensions.depth / 2 + 0.01;
house.add(door);

/**
 * Lights
 */
// Ambient light
const ambientLight = new AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const cameraPosition = new Vector3(4, 2, 5);
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.copy(cameraPosition);
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
  // Timer
  timer.update()
  const elapsedTime = timer.getElapsed()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()