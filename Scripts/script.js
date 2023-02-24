var container, stats, canvas;

var camera, controls, scene, renderer;

var sphere;

let sphereTex;
let sphereMat;

var asciiRenderer;

var moon = false;
var mars = false;
var earth = true;
var nasa = false;

var charSet =
  "0100011001101111011100100010000001000111011011110" +
  "1100100001000000111001101101111001000000110110001" +
  "1011110111011001100101011001000010000001110100011" +
  "0100001100101001000000111011101101111011100100110" +
  "1100011001000010000001110100011010000110000101110" +
  "1000010000001101000011001010010000001100111011000" +
  "0101110110011001010010000001101000011010010111001" +
  "1001000000110111101101110011001010010000001100001" +
  "0110111001100100001000000110111101101110011011000" +
  "1111001001000000101001101101111011011100010110000" +
  "1000000111010001101000011000010111010000100000011" +
  "1011101101000011011110110010101110110011001010111" +
  "0010001000000110001001100101011011000110100101100" +
  "1010111011001100101011100110010000001101001011011" +
  "1000100000011010000110100101101101001000000111001" +
  "1011010000110000101101100011011000010000001101110" +
  "0110111101110100001000000111000001100101011100100" +
  "1101001011100110110100000100000011000100111010101" +
  "1101000010000001101000011000010111011001100101001" +
  "0000001100101011101000110010101110010011011100110" +
  "0001011011000010000001101100011010010110011001100" +
  "10100100000";

var texture =
  "https://raw.githubusercontent.com/DeoVolenteGames/ascii-renderer/master/earth.jpg";

var useOrthoCam = false;

var start = Date.now();

function init() {
  container = document.querySelector(".containerWorld");

  var width = container.clientWidth || 2;
  var height = container.clientWidth || 2;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0xffffff, 0); // second param is opacity, 0 => transparent

  // This step is important, the renderer must have a parent
  container.appendChild(renderer.domElement);

  asciiRenderer = new AsciiRenderer(renderer, {
    charSet: charSet,
    fontSize: 12,
    opacity: 1,
  });

  if (useOrthoCam) {
    camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
  } else {
    camera = new THREE.PerspectiveCamera(25, width / height, 1, 1000);
  }
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.background = null;

  var sunlight = new THREE.DirectionalLight(0xffffff, 1.5);
  sunlight.position.set(1, 0, 1);
  scene.add(sunlight);

  sphereTex = new THREE.TextureLoader().load(texture);
  sphereTex.magFilter = THREE.NearestFilter;
  sphereTex.minFilter = THREE.NearestFilter;
  sphereMat = new THREE.MeshToonMaterial({
    color: 0xffffff,
    shininess: 0,
    reflectivity: 0,
  });

  sphereMat.map = sphereTex;
  sphereMat.needsUpdate = true;

  sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(200, 20, 10),
    sphereMat
  );
  scene.add(sphere);

  controls = new THREE.OrbitControls(camera, container);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.rotateSpeed = 0.05;
  controls.autoRotateSpeed = 0.05;
  controls.maxAzimuthAngle = (Math.PI * 3) / 4;
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.update();

  window.addEventListener("resize", onWindowResize, false);
  // change the rotation based on mouse position
  window.addEventListener("mousemove", onMouseMove, false);
  onWindowResize();
}

function onWindowResize() {
  var width = container.clientWidth;
  var height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  asciiRenderer.setSize(width, height);
}

function onMouseMove(event) {
  var width = container.clientWidth;
  var height = container.clientHeight;

  var x = event.clientX - width / 2;
  var y = event.clientY - height / 2;

  sphere.rotation.y = ((x / width) * 2 * Math.PI) / 8;
  sphere.rotation.x = ((y / height) * 2 * Math.PI) / 20;
}

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  var timer = Date.now() - start;
  // sphere.rotation.y = timer * 0.0002;
  controls.update();
  renderer.render(scene, camera);
}

function setMoon() {
  moon = !moon;

  console.log("moon: " + moon);

  texture = moon
    ? "https://th.bing.com/th/id/OIP.lC8RV5Xf6PSWNJ06ZTbfggHaEK?pid=ImgDet&rs=1"
    : "https://raw.githubusercontent.com/DeoVolenteGames/ascii-renderer/master/earth.jpg";

  relaodSphere();
}

function setMars() {
  mars = !mars;

  texture = mars
    ? "https://th.bing.com/th/id/R.fbed4c99b35a829b51f808257b36dc0d?rik=psCSXVCwwwsmaA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-6lD6Rg9F4UM%2fUIZobnHTKjI%2fAAAAAAAAC7M%2fMycqFjKENgc%2fw1200-h630-p-k-nu%2f20120715_Broome_175.jpg&ehk=v3aKgCSHDIY48Gx1C3%2b%2bpvwY%2fb3ZejmNCPcMdKu1EBg%3d&risl=&pid=ImgRaw&r=0"
    : "https://raw.githubusercontent.com/DeoVolenteGames/ascii-renderer/master/earth.jpg";

  relaodSphere();
}

function setNasaTexture() {
  nasa = !nasa;

  texture = nasa
    ? "https://previews.123rf.com/images/sakkmesterke/sakkmesterke1709/sakkmesterke170900024/85363866-frozen-planet-texture-panorama-360-degrees-computer-generated-abstract-background-3d-rendering.jpg"
    : "https://raw.githubusercontent.com/DeoVolenteGames/ascii-renderer/master/earth.jpg";

  relaodSphere();
}

function relaodSphere() {
  scene.remove(sphere);

  sphereTex = new THREE.TextureLoader().load(texture);
  sphereTex.magFilter = THREE.NearestFilter;
  sphereTex.minFilter = THREE.NearestFilter;
  sphereMat = new THREE.MeshToonMaterial({
    map: sphereTex,
    color: 0xffffff,
    shininess: 0,
    reflectivity: 0,
  });

  sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(200, 20, 10),
    sphereMat
  );
  scene.add(sphere); // moon = !moon;
}
