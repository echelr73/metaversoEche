// Creating the main cube texture
var wallTexture = new THREE.TextureLoader().load('/textures/brick-wall.jpg');
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1, 1);

// Creating the main cube material
var wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });

// Creating the wood cube texture
var woodTexture = new THREE.TextureLoader().load('/textures/valla.jpg');
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(1, 1);

// Creating the wood cube material
var woodMaterial = new THREE.MeshLambertMaterial({ map: woodTexture });

// Creating the roof texture
var roofTexture = new THREE.TextureLoader().load('/textures/cucurucho3.jpg');
roofTexture.wrapS = THREE.RepeatWrapping;
roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(1, -1);

// Creating the roof material
var roofMaterial = new THREE.MeshLambertMaterial({ map: roofTexture });

// Creating the ice cream texture
var iceCreamTexture = new THREE.TextureLoader().load('/textures/helado.jpg');
iceCreamTexture.wrapS = THREE.RepeatWrapping;
iceCreamTexture.wrapT = THREE.RepeatWrapping;
iceCreamTexture.repeat.set(0.8, 0.8);

// Creating the ice cream material
var iceCreamMaterial = new THREE.MeshLambertMaterial({ map: iceCreamTexture });

// Creating the grass texture
var grassTexture = new THREE.TextureLoader().load('/textures/grass.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(4, 4);

// Creating the grass material
var grassMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });

// Creating the tribune texture
var tribuneTexture = new THREE.TextureLoader().load('/textures/tribuna.jpg');
tribuneTexture.wrapS = THREE.RepeatWrapping;
tribuneTexture.wrapT = THREE.RepeatWrapping;
tribuneTexture.repeat.set(0.5, 0.5);

// Creating the tribune material
var tribuneMaterial = new THREE.MeshLambertMaterial({ map: tribuneTexture });

// Creating the default material
var defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x000101 });

// Exporting materials and textures
export {
    wallMaterial,
    woodMaterial,
    roofMaterial,
    iceCreamMaterial,
    grassMaterial,
    tribuneMaterial,
    defaultMaterial,
    wallTexture,
    woodTexture,
    roofTexture,
    iceCreamTexture,
    grassTexture,
    tribuneTexture
};

// Mapping materials with their corresponding names
export const materialElement = {
    "wallMaterial": wallMaterial,
    "woodMaterial": woodMaterial,
    "roofMaterial": roofMaterial,
    "iceCreamMaterial": iceCreamMaterial,
    "grassMaterial": grassMaterial,
    "tribuneMaterial": tribuneMaterial
};

// Mapping textures with their corresponding names
export const textureElement = {
    "wallMaterial": "/textures/brick-wall.jpg",
    "woodMaterial": "/textures/valla.jpg",
    "roofMaterial": "/textures/cucurucho3.jpg",
    "iceCreamMaterial": "/textures/helado.jpg",
    "grassMaterial": "/textures/grass.jpg",
    "tribuneMaterial": "/textures/tribuna.jpg"
};

export function createBuild(building) {
    // Representing NFT Tokens as boxes
    const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
    var materialBuilding = materialElement[building.material];
    var repeatH = building.h <= 9 ? 1 : building.h / 10;
    var repeatW = building.w <= 9 ? 1 : building.w / 10;
    var textureBuilding = new THREE.TextureLoader().load(textureElement[building.material]);
    textureBuilding.wrapS = THREE.RepeatWrapping;
    textureBuilding.wrapT = THREE.RepeatWrapping;
    textureBuilding.repeat.set(repeatW, repeatH);
    const materialNew = new THREE.MeshLambertMaterial({ map: textureBuilding });
    materialBuilding = materialNew;
    const nft = new THREE.Mesh(boxGeometry, materialBuilding);
    nft.position.set(building.x, building.y, building.z);
    return nft;
}

export function createWall(building) {
    // Representing NFT Tokens as boxes
    const geometry = new THREE.PlaneGeometry(building.w, building.h);
    var materialBuilding = materialElement[building.material];
    var repeatH = building.h <= 9 ? 1 : building.h / 10;
    var repeatW = building.w <= 9 ? 1 : building.w / 10;
    var textureBuilding = new THREE.TextureLoader().load(textureElement[building.material]);
    textureBuilding.wrapS = THREE.RepeatWrapping;
    textureBuilding.wrapT = THREE.RepeatWrapping;
    textureBuilding.repeat.set(repeatW, repeatH);
    const materialNew = new THREE.MeshLambertMaterial({ map: textureBuilding });
    materialBuilding = materialNew;
    const wall = new THREE.Mesh(geometry, materialBuilding);
    wall.position.set(building.x, building.y, building.z);
    return wall;
}
