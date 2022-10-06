import Experience from '../../Experience'
import * as CANNON from 'cannon-es'

export default class CarPhysics
{
   constructor()
   {
       this.experience = new Experience()
       this.scene = this.experience.scene
       this.debug = this.experience.debug
       this.physics = this.experience.physics
       this.world = this.physics.world
       this.objectsToUpdate = []
       
   } 

   setPhysics(body, frontLeftWheel, frontRightWheel, backLeftWheel, backRightWheel)
   {
        this.default = {
            bodyWeight: 100,
            frontWheelWeight: 10,
            backWheelWeight: 10,
            frontWheelAngularDamping: 0.5,
            backWheelAngularDamping: 0.5,
            carAngularDamping: 0.9
        }
        //Wheel Material
        //this.wheelMaterial = new CANNON.Material('wheel')
        this.wheelShape2 = new CANNON.Sphere(0.45)

       //CarBody
       this.carBodyShape = new CANNON.Box(
           new CANNON.Vec3(1.2, 0.6, 1.75)
       )
       this.carBody = new CANNON.Body(
           {
               mass: this.default.bodyWeight,
               material: this.world.defaultMaterial
           }
       )
       this.carBody.addShape(
           this.carBodyShape,
           new CANNON.Vec3(0, 0.25, 0)
       )
       this.carBody.addShape(
            new CANNON.Sphere(1.15),
            new CANNON.Vec3(0, 1, 0.5)
       )
       this.world.addBody(this.carBody)
       this.carBody.angularDamping = this.default.carAngularDamping
       this.carBody.allowSleep = false
       this.objectsToUpdate.push({
           mesh: body,
           body: this.carBody
       })

       //FrontLeftWheel
       this.frontLeftWheelBody = new CANNON.Body(
           {
               mass: this.default.frontWheelWeight,
               material: this.world.defaultMaterial
           }
       )
       this.frontLeftWheelBody.addShape(
            this.wheelShape2, 
            new CANNON.Vec3(0.0, 0.0, 0.0),
            new CANNON.Quaternion().setFromAxisAngle(
                new CANNON.Vec3(0, 0, 1),
                Math.PI * 0.5
            )
        )
        
       this.frontLeftWheelBody.angularDamping = this.default.frontWheelAngularDamping
       this.frontLeftWheelBody.allowSleep = false
       this.frontLeftWheelBody.applyLocalForce = 20
       this.world.addBody(this.frontLeftWheelBody)
       this.objectsToUpdate.push({
           mesh: frontLeftWheel,
           body: this.frontLeftWheelBody
       })

       //FrontRightWheel
       this.frontRightWheelBody = new CANNON.Body(
           {
               mass: this.default.frontWheelWeight,
               material: this.world.defaultMaterial
           }
       )
       this.frontRightWheelBody.addShape(
        this.wheelShape2, 
            new CANNON.Vec3(0.0, 0.0, 0.0),
            new CANNON.Quaternion().setFromAxisAngle(
                new CANNON.Vec3(0, 0, 1),
                Math.PI * 0.5
            )
       )
       this.frontRightWheelBody.allowSleep = false
       this.frontRightWheelBody.applyLocalForce = 20
       this.world.addBody(this.frontRightWheelBody)
       this.objectsToUpdate.push({
           mesh: frontRightWheel,
           body: this.frontRightWheelBody
       })

       //BackLeftWheel
       this.backLeftWheelBody = new CANNON.Body(
           {
               mass: this.default.backWheelWeight,
               material: this.world.defaultMaterial
           }
       )
       this.backLeftWheelBody.addShape(
        this.wheelShape2, 
            new CANNON.Vec3(0.0, 0.0, 0.0),
            new CANNON.Quaternion().setFromAxisAngle(
                new CANNON.Vec3(0, 0, 1),
                Math.PI * 0.5
            )
       )
       this.backLeftWheelBody.angularDamping = this.default.backWheelAngularDamping
       this.backLeftWheelBody.allowSleep = false
       this.backLeftWheelBody.applyLocalForce = 20
       this.world.addBody(this.backLeftWheelBody)
       this.objectsToUpdate.push({
           mesh: backLeftWheel,
           body: this.backLeftWheelBody
       })

       //BackRightWheel
       this.backRightWheelBody = new CANNON.Body(
           {
               mass: this.default.backWheelWeight,
               material: this.world.defaultMaterial
           }
       )
       this.backRightWheelBody.addShape(
        this.wheelShape2, 
            new CANNON.Vec3(0.0, 0.0, 0.0),
            new CANNON.Quaternion().setFromAxisAngle(
                new CANNON.Vec3(0, 0, 1),
                Math.PI * 0.5
            )
       )
       this.backRightWheelBody.angularDamping = this.default.backWheelAngularDamping
       this.backRightWheelBody.allowSleep = false
       this.backRightWheelBody.applyLocalForce = 20
       this.world.addBody(this.backRightWheelBody)
       this.objectsToUpdate.push({
           mesh: backRightWheel,
           body: this.backRightWheelBody
       })

       this.debugger()
   }

   debugger()
   {
    if(this.debug.active)
    {
        this.debugFolder = this.debug.ui.addFolder('Car Physics')
        this.bodyDebug = this.debugFolder.addFolder('Body')
        this.frontWheelsDebug = this.debugFolder.addFolder('Front Wheels')
        this.backWheelsDebug = this.debugFolder.addFolder('Back Wheels')

        //body 
        this.bodyDebug.add(
            this.default, 'bodyWeight', 0, 300, 1
        ).onChange(val => {
            this.carBody.mass = val
            console.log('Car mass: ' + this.carBody.mass)
        }).name('Mass')

        //front wheels mass
        this.frontWheelsDebug.add(
            this.default, 'frontWheelWeight', 0, 30, 1
        ).onChange(val => {
            this.frontLeftWheelBody.mass = val
            this.frontRightWheelBody.mass = val
            console.log('FL mass: ' + this.frontLeftWheelBody.mass)
            console.log('FR mass: ' + this.frontRightWheelBody.mass)
        }).name('Mass')

        //back wheels mass
        this.backWheelsDebug.add(
            this.default, 'backWheelWeight', 0, 30, 1
        ).onChange(val => {
            this.backLeftWheelBody.mass = val
            this.backRightWheelBody.mass = val
            console.log('BL mass: ' + this.backLeftWheelBody.mass)
            console.log('BR mass: ' + this.backRightWheelBody.mass)
        }).name('Mass')

        //car angular damping
        this.bodyDebug.add(
            this.default, 'carAngularDamping', 0, 1, 0.01
        ).onChange(val => {
            this.carBody.angularDamping = val
            console.log('Car Angular Damping: ' + this.carBody.angularDamping)
        }).name('Angular Damping')

        //front wheels angular damping
        this.frontWheelsDebug.add(
            this.default, 'frontWheelAngularDamping', 0.1, 1.,0.01
        ).onChange(val => {
            this.frontLeftWheelBody.angularDamping = val
            this.frontRightWheelBody.angularDamping = val
            console.log('FL Angular Daming: ' + val)
            console.log('FR Angular Damping: ' + val)
        }).name('Angular Damping')

        //back wheels angular damping
        this.backWheelsDebug.add(
            this.default, 'backWheelAngularDamping', 0.1, 1.,0.01
        ).onChange(val => {
            this.backLeftWheelBody.angularDamping = val
            this.backRightWheelBody.angularDamping = val
            console.log('BL Angular Daming: ' + val)
            console.log('BR Angular Damping: ' + val)
        }).name('Angular Damping')
    }
   }
}