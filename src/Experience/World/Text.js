import Experience from "../Experience";
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

export default class Text{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.world = this.physics.world
        this.objectsToUpdate = []
        this.text()
    }

    text()
    {
        this.fontLoader = new FontLoader()
        this.textGeometry = new TextGeometry()
        this.word = 'HAPPY'
        this.word2 = 'HALLOWEEN'
        this.fontLoader.load(
            './EricaOne.json',
            (font) => {
                this.textParameters = {
                    font: font,
                    size: 16.0,
                    height: 6,
                    curveSegments: 2,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            
               
                this.textGeometry = new TextGeometry(
                    this.word,
                    this.textParameters
                )
                this.textMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
                this.textMaterial.metalness = 0.8
                this.textMaterial.roughness = 0.2
                this.text = new THREE.Mesh(this.textGeometry, this.textMaterial)
                this.scene.add(this.text)
                this.text.castShadow = true
                this.textGeometry.computeBoundingBox()
                this.textGeometry.center()
                this.text.position.set(0, 0, 0)

                this.boxShape = new CANNON.Box(new CANNON.Vec3(40, 7.5, 5))
                this.boxBody = new CANNON.Body({
                mass: 200, 
                position: new CANNON.Vec3(0, 30, 0),
                shape: this.boxShape,
                material: this.ContactMaterial
                })
                this.world.addBody(this.boxBody)
                this.boxBody.allowSleep = true
                this.objectsToUpdate.push({
                mesh: this.text,
                body: this.boxBody
                })
                
                this.text2Geometry = new TextGeometry(
                    this.word2,
                    this.textParameters
                )
                this.text2 = new THREE.Mesh(this.text2Geometry, this.textMaterial)
                this.scene.add(this.text2)
                this.text2Geometry.computeBoundingBox()
                this.text2Geometry.center()
                this.box2Shape = new CANNON.Box(new CANNON.Vec3(68, 7.5, 5))
                this.box2Body = new CANNON.Body({
                mass: 20, 
                position: new CANNON.Vec3(0, 10, 0),
                shape: this.box2Shape,
                material: this.ContactMaterial
                })
                this.world.addBody(this.box2Body)
                this.box2Body.allowSleep = true
                this.objectsToUpdate.push({
                mesh: this.text2,
                body: this.box2Body
                })    
            }
        )
        this.fontLoader.load(
            './Lato Light_Italic.json',
            (font) => {
                this.textParameters = {
                    font: font,
                    size: 16.0,
                    height: 6,
                    curveSegments: 2,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }

                this.textBackWallGeometry2 = new TextGeometry(
                    '@nate_dev_', 
                    this.textParameters
                )
                this.textBackWallGeometry2.scale(0.75, 0.75, 0.75)
                this.textBackWallGeometry2.computeBoundingBox()
                this.textBackWallGeometry2.center()
                this.textBackWall2 = new THREE.Mesh(this.textBackWallGeometry2, new THREE.MeshStandardMaterial({color: 0x00f5d4}))
                this.scene.add(this.textBackWall2)
                this.textBackWall2.position.set(0, 20, -152)
                //this.textBackWall.rotation.x = -Math.PI
                this.textBackWall2.castShadow = true
            }
        )
    }

    update()
    {
        for(this.object of this.objectsToUpdate){
            this.object.mesh.position.copy(this.object.body.position)
            this.object.mesh.quaternion.copy(this.object.body.quaternion)
        }
    }
}