import Experience from "../../Experience"
import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Physics from '../../Utils/Physics'
import CarPhysics from "./CarPhysics"
import CarControls from './CarControls'
import CarControlsLowFPS from './CarControlsLowFPS'
import CarControlsHighFPS from './CarControlsHighFPS'
import CarConstraints from './CarConstraints'
import ChaseCam from './ChaseCam'
import Environment from '../Environment'

let instance = null
export default class Car
{
    constructor()
    {
        //singleton to avoid multiple instances of the same car
        if(instance)
        {
            return instance
        }
        instance = this

        //import resources and scene from the single instance of experience 
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera

        this.physics = new Physics()
        this.world = this.physics.world

        this.delatTime = this.time.delta
        //load correct controls FPS adjusted
        //checks during loading one time the FPS
        if(this.delatTime < 12){
            this.controls = new CarControlsHighFPS()
            console.log('high fps controls loaded')
        } else if(this.delatTime > 18){
            this.controls = new CarControlsLowFPS()
            console.log('low fps controls loaded')
        } else {
            this.controls = new CarControls()
            console.log('normal fps controls loaded')
        }
        
        this.environment = new Environment()

        //car physics
        this.carPhysics = new CarPhysics()
        this.objectsToUpdate = this.carPhysics.objectsToUpdate

        //car constraints
        this.constraints = new CarConstraints()

        //add model to the scene
        this.chaseCamera = new ChaseCam()
        this.setModel()
    }

    

    setModel()
    {
        //debug material to sepearate car parts for physics
        this.testMaterial1 = new THREE.MeshStandardMaterial({color: 0xff0000})
        this.testMaterial2 = new THREE.MeshStandardMaterial({color: 0x00ff00})
        this.testMaterial3 = new THREE.MeshStandardMaterial({color: 0x00ffff})
        this.testMaterial4 = new THREE.MeshStandardMaterial({color: 0xfff000})
        this.testMaterial5 = new THREE.MeshStandardMaterial({color: 0xf00ff0})

        //location of model
        this.resource = this.resources.items.bronco_v1
        this.model = this.resource.scene
        this.body = new THREE.Group()
        this.model.traverse((child) => {

            if(child.name === 'FrontLeft-Wheels'){
                this.frontLeftWheel = child
                this.frontLeftWheel.traverse((children) =>{
                    children.material = this.testMaterial1
                }) 
                //console.log(child)
            }

            if(child.name === 'FrontRIght-Wheels'){
                this.frontRightWheel = child
                this.frontRightWheel.traverse((children) =>{
                    children.material = this.testMaterial3
                })
                
            }

            //back right wheel
            if(child.name === 'RearRight-Wheels'){
                this.backRightWheel = child
                this.backRightWheel.traverse((children) =>{
                    children.material = this.testMaterial4
                })
            }

            //back left wheel
            if(child.name === 'RearLeft-Wheels'){
                this.backLeftWheel = child
                this.backLeftWheel.traverse((children) =>{
                    children.material = this.testMaterial5
                    
                })
            }
            
            //body
            if(child.name === 'Body'){               
                this.body = child
                //console.log(this.body)
                child.traverse((children) => {
                    children.material = new THREE.MeshNormalMaterial()
                }) 
            }

            if(child.isMesh){
                child.castShadow = true
            } 
        })
        
        this.scene.add(this.body, this.frontLeftWheel, this.frontRightWheel, this.backLeftWheel, this.backRightWheel)
        
        this.carPhysics.setPhysics(
            this.body,
            this.frontLeftWheel,
            this.frontRightWheel,
            this.backLeftWheel,
            this.backRightWheel
        )
        
        this.constraints.setConstraints(
            this.carPhysics.carBody,
            this.carPhysics.frontLeftWheelBody,
            this.carPhysics.frontRightWheelBody,
            this.carPhysics.backLeftWheelBody,
            this.carPhysics.backRightWheelBody
        )
        
        this.environment.setSunLight(this.body)
    }

    update()
    {
        //update bodies
        for(this.obj of this.objectsToUpdate){
            this.obj.mesh.position.copy(this.obj.body.position)
            this.obj.mesh.quaternion.copy(this.obj.body.quaternion)
        }

        //update shadows
        this.environment.sunLight.position.copy(this.body.position)
    }

    input()
    {
        this.controls.forward()
        this.controls.backward()
        this.controls.left()
        this.controls.right()
        this.controls.stablize()
    }

    motion()
    {
        this.controls.turning = false
        this.controls.thrusting = false
        this.constraints.constraintBL.setMotorSpeed(this.controls.forwardVel)
        this.constraints.constraintBR.setMotorSpeed(this.controls.forwardVel)
        this.constraints.constraintFL.axisA.z = this.controls.rightVel
        this.constraints.constraintFR.axisA.z = this.controls.rightVel
    }
    
    handleChaseCam()
    {
        //update chasecamera
        this.chaseCamera.handleChaseCam(this.body)
    }
}