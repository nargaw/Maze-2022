import Experience from "../Experience.js";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Physics from '../Utils/Physics'

export default class Ground
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = new Physics()
        this.world = this.physics.world
        this.setGround()
    }

    setGround()
    {
        //set mesh
        this.groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(50000, 50000, 20, 20),
            new THREE.MeshStandardMaterial(
                {
                    color: 0x1f1f1f,
                    side: THREE.DoubleSide
                }
            )
        )
        this.groundMesh.rotation.x = -Math.PI * 0.5
        this.scene.add(this.groundMesh)
        this.groundMesh.receiveShadow = true

        //set physics
        this.groundMaterial = new CANNON.Material('ground')
        this.groundMaterial.friction = 1
        //console.log(this.groundMaterial)
        this.groundShape = new CANNON.Plane()
        this.groundBody = new CANNON.Body(
            {
                mass: 0,
                material: this.physics.defaultMaterial
            }
        )
        this.groundBody.addShape(new CANNON.Plane())
        this.groundBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI * 0.5
        )
        this.world.addBody(this.groundBody)
    }
}