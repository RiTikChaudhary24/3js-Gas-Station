import * as THREE from "three";
import { OrbitControls, ThreeMFLoader } from "three/examples/jsm/Addons.js";
import { Sky } from "three/examples/jsm/Addons.js";

const textureLoader = new THREE.TextureLoader();

const floorARM = textureLoader.load("/textures/hangar_concrete_floor_arm_1k.jpg")
const floorDiff = textureLoader.load("/textures/hangar_concrete_floor_diff_1k.jpg")
const floorDisplacement = textureLoader.load("/textures/hangar_concrete_floor_disp_1k.jpg")
const floorNormal = textureLoader.load("/textures/hangar_concrete_floor_nor_gl_1k.jpg")

const roofARM = textureLoader.load("/textures/concrete_tile_facade_arm_1k.jpg")
const roofDiff = textureLoader.load("/textures/concrete_tile_facade_diff_1k.jpg")
const roofDisplacement = textureLoader.load("/textures/concrete_tile_facade_disp_1k.jpg")
const roofNormal = textureLoader.load("/textures/concrete_tile_facade_nor_dx_1k.jpg")

const roofLightARM = textureLoader.load("/textures/terry_cloth_arm_1k.jpg")
const roofLightDiff = textureLoader.load("/textures/terry_cloth_diff_1k.jpg")
const roofLightDisplacement = textureLoader.load("/textures/terry_cloth_disp_1k.jpg")
const roofLightNormal = textureLoader.load("/textures/terry_cloth_nor_gl_1k.jpg")

const pillerARM = textureLoader.load("/textures/velour_velvet_arm_1k.jpg")
const pillerDiff = textureLoader.load("/textures/velour_velvet_diff_1k.jpg")
const pillerDisplacement = textureLoader.load("/textures/velour_velvet_disp_1k.jpg")
const pillerNormal = textureLoader.load("/textures/velour_velvet_nor_dx_1k.jpg")

const boxARM = textureLoader.load("/textures/waffle_pique_cotton_arm_1k.jpg")
const boxDiff = textureLoader.load("/textures/waffle_pique_cotton_diff_1k.jpg")
const boxDisplacement = textureLoader.load("/textures/waffle_pique_cotton_disp_1k.jpg")
const boxNormal = textureLoader.load("/textures/waffle_pique_cotton_nor_dx_1k.jpg")

const boxTopARM = textureLoader.load("/textures/plank_flooring_04_arm_1k.jpg")
const boxTopDiff = textureLoader.load("/textures/plank_flooring_04_diff_1k.jpg")
const boxTopDisplacement = textureLoader.load("/textures/plank_flooring_04_disp_1k.jpg")
const boxTopNormal = textureLoader.load("/textures/plank_flooring_04_nor_dx_1k.jpg")

boxDiff.colorSpace = THREE.SRGBColorSpace;

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x1a2238, 0.03);

const sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky);

const uniforms = sky.material.uniforms;

// Make sky darker & colder
uniforms['turbidity'].value = 2;      
uniforms['rayleigh'].value = 0.2;     
uniforms['mieCoefficient'].value = 0.001;
uniforms['mieDirectionalG'].value = 0.9;

// Put sun well below horizon
const sun = new THREE.Vector3();
const phi = THREE.MathUtils.degToRad(90 + 10); // BELOW horizon
const theta = THREE.MathUtils.degToRad(180);

sun.setFromSphericalCoords(1, phi, theta);
uniforms['sunPosition'].value.copy(sun);


const ambient = new THREE.AmbientLight(0x1a233a, 0.25);
scene.add(ambient);

const ambientLight = new THREE.AmbientLight(0xffffff ,0.5 )
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x9bbcff,2)
directionalLight.position.set(0,10,10);
scene.add(directionalLight)

const boxLight = new THREE.PointLight(0xffb84d,20);
boxLight.position.y += 1.8
boxLight.position.x += 2
boxLight.position.z += 1
scene.add(boxLight)

const boxLight2 = new THREE.PointLight(0xffb84d,20);
boxLight2.position.y += 1.8
boxLight2.position.x -= 2
boxLight2.position.z = 1
scene.add(boxLight2)

const topLight1 = new THREE.PointLight(0xffffff,15);
topLight1.position.y += 6
topLight1.position.x += 4
topLight1.position.z += 3
scene.add(topLight1)

