import Experience from '../Experience.js'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Maze
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.world = this.physics.world
        this.resources = this.experience.resources
        this.resource = this.resources.items.maze.scene
        this.createMaze()
    }

    createMaze()
    {
        this.mazeMaterial = new THREE.MeshStandardMaterial({
            //side: THREE.DoubleSide
            color: 0x003049
        })
        this.resource.scale.set(80,50,80)
        this.resource.position.set(0, -10, 0)
        this.scene.add(this.resource)
        this.resource.traverse((child) => {
            if(child.isMesh){
                child.material = this.mazeMaterial
            }
        })

        //bulding physics
        this.buildingBody = new CANNON.Body({
            mass: 0,
            material: this.defaultMaterial
        })
        this.buildingShape = new CANNON.Box(new CANNON.Vec3(500, 25, 5))
        this.buildingBody.addShape(this.buildingShape)
        this.buildingBody.position.set(0, 18, 475)
        this.world.addBody(this.buildingBody)


       //borders
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 25, 500)), new CANNON.Vec3(-475, 1, -475))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 25, 500)), new CANNON.Vec3(475, 1, -475))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(500, 25, 5)), new CANNON.Vec3(0, 0, -950))

        //horizontal
        //r1
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 * 1.5 , 20, 5)), new CANNON.Vec3(-365, 0, -43))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/1.7 , 20, 5)), new CANNON.Vec3(-225, 0, -43))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 * 1.65 , 20, 5)), new CANNON.Vec3(-90, 0, -43))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 * 1.60 , 20, 5)), new CANNON.Vec3(225, 0, -43))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 , 20, 5)), new CANNON.Vec3(390, 0, -43))

        //r2
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.5, 20, 5)), new CANNON.Vec3(-458, 0, -43.3 * 2))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 5)), new CANNON.Vec3(-270, 0, -43.3 * 2))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 5)), new CANNON.Vec3(-180, 0, -43.3 * 2))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 2, 20, 5)), new CANNON.Vec3(-70, 0, -43.3 * 2))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 3, 20, 5)), new CANNON.Vec3(90, 0, -43.3 * 2))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 3, 20, 5)), new CANNON.Vec3(270, 0, -43.3 * 2))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 5)), new CANNON.Vec3(410, 0, -43.3 * 2))

        //r3
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 4.0, 20, 5)), new CANNON.Vec3(-390, 0, -45.3 * 3))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 5)), new CANNON.Vec3(-228, 0, -44.9 * 3))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 2, 20, 5)), new CANNON.Vec3(25, 0, -44.9 * 3))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 4.85, 20, 5)), new CANNON.Vec3(272, 0, -44.5 * 3))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 5)), new CANNON.Vec3(452, 0, -44.9 * 3))

        //r4
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.80 * 2, 20, 4.5)), new CANNON.Vec3(-295, 0, -44.8 * 4))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 4.5)), new CANNON.Vec3(-182, 0, -44.8 * 4))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 4.5)), new CANNON.Vec3(-45, 0, -44.8 * 4))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 6.72, 20, 4.5)), new CANNON.Vec3(180, 0, -44.8 * 4))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 4.5)), new CANNON.Vec3(408, 0, -44.8 * 4))

        //r5
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.80 * 2, 20, 4.5)), new CANNON.Vec3(-386, 0, -44.8 * 5))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.80, 20, 4.5)), new CANNON.Vec3(-270, 0, -44.8 * 5))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 3, 20, 4.5)), new CANNON.Vec3(-92, 0, -44.8 * 5))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.80, 20, 4.5)), new CANNON.Vec3(45, 0, -44.8 * 5))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.80 * 2, 20, 4.5)), new CANNON.Vec3(295, 0, -44.8 * 5))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.65, 20, 4.5)), new CANNON.Vec3(408, 0, -44.8 * 5))

        //r6
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-318, 0, -44.8 * 6))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 3, 20, 5)), new CANNON.Vec3(-182, 0, -44.8 * 6))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-45, 0, -44.8 * 6))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.85 * 3, 20, 5)), new CANNON.Vec3(135, 0, -44.8 * 6))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.92 * 4, 20, 5)), new CANNON.Vec3(340, 0, -44.8 * 6))

        //r7
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-455, 0, -45 * 7))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.86 * 3, 20, 5)), new CANNON.Vec3(-275, 0, -45 * 7))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.86 * 3, 20, 5)), new CANNON.Vec3(-90, 0, -45 * 7))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.86 * 3, 20, 5)), new CANNON.Vec3(90, 0, -45 * 7))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.86 * 2, 20, 5)), new CANNON.Vec3(295, 0, -45 * 7))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(452, 0, -45 * 7))

        //r8
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-410, 0, -45 * 8))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.84 * 2, 20, 5)), new CANNON.Vec3(-296, 0, -45 * 8))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(318, 0, -45 * 8))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(408, 0, -45 * 8))

        //r9
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-364, 0, -45 * 9))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-272, 0, -45 * 9))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.7, 20, 5)), new CANNON.Vec3(-184, 0, -45 * 9))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.8 * 2, 20, 5)), new CANNON.Vec3(250, 0, -45 * 9))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.8 * 2, 20, 5)), new CANNON.Vec3(430, 0, -45 * 9))

        //r10
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.88 * 3, 20, 5)), new CANNON.Vec3(-364, 0, -45 * 10))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/1.88 * 4, 20, 5)), new CANNON.Vec3(340, 0, -45 * 10))

        //r11
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.87 * 3, 20, 5)), new CANNON.Vec3(-319, 0, -45 * 11))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.8 * 2, 20, 5)), new CANNON.Vec3(205, 0, -45 * 11))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 2.0 * 3, 20, 5)), new CANNON.Vec3(368, 0, -45 * 11))

        //r12
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-455, 0, -45 * 12))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-228, 0, -45 * 12))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.8 * 2, 20, 5)), new CANNON.Vec3(295, 0, -45 * 12))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.8 * 2, 20, 5)), new CANNON.Vec3(430, 0, -45 * 12))

        //r13
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.75 * 2, 20, 5)), new CANNON.Vec3(-295, 0, -45.2 * 13))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.6, 20, 5)), new CANNON.Vec3(-185, 0, -45.2 * 13))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3 / 1.75 * 2, 20, 5)), new CANNON.Vec3(385, 0, -45.2 * 13))


        //r14
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.87 * 3, 20, 5)), new CANNON.Vec3(-364, 0, -45.2 * 14))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-228, 0, -45.2 * 14))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.95 * 8, 20, 5)), new CANNON.Vec3(21, 0, -45.2 * 14))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(318, 0, -45.2 * 14))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(408, 0, -45.2 * 14))

        //r15
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-410, 0, -45.2 * 15))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-275, 0, -45.2 * 15))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-185, 0, -45.2 * 15))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(-25, 0, -45.2 * 15))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.85 * 3, 20, 5)), new CANNON.Vec3(180, 0, -45.2 * 15))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(430, 0, -45.2 * 15))
        
        //r16
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-410, 0, -45.2 * 16))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-320, 0, -45.2 * 16))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.95 * 10, 20, 5)), new CANNON.Vec3(-23, 0, -45.2 * 16))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(294, 0, -45.2 * 16))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(455, 0, -45.2 * 16))

        //r17
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.9 * 4, 20, 5)), new CANNON.Vec3(-295, 0, -45.2 * 17))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-137, 0, -45.2 * 17))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.85 * 3, 20, 5)), new CANNON.Vec3(90, 0, -45.2 * 17))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(340, 0, -45.2 * 17))

        //r18
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.95 * 5, 20, 5)), new CANNON.Vec3(-321, 0, -45.2 * 18))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(-22, 0, -45.2 * 18))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.85 * 3, 20, 5)), new CANNON.Vec3(135, 0, -45.2 * 18))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(295, 0, -45.2 * 18))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(408, 0, -45.2 * 18))

        //r19
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-455, 0, -45.2 * 19))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-320, 0, -45.2 * 19))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.85 * 4, 20, 5)), new CANNON.Vec3(-115, 0, -45.2 * 19))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(68, 0, -45.2 * 19))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(205, 0, -45.2 * 19))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(453, 0, -45.2 * 19))

        //r20
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-365, 0, -45.2 * 20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.8 * 2, 20, 5)), new CANNON.Vec3(-250, 0, -45.2 * 20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-135, 0, -45.2 * 20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.6, 20, 5)), new CANNON.Vec3(-45, 0, -45.2 * 20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.86 * 3, 20, 5)), new CANNON.Vec3(90, 0, -45.2 * 20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(45.3/ 1.86 * 4, 20, 5)), new CANNON.Vec3(340, 0, -45.2 * 20))

        //vertical
        //c1
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.7)), new CANNON.Vec3(-475 + 43, 0, -156))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2 / 1.8)), new CANNON.Vec3(-475 + 43, 0, -270))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 4 / 1.88)), new CANNON.Vec3(-475 + 43, 0, -451))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.9)), new CANNON.Vec3(-475 + 43, 0, -614))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2 / 1.8)), new CANNON.Vec3(-475 + 43, 0, -768))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.9)), new CANNON.Vec3(-475 + 43, 0, -885))

        //c2
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/1.7)), new CANNON.Vec3(-475 + (44 * 2), 0, -65))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/1.7)), new CANNON.Vec3(-475 + (44 * 2), 0, -202))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/1.8)), new CANNON.Vec3(-475 + (44 * 2), 0, -315))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 3/1.85)), new CANNON.Vec3(-475 + (44 * 2), 0, -563))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/1.7)), new CANNON.Vec3(-475 + (44 * 2), 0, -700))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 3/1.85)), new CANNON.Vec3(-475 + (44 * 2), 0, -888))

        //c3
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/ 1.6)), new CANNON.Vec3(-475 + (44 * 3), 0, -110))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/ 1.6)), new CANNON.Vec3(-475 + (44 * 3), 0, -290))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/ 1.6)), new CANNON.Vec3(-475 + (44 * 3), 0, -383))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45/ 1.6)), new CANNON.Vec3(-475 + (44 * 3), 0, -560))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 3 / 1.85)), new CANNON.Vec3(-475 + (44 * 3), 0, -700))

        //c4
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.7)), new CANNON.Vec3(-475 + (44.8 * 4), 0, -65))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.7)), new CANNON.Vec3(-475 + (44.8 * 4), 0, -156))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.7)), new CANNON.Vec3(-475 + (44.8 * 4), 0, -245))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 4), 0, -429))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 4), 0, -520))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 4), 0, -882))

        //c5
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 5), 0, -20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2 / 1.8)), new CANNON.Vec3(-475 + (44.8 * 5), 0, -133))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 5), 0, -384))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.7)), new CANNON.Vec3(-475 + (44.8 * 5), 0, -475))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 4 / 1.9)), new CANNON.Vec3(-475 + (44.8 * 5), 0, -632))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.7)), new CANNON.Vec3(-475 + (44.8 * 5), 0, -835))

        //c6
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 6), 0, -65))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2 / 1.8)), new CANNON.Vec3(-475 + (44.8 * 6), 0, -225))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2 / 1.8)), new CANNON.Vec3(-475 + (44.8 * 6), 0, -360))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2 / 1.8)), new CANNON.Vec3(-475 + (44.8 * 6), 0, -495))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 6), 0, -745))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 6), 0, -882))

        //c7
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 7), 0, -155))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 7/ 1.75)), new CANNON.Vec3(-475 + (44.8 * 7), 0, -490))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.75)), new CANNON.Vec3(-475 + (44.8 * 7), 0, -815))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (44.8 * 7), 0, -928))

        //c8
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 3/ 1.9)), new CANNON.Vec3(-475 + (45 * 8), 0, -155))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 8), 0, -292))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 8), 0, -700))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 8), 0, -792))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 8), 0, -882))

        //c9
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 9), 0, -110))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 9), 0, -246))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 9), 0, -656))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 9), 0, -790))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45 * 9), 0, -925))

        //c10
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 10), 0, -20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.1 * 10), 0, -178))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 10), 0, -290))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 10), 0, -745))

        //c11
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 11), 0, -20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 3/ 1.9)), new CANNON.Vec3(-475 + (45.1 * 11), 0, -245))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.1 * 11), 0, -814))

        //c12
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.1 * 12), 0, -88))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 12), 0, -248))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.1 * 12), 0, -678))

        //c13
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 13), 0, -20))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.1 * 13), 0, -178))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.1 * 13), 0, -838))

        //c14
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.2 * 14), 0, -88))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.2 * 14), 0, -248))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 7/ 2.0)), new CANNON.Vec3(-475 + (45.2 * 14), 0, -475))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.2 * 14), 0, -883))

        //c15
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.3 * 15), 0, -201))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 4/ 1.9)), new CANNON.Vec3(-475 + (45.3 * 15), 0, -361))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.3 * 15), 0, -587))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.3 * 15), 0, -769))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.3 * 15), 0, -930))

        //c16
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.2 * 16), 0, -316))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 6/ 1.9)), new CANNON.Vec3(-475 + (45.2 * 16), 0, -585))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.2 * 16), 0, -788))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.2 * 16), 0, -885))

        //c17
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.2 * 17), 0, -380))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.2 * 17), 0, -634))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.6)), new CANNON.Vec3(-475 + (45.2 * 17), 0, -838))

        //c18
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -42))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -201))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -385))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -587))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -698))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -788))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 18), 0, -885))

        //c19
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 19), 0, -107))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 19), 0, -201))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.2 * 19), 0, -360))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.2 * 19), 0, -722))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.2 * 19), 0, -860))

        //c20
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 20), 0, -65))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 20), 0, -156))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.2 * 20), 0, -292))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.2 * 20), 0, -478))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 / 1.8)), new CANNON.Vec3(-475 + (45.3 * 20), 0, -610))
        this.buildingBody.addShape(new CANNON.Box(new CANNON.Vec3(5, 20, 45 * 2/ 1.8)), new CANNON.Vec3(-475 + (45.3 * 20), 0, -768))
    }
}