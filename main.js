import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import Movements from './src/movements.js';
import blockchain from './src/Web3.js';
import abi from "./src/abi/abi.json" assert {type: "json"};
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { smart_contract_address } from "./src/contractparams";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { wallMaterial, woodMaterial, roofMaterial, iceCreamMaterial, defaultMaterial, materialElement, wallTexture, woodTexture, roofTexture, iceCreamTexture, textureElement, createBuild, createWall, grassMaterial } from './src/constants.js';
import { Texture } from 'three';

const toggleButton = document.getElementById("toggleForm");
const formContainer = document.getElementById("formContainer");
const infoButton = document.getElementById("infoButton");
const info = document.getElementById("info");

// Hide the gray overlay layer
document.getElementById('overlay').classList.add('d-none');
// Hide the spinner
document.getElementById('spinnerContainer').classList.add('d-none');

// Show info on hover
infoButton.addEventListener("mouseenter", () => {
  info.classList.remove("hidden");
});

info.addEventListener("mouseleave", () => {
  info.classList.add("hidden");
});

// Show form on hover
toggleButton.addEventListener("mouseenter", function () {
  formContainer.classList.remove("hidden");
});

formContainer.addEventListener("mouseleave", () => {
  formContainer.classList.add("hidden");
});

// Create a new scene with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera and renderer configuration
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 2);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Set up the scene lights
const ambient_light = new THREE.AmbientLight(0xbda355);
const direction_light = new THREE.DirectionalLight(0xffffff, 0.5);
ambient_light.add(direction_light);
scene.add(ambient_light);

// Set up a flat space in the Metaverse
const geometry_space = new THREE.BoxGeometry(150, 0.2, 150);
const material_space = new THREE.MeshPhongMaterial({ color: 0xffffff });
const space = new THREE.Mesh(geometry_space, grassMaterial);
scene.add(space);

// Create the back wall
const wallFrontal = createWall({
  w: 150,
  h: 75,
  x: 0,
  y: 37.5,
  z: -75,
  material: "wallMaterial"
});
scene.add(wallFrontal);

// Create the front wall
const wallPosterior = createWall({
  w: 150,
  h: 75,
  x: 0,
  y: 37.5,
  z: 75,
  material: "wallMaterial"
});
wallPosterior.rotation.y = Math.PI;
scene.add(wallPosterior);

// Create the left wall
const wallIzq = createWall({
  w: 150,
  h: 75,
  x: -75,
  y: 37.5,
  z: 0,
  material: "wallMaterial"
});
wallIzq.rotation.y = Math.PI / 2;
scene.add(wallIzq);

//Wall lateral Der
const wallDer = createWall({
  w: 150,
  h: 75,
  x: 75,
  y: 37.5,
  z: 0,
  material: "wallMaterial"
});
wallDer.rotation.y = (Math.PI / 2) * -1;
scene.add(wallDer);

window.addEventListener('resize', onWindowResize);

camera.position.set(10, 5, 40);

//ObjectTest
const testGeometry = new THREE.BoxGeometry(1, 1, 1);

const testElement = new THREE.Mesh(testGeometry, materialElement['roofMaterial']);
testElement.visible = false;
testElement.position.set(-1, -1, 0);
scene.add(testElement);
blink(true);

// Definir una función para hacer que el objeto parpadee
function blink() {
  testElement.visible = !testElement.visible; // Cambiar la propiedad visible de true a false y viceversa
  setTimeout(blink, 300); // Llamar a la función blink() después de 500 milisegundos (0.5 segundos)
}

