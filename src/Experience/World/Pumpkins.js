import Experience from "../Experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Pumpkins
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.world = this.physics.world
        this.resources = this.experience.resources
        

        this.textures()
        this.initPumpkins()
    }

    textures()
    {
        this.pumpkinColorTexture = this.resources.items.baseColor
        this.pumpkinAmbientOcclusionTexture = this.resources.items.ambientOcclusion
        this.pumpkinHeightTexture = this.resources.items.height
        this.pumpkinNormalTexture = this.resources.items.normal
        this.pumpkinRoughnessTexture = this.resources.items.roughness
    }

    initPumpkins()
    {
        this.pumpkinsToUpdate = []
        this.pumpkinGroup = new THREE.Group()
        
        this.scene.add(this.pumpkinGroup)  
        this.pumpkinGeometry = new THREE.TorusGeometry(1.25, 2.4, 14, 18, 6.3)
        this.pumpkinMaterial = new THREE.MeshStandardMaterial({ 
            map: this.pumpkinColorTexture,
            transparent: true,
            aoMap: this.pumpkinAmbientOcclusionTexture,
            displacementMap: this.pumpkinHeightTexture,
            displacementScale: 2,
            displacementBias: 1,
            normalMap: this.pumpkinNormalTexture,
            roughnessMap: this.pumpkinRoughnessTexture
            
        })

        
        this.pumpkinShape = new CANNON.Sphere(5)
        for (let i = 0; i <= 30; i++){
            this.angle = Math.random() * Math.PI * 2
            this.radius = 25 + Math.random() * 500
            this.x = Math.cos(this.angle) * this.radius
            this.z = Math.sin(this.angle) * this.radius

            this.pumpkin = new THREE.Mesh(this.pumpkinGeometry, this.pumpkinMaterial)
            
            
            this.pumpkinBody = new CANNON.Body({
                mass: 1,
                material: this.defaultMaterial,
                shape: this.pumpkinShape,
            })
            this.pumpkinBody.addShape(new CANNON.Box(new CANNON.Vec3(2.5, 5, 2.5)))
            this.pumpkinBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
            this.pumpkin.position.set(this.x, 100, this.z)
            this.pumpkin.rotation.x = -Math.PI * 0.5
            // this.pumpkin.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(this.pumpkin.geometry.attributes.uv.array, 2))

            this.pumpkinGroup.add(this.pumpkin)
            this.world.addBody(this.pumpkinBody)
            this.pumpkinBody.allowSleep = true
            this.pumpkinBody.position.copy(this.pumpkin.position)
            this.pumpkinsToUpdate.push({
                mesh: this.pumpkin,
                body: this.pumpkinBody
            })
            //this.pumpkinBody.sleepSpeedLimit = 0.005
            
        } 
    }

    update()
    {
        for(this.object of this.pumpkinsToUpdate){
            this.object.mesh.position.copy(this.object.body.position)
            this.object.mesh.quaternion.copy(this.object.body.quaternion)
        }
    }
}