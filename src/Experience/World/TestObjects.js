import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience'
import Physics from '../Utils/Physics'

export default class TestObjects
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.physics = new Physics()
        this.world = this.physics.world
        this.objectsToUpdate = []
        this.setObjects()
        
    }

    setObjects()
    {
        //mesh
        this.geometry = new THREE.SphereGeometry(1)
        this.geometry2 = new THREE.BoxGeometry(2, 2, 2)
        this.material = new THREE.MeshBasicMaterial({color: 0x00ffff})
        
        
        //physics
        this.objShape = new CANNON.Sphere(1)
        this.objShape2 = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
        this.createObjs = () => {
            for(let i=0; i <= 25; i++)
            {
                //mesh
                this.mesh = new THREE.Mesh(
                    this.geometry,
                    this.material
                )
                this.mesh2 = new THREE.Mesh(
                    this.geometry2,
                    this.material
                )
                this.mesh.position.set(
                    Math.random() * 10,
                    30 + Math.random() + i * 2,
                    Math.random() * 10
                )

                this.mesh2.position.set(
                    Math.random() * 10,
                    30 + Math.random() + i * 2,
                    Math.random() * 10
                    
                )
                this.mesh2.add(
                    new THREE.LineSegments(
                        this.geometry2, 
                        new THREE.MeshStandardMaterial({
                            color: 0xff0000,
                            wireframe: true
                        })
                    )
                )
                //this.scene.add(this.mesh)
                this.scene.add(this.mesh2)
                //this.mesh.castShadow = true

                // //physics
                // this.objBody = new CANNON.Body
                // ({
                //     mass: 0.25,
                //     material: this.physics.defaultMaterial
                // })
                // this.objBody.addShape(this.objShape)
                // this.objBody.position.copy(this.mesh.position)
                // this.physics.world.addBody(this.objBody)
                // this.objBody.allowSleep = true

                // this.objectsToUpdate.push
                // ({
                //     mesh: this.mesh,
                //     body: this.objBody
                // })

                this.objBody2 = new CANNON.Body
                ({
                    mass: 0.25,
                    material: this.physics.defaultMaterial
                })
                this.objBody2.addShape(this.objShape2)
                this.objBody2.position.copy(this.mesh2.position)
                this.physics.world.addBody(this.objBody2)
                this.objBody2.allowSleep = true

                this.objectsToUpdate.push
                ({
                    mesh: this.mesh2,
                    body: this.objBody2
                })
            }
        }
        this.createObjs()
        this.debugTestObjects()
    }

    debugTestObjects()
    {
        const obj = {
            scene: this.scene,
            geometry: this.geometry,
            material: this.material,
            physics: this.physics,
            objsToUpdate: this.objectsToUpdate,
            objShape: this.objShape,
            myFunction: function(){
                // console.log('here')
                // console.log(this.geometry)
                // console.log(this.physics)
                // console.log(this.objsToUpdate)
                for(let i=0; i <= 8; i++)
                {
                    //mesh
                    this.mesh = new THREE.Mesh(
                        this.geometry,
                        this.material
                    )
                    this.mesh.position.set(
                        Math.random(),
                        1 + Math.random() + i,
                        Math.random()
                    )
                    this.scene.add(this.mesh)
                    this.mesh.add(
                        new THREE.LineSegments(
                            this.geometry, 
                            new THREE.MeshStandardMaterial({
                                color: 0xff0000,
                                wireframe: true
                            })
                        )
                    )
                    //this.mesh.castShadow = true

                    //physics
                    this.objBody = new CANNON.Body
                    ({
                        mass: 0.25,
                        material: this.physics.defaultMaterial
                    })
                    this.objBody.addShape(this.objShape)
                    this.objBody.position.copy(this.mesh.position)
                    this.physics.world.addBody(this.objBody)
                    this.objBody.allowSleep = true
                    this.objBody.sleepSpeedLimit = 0.05
                    this.objBody.sleepTimeLimit = 1

                    this.objsToUpdate.push
                    ({
                        mesh: this.mesh,
                        body: this.objBody
                    })
                }
            }
        }
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Test Objects')
            this.debugFolder.add(
                obj,
                'myFunction'
            )
            .name('Add objects')
        }
    }

    update()
    {
        for(this.obj of this.objectsToUpdate)
        {
            this.obj.mesh.position.copy(this.obj.body.position)
            this.obj.mesh.quaternion.copy(this.obj.body.quaternion)
        }   
    }
}