const topLight2 = new THREE.PointLight(0xffffff,15);
topLight2.position.y += 6
topLight2.position.x -= 4
topLight2.position.z -= 3
scene.add(topLight2)

const topLight3 = new THREE.PointLight(0xffffff,15);
topLight3.position.y += 6
topLight3.position.x += 4
topLight3.position.z -= 3
scene.add(topLight3)

const topLight4 = new THREE.PointLight(0xffffff,15);
topLight4.position.y += 6
topLight4.position.x -= 4
topLight4.position.z += 3
scene.add(topLight4)

floorDiff.colorSpace = THREE.SRGBColorSpace;

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30,30),
    new THREE.MeshStandardMaterial({
        roughnessMap: floorARM,
        map: floorDiff,
        metalnessMap: floorARM,
        aoMap: floorARM,
        displacementMap : floorDisplacement,
        normalMap: floorNormal
    })
)
floor.rotation.x = -Math.PI / 2
floor.position.y -= 0.8
scene.add(floor);





// const appartment1 = new THREE.Group();
// scene.add(appartment1);

// const gFloor = new THREE.Mesh(
    //     new THREE.BoxGeometry(9,3,5),
    //     new THREE.MeshBasicMaterial({color: "white"})
    // )
    // appartment1.add(gFloor)
    
    // const firstFloor = new THREE.Mesh(
        //     new THREE.BoxGeometry(9,3,6),
        //     new THREE.MeshBasicMaterial({color: "pink"})
        // )
        // firstFloor.position.y += 3 
        // firstFloor.position.z = 0.5 
        
        // appartment1.add(firstFloor);
        
        // const firstPlane = new THREE.Mesh(
            //     new THREE.BoxGeometry(9.5,0.3,6.5),
            //     new THREE.MeshBasicMaterial({color: "red"})
            // )
            // firstPlane.position.y += 4.5 
            // firstPlane.position.z = 0.5 
            
            // appartment1.add(firstPlane);
            
            
            // appartment1.position.y += 1.5 
            // appartment1.position.z -= 4  
            // appartment1.position.x = 3  
            
const station = new THREE.Group();
    scene.add(station);
            
    const piller = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4,0.4,7),
    new THREE.MeshStandardMaterial({
        map: pillerDiff,
        aoMap: pillerARM,
        roughnessMap: pillerARM,
        metalnessMap: pillerARM,
        displacementMap: pillerDisplacement,
        displacementScale: 0.5,
        normalMap: pillerNormal
        })
    )
        pillerDiff.colorSpace = THREE.SRGBColorSpace;
        piller.position.y += 3.5
        piller.rotateY(Math.PI)
        station.add(piller)
        
const roofLight = new THREE.Mesh(
        new THREE.BoxGeometry(12.5,0.3,10.5),
        new THREE.MeshStandardMaterial({
            aoMap: roofLightARM,
            roughnessMap: roofLightARM,
            metalnessMap: roofLightARM,
            map: roofLightDiff,
            displacementMap: roofLightDiff,
            displacementScale: 0
            })
        )
    roofLight.position.y += 7
    station.add(roofLight);
    
    roofLight.colorSpace = THREE.SRGBColorSpace;


const roof = new THREE.Mesh(
    new THREE.BoxGeometry(12,1,10,1000,100,1000),
    new THREE.MeshStandardMaterial({
        aoMap: roofARM,
        roughnessMap: roofARM,
        metalnessMap: roofARM,
        map: roofDiff,
        displacementMap: roofDiff,
        displacementScale: 0
    })
)

roofDiff.SRGBColorSpace = THREE.SRGBColorSpace;
roof.position.y += 7.4
station.add(roof);

const pump1 = new THREE.Group();
scene.add(pump1);


const boxPlatform = new THREE.Mesh(
    new THREE.BoxGeometry(2.7,0.5,2.7),
    new THREE.MeshStandardMaterial({
        aoMap: roofARM,
        roughnessMap: roofARM,
        metalnessMap: roofARM,
        map: roofDiff,
        displacementMap: roofDiff,
        displacementScale: 0
    })
)
pump1.add(boxPlatform)
boxPlatform.position.x += 6
boxPlatform.position.y += 0.25


