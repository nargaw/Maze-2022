import * as THREE from 'three'
import Experience from '../Experience'
import * as CANNON from 'cannon-es'


export default class Buildings
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.physics = this.experience.physics
        this.world = this.physics.world
        this.setBuildingsGeometry()
        this.setBuildingsMaterial()
        this.setBuildingsMesh()
    }

    setBuildingsGeometry()
    {
        this.rand = 10 + Math.random() * 2.5
        this.buildingGeometry = new THREE.BoxGeometry(4, this.rand, 4)
    }
    
    setBuildingsMaterial()
    {
        this.buildingMaterial = new THREE.MeshBasicMaterial({
            color: 0x191919
        }) 
    }

    setBuildingsMesh()
    {
        for(let i = 0; i < 150; i++){
            const angle = Math.random() * Math.PI * 2
            const radius = 20 + Math.random() * 80
            this.x = Math.cos(angle) * radius * 5
            this.z = Math.sin(angle) * radius * 5

            this.buildingMesh = new THREE.Mesh(this.buildingGeometry, this.buildingMaterial)
            this.buildingMesh.position.set(this.x, this.rand/2, this.z)
            
            this.buildingMesh.add(
                new THREE.LineSegments(
                    this.buildingGeometry, 
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        wireframe: true
                    })
                )
            )
            this.buildingMesh.castShadow = false
            this.scene.add(this.buildingMesh)
            this.setPhysics()
        }
    }

    setPhysics()
    {
        this.buildingBody = new CANNON.Body({
            mass: 0,
            material: this.world.defaultMaterial
        })
        this.buildingShape = new CANNON.Box
        (
            new CANNON.Vec3(2, this.rand/2, 2)
        )
        this.buildingBody.addShape(this.buildingShape)
        this.buildingBody.position.set
        (
            this.x, this.rand/2, this.z
        )
        this.world.addBody(this.buildingBody)
    }

    
}