function animate() {
  requestAnimationFrame(animate);

  //Movement to the left
  if (Movements.isPressed(65)) {
    camera.position.x -= 0.5;
  }
  //Upward movement
  if (Movements.isPressed(87)) {
    camera.position.x += 0.5;
    camera.position.z -= 0.5;
  }
  //Movement to the right
  if (Movements.isPressed(68)) {
    camera.position.x += 0.5;
  }
  //Downward movement
  if (Movements.isPressed(83)) {
    camera.position.x -= 0.5;
    camera.position.z += 0.5;
  }

  camera.lookAt(space.position);
  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

//Confirm NFT
const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', mintNFT);

//Create test
const buttonTestPosition = document.getElementById('testPosition');
buttonTestPosition.addEventListener('click', testPosition);

const myToast = new bootstrap.Toast(document.getElementById('liveToast'));
const textToast = document.getElementById('textToast');

function testPosition() {

  // Parameters to create a NFT in the Metaverse
  var nft_width = document.getElementById('nft_width').value != '' ? document.getElementById('nft_width').value : 0;
  var nft_height = document.getElementById('nft_height').value != '' ? document.getElementById('nft_height').value : 0;
  var nft_depth = document.getElementById('nft_depth').value != '' ? document.getElementById('nft_depth').value : 0;
  var nft_x = document.getElementById('nft_x').value != '' ? document.getElementById('nft_x').value : 0;
  var nft_y = document.getElementById('nft_y').value != '' ? document.getElementById('nft_y').value : 0;
  var nft_z = document.getElementById('nft_z').value != '' ? document.getElementById('nft_z').value : 0;
  var nft_material = document.getElementById('nft_material').value != '' ? document.getElementById('nft_material').value : 'roofMaterial';

  testElement.scale.x = parseInt(nft_width);
  testElement.scale.y = parseInt(nft_height);
  testElement.scale.z = parseInt(nft_depth);

  var repeatH = parseInt(nft_height) <= 9 ? 1 : parseInt(nft_height) / 10;
  var repeatW = parseInt(nft_width) <= 9 ? 1 : parseInt(nft_width) / 10;
  var textureBuilding = new THREE.TextureLoader().load(textureElement[nft_material]);
  textureBuilding.wrapS = THREE.RepeatWrapping;
  textureBuilding.wrapT = THREE.RepeatWrapping;
  textureBuilding.repeat.set(repeatW, repeatH);
  const materialNew = new THREE.MeshLambertMaterial({ map: textureBuilding });

  testElement.material = materialNew;
  testElement.position.set(parseInt(nft_x), parseInt(nft_y), parseInt(nft_z));
  testElement.visible = true;
}

function mintNFT() {
  // Ocultar la capa de fondo grisáceo
  document.getElementById('overlay').classList.remove('d-none');
  // Muestra el spinner
  document.getElementById('spinnerContainer').classList.remove('d-none');

  testElement.visible = false;

  // Parameters to create a NFT in the Metaverse
  var nft_name = document.getElementById('nft_name').value;
  var nft_width = document.getElementById('nft_width').value;
  var nft_height = document.getElementById('nft_height').value;
  var nft_depth = document.getElementById('nft_depth').value;
  var nft_x = document.getElementById('nft_x').value;
  var nft_y = document.getElementById('nft_y').value;
  var nft_z = document.getElementById('nft_z').value;
  var nft_material = document.getElementById('nft_material').value;

  // If Metamask is not available
  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask to use it!");
  }

  // Web3 Instance
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(abi, smart_contract_address);


  web3.eth.getAccounts().then((accounts) => {
    contract.methods.cost().call().then((cost_nft) => {
      contract.methods.mint(nft_name, parseInt(nft_width), parseInt(nft_height), parseInt(nft_depth), parseInt(nft_x), parseInt(nft_y), parseInt(nft_z), nft_material).send({ from: accounts[0], value: parseInt(cost_nft) }).then((data) => {
        // Ocultar la capa de fondo grisáceo
        document.getElementById('overlay').classList.add('d-none');
        // Ocultar spinner
        document.getElementById('spinnerContainer').classList.add('d-none');
        location.reload();
      });
    });
  });

};

const buttonExt = document.getElementById('extraction');
buttonExt.addEventListener('click', extraction);

function extraction() {
  document.getElementById('overlay').classList.remove('d-none');
  // Muestra el spinner
  document.getElementById('spinnerContainer').classList.remove('d-none');

  // If Metamask is not available
  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask to use it!");
  }

  // Web3 Instance
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(abi, smart_contract_address);

  web3.eth.getAccounts().then((accounts) => {
    contract.methods.withDraw().send({ from: accounts[0] }).then((data) => {
      // Ocultar la capa de fondo grisáceo
      document.getElementById('overlay').classList.add('d-none');
      // Ocultar spinner
      document.getElementById('spinnerContainer').classList.add('d-none');
      textToast.innerHTML = "Ethers extraction completed";
      myToast.show();
    });
  });

}

// Web3 connection to the data generated in the blockchain to be
// represented in the Metaverse
blockchain.then((result) => {

  result.building.forEach((building, index) => {
    // For each building paid for in the Smart Contract,
    // a graphical representation is made in the Metaverse
    if (index <= result.supply) {
      scene.add(createBuild(building));
    }
  });
});