const box = new THREE.Mesh(
    new THREE.BoxGeometry(2.5,4.5,2.5),
    new THREE.MeshStandardMaterial({
        map:boxTopDiff,
        aoMap: boxTopARM,
        roughnessMap: boxTopARM,
        metalnessMap: boxTopARM,
        // displacementMap: boxDisplacement,
        normalMap: boxTopNormal
    })
)

boxDiff.colorSpace = THREE.SRGBColorSpace;

box.position.y += 2.25
box.position.x += 6

pump1.add(box)

const boxtop = new THREE.Mesh(
    new THREE.BoxGeometry(3.2,0.15,3.2),
    new THREE.MeshStandardMaterial({
        roughnessMap: floorARM,
        map: floorDiff,
        metalnessMap: floorARM,
        aoMap: floorARM,
        // displacementMap : floorDisplacement,
        normalMap: floorNormal
    })
)


boxtop.position.x += 6
pump1.add(boxtop)

boxtop.position.y += 4.575 

//---------------------
const pump2 = new THREE.Group();
scene.add(pump2);

const boxPlatform1 = new THREE.Mesh(
    new THREE.BoxGeometry(2.7,0.5,2.7),
    new THREE.MeshStandardMaterial({
        aoMap: roofARM,
        roughnessMap: roofARM,
        metalnessMap: roofARM,
        map: roofDiff,
        displacementMap: roofDiff,
        displacementScale: 0
    })
)
pump2.add(boxPlatform1)
boxPlatform1.position.x -= 6
boxPlatform1.position.y += 0.25


const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(2.5,4.5,2.5),
    new THREE.MeshStandardMaterial({
        map:boxTopDiff,
        aoMap: boxTopARM,
        roughnessMap: boxTopARM,
        metalnessMap: boxTopARM,
        // displacementMap: boxDisplacement,
        normalMap: boxTopNormal
    })
)

box1.position.y += 2.25
box1.position.x -= 6

pump2.add(box1)

const boxtop1 = new THREE.Mesh(
    new THREE.BoxGeometry(3.2,0.15,3.2),
    new THREE.MeshStandardMaterial({
        roughnessMap: floorARM,
        map: floorDiff,
        metalnessMap: floorARM,
        aoMap: floorARM,
        // displacementMap : floorDisplacement,
        normalMap: floorNormal
    })
)


boxtop1.position.x -= 6
pump2.add(boxtop1)

boxtop1.position.y += 4.575 

const trashCan1 = new THREE.Mesh(
    new THREE.BoxGeometry(2,3,2 ),
    new THREE.MeshStandardMaterial({
        map:boxDiff,
        aoMap: boxARM,
        roughnessMap: boxARM,
        metalnessMap: boxARM,
        // displacementMap: boxDisplacement,
        normalMap: boxNormal
    })
)
trashCan1.position.y += 1.5;
trashCan1.position.x += 2;

scene.add(trashCan1)

const trashCan2 = new THREE.Mesh(
    new THREE.BoxGeometry(2,3,2 ),
    new THREE.MeshStandardMaterial({
        map:boxDiff,
        aoMap: boxARM,
        roughnessMap: boxARM,
        metalnessMap: boxARM,
        // displacementMap: boxDisplacement,
        normalMap: boxNormal
    })
)
trashCan2.position.y += 1.5;
trashCan2.position.x -= 2;

scene.add(trashCan2)

const size = {
    width : window.innerWidth,
    height : window.innerHeight
}

window.addEventListener("resize",()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix()

    rendrer.setSize(size.width,size.height);
    rendrer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
})

const camera = new THREE.PerspectiveCamera(75,size.width/size.height,1,1000);
camera.position.set(15,8,12);

scene.add(camera);

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const rendrer = new THREE.WebGLRenderer({
    canvas
});

rendrer.shadowMap.enabled = true
rendrer.shadowMap.type = THREE.PCFShadowMap

directionalLight.castShadow = true;
topLight1.castShadow = true
topLight2.castShadow = true
topLight3.castShadow = true
topLight4.castShadow = true

boxLight.castShadow = false;
boxLight2.castShadow = false

floor.receiveShadow = true
roof.receiveShadow = true

rendrer.setSize(size.width,size.height);

const timer = new THREE.Timer();
timer.connect(document)

const tick = ()=>{
    timer.update();
    const timeElapsed = timer.getElapsed();
    // console.log(timeElapsed)
    controls.update()
    

    rendrer.render(scene,camera);
    window.requestAnimationFrame(tick)
}

tick()