import * as THREE from 'three'
import Experience from '../Experience.js'
export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.objectsToUpdate = this.experience.world.car.carPhysics.objectsToUpdate
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        this.setAmbientLight()
        //this.setSunLight()
        //this.setSunLightHelper()
        //this.setEnvironmentMap()
        //this.setFog()
    }

    setFog()
    {
        this.fog = new THREE.FogExp2(0xffffff, 0.00015)
        this.scene.fog = this.fog
    }
    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0x111111, 0.2)
        this.scene.add(this.ambientLight)
    }

    setSunLight(target)
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1)
        this.sunLight.castShadow = true
        this.value = 5
        this.sunLight.shadow.camera.far = 10
        this.sunLight.shadow.camera.top = this.value
        this.sunLight.shadow.camera.bottom = -this.value
        this.sunLight.shadow.camera.left = this.value
        this.sunLight.shadow.camera.right = -this.value
        //this.sunLight.shadow.camera.far = 200
        this.sunLight.shadow.mapSize.set(512, 512)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(10, 15, 0)
        this.scene.add(this.sunLight)
        this.scene.add(this.sunLight.target)
        this.sunLight.target = target
        this.pos = new THREE.Vector3()
        this.sv = new THREE.Object3D()
        this.lightAngle = new THREE.Vector3(0, 5, 4)
        this.sv.position.copy(this.lightAngle)
        this.scene.add(this.sv)
        this.sv.add(this.sunLight)
        this.offset = new THREE.Object3D()
        this.sv.add(this.offset)
        this.offset.position.set(10, 100, 0)

        //shadow helper
        //this.shadowHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        //this.scene.add(this.shadowHelper)
    }

    setSunLightHelper()
    {
        this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5)
        this.scene.add(this.sunLightHelper)
    }

    setWorldLight()
    {
        this.worldLight = new THREE.PointLight('#ffffff', 10.5)
        //this.worldLight.castShadow = true
        this.worldLight.shadow.camera.far = 300
        this.worldLight.shadow.camera.near = 0.01
        // this.worldLight.shadow.mapSize.set(1024, 1024)
        // this.worldLight.shadow.normalBias = 0.05
        this.worldLight.position.set(0, 50, 0)
        this.scene.add(this.worldLight)
        // this.value = 50
        // this.worldLight.shadow.camera.far = 10000
        // this.worldLight.shadow.camera.top = this.value
        // this.worldLight.shadow.camera.bottom = -this.value
        // this.worldLight.shadow.camera.left = this.value
        // this.worldLight.shadow.camera.right = -this.value


        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.worldLight, 'intensity')
                .name('worldLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            // this.debugFolder
            //     .add(this.worldLight.position, 'x')
            //     .name('worldLightX')
            //     .min(- 5)
            //     .max(5)
            //     .step(0.001)
            
            // this.debugFolder
            //     .add(this.worldLight.position, 'y')
            //     .name('worldLightY')
            //     .min(- 5)
            //     .max(5)
            //     .step(0.001)
            
            // this.debugFolder
            //     .add(this.worldLight.position, 'z')
            //     .name('worldLightZ')
            //     .min(- 5)
            //     .max(5)
            //     .step(0.001)
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }

    update(target){
        // console.log(target.position)
        // console.log(this.pos)
        this.pos.x = target.position.x
        this.pos.z = target.position.z
        this.sunLight.position.x = this.pos.x
        this.sunLight.position.z = this.pos.z
    }
}