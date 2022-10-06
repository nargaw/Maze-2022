import * as CANNON from 'cannon-es'
import Physics from "../../Utils/Physics"
import Experience from '../../Experience'

export default class CarConstraints
{
    constructor()
    {
        this.experience = new Experience()
        this.physics = new Physics()
        this.world = this.physics.world
        this.debug = this.experience.debug
        this.setDebugger()
    }

    setConstraints(carBody, flBody, frBody, blBody, brBody)
    {
        //constraints
        this.FLaxis = new CANNON.Vec3(1, 0, 0)
        this.FRaxis = new CANNON.Vec3(1, 0, 0)
        this.BLaxis = new CANNON.Vec3(1, 0, 0)
        this.BRaxis = new CANNON.Vec3(1, 0, 0)

        this.constraintFL = new CANNON.HingeConstraint(
            carBody, 
            flBody, 
            {
                pivotA: new CANNON.Vec3(
                    this.default.frontLeftPivotX, 
                    this.default.frontLeftPivotY, 
                    this.default.frontLeftPivotZ
                ),
                pivotB: new CANNON.Vec3(
                    this.default.frontLeftPivotBX, 
                    this.default.frontLeftPivotBY, 
                    this.default.frontLeftPivotBZ
                ),
                axisA: this.FLaxis,
                maxForce: this.default.maxForceFront,
            }
        )
        this.world.addConstraint(this.constraintFL)

        this.constraintFR = new CANNON.HingeConstraint(
            carBody, 
            frBody, 
            {
                pivotA: new CANNON.Vec3(
                    this.default.frontRightPivotX, 
                    this.default.frontRightPivotY, 
                    this.default.frontRightPivotZ
                ),
                axisA: this.FRaxis,
                maxForce: this.default.maxForceFront,
            }
        )
        this.world.addConstraint(this.constraintFR)

        this.constraintBL = new CANNON.HingeConstraint(
            carBody, 
            blBody, 
            {
                pivotA: new CANNON.Vec3(
                    this.default.backLeftPivotX, 
                    this.default.backLeftPivotY, 
                    this.default.backLeftPivotZ
                ),
                axisA: this.BLaxis,
                maxForce: this.default.maxForceBack,
            }
        )
        this.world.addConstraint(this.constraintBL)

        this.constraintBR = new CANNON.HingeConstraint(
            carBody, 
            brBody, 
            {
                pivotA: new CANNON.Vec3(
                    this.default.backRightPivotX, 
                    this.default.backRightPivotY, 
                    this.default.backRightPivotZ
                ),
                axisA: this.BRaxis,
                maxForce: this.default.maxForceBack,
            }
        )
        
        this.world.addConstraint(this.constraintBR)
        this.constraintBL.enableMotor()
        this.constraintBR.enableMotor()  
    }

    setDebugger()
    {
        this.default = {
            maxForceBack: 1e6,
            maxForceFront: 1e6,

            frontLeftPivotX: -0.85,
            frontLeftPivotY: 0,
            frontLeftPivotZ: -0.98,

            frontRightPivotX: 0.90,
            frontRightPivotY: 0,
            frontRightPivotZ: -0.98,

            backLeftPivotX: -0.85,
            backLeftPivotY: 0,
            backLeftPivotZ: 1.04,

            backRightPivotX: 0.90,
            backRightPivotY: 0,
            backRightPivotZ: 1.04,
        }

        // if(this.debug.active)
        // {
        //     //max force
        //     this.debugFolder = this.debug.ui.addFolder('Constraints')
        //     this.debugFolder.add(
        //         this.default, 'maxForceBack', 0, 1000000, 1
        //     ).onChange(val => {
        //         this.constraintBL.motorEquation.maxForce = val
        //         this.constraintBR.motorEquation.maxForce = val
        //         console.log('BL: ' + this.constraintBL.motorEquation.maxForce)
        //         console.log('BR: ' + this.constraintBR.motorEquation.maxForce)
        //     }).name('Max Force Back Wheels')

        //     this.debugFolder.add(
        //         this.default, 'maxForceFront', 0, 1000000, 1
        //     ).onChange(val => {
        //         this.constraintFL.motorEquation.maxForce = val
        //         this.constraintFR.motorEquation.maxForce = val
        //         console.log('FL: ' + this.constraintFL.motorEquation.maxForce)
        //         console.log('FR: ' + this.constraintFR.motorEquation.maxForce)
        //     }).name('Max Force Front Wheels')

        //     this.pivotFolder = this.debugFolder.addFolder('Pivot')

        //     //front left pivot
        //     this.frontLeft = this.pivotFolder.addFolder('Front Left')
        //     this.frontLeft.add(
        //         this.default, 'frontLeftPivotX', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintFL.pivotA.x = val
        //     }).name('X')
        //     this.frontLeft.add(
        //         this.default, 'frontLeftPivotY', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintFL.pivotA.y = val
        //     }).name('Y')
        //     this.frontLeft.add(
        //         this.default, 'frontLeftPivotZ', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintFL.pivotA.z = val
        //     }).name('Z')


        //     //front Right pivot
        //     this.frontRight = this.pivotFolder.addFolder('Front Right')
        //     this.frontRight.add(
        //         this.default, 'frontRightPivotX', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintFR.pivotA.x = val
        //     }).name('X')
        //     this.frontRight.add(
        //         this.default, 'frontRightPivotY', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintFR.pivotA.y = val
        //     }).name('Y')
        //     this.frontRight.add(
        //         this.default, 'frontRightPivotZ', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintFR.pivotA.z = val
        //     }).name('Z')

        //     //back Left pivot
        //     this.backLeft = this.pivotFolder.addFolder('Back Left')
        //     this.backLeft.add(
        //         this.default, 'backLeftPivotX', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintBL.pivotA.x = val
        //     }).name('X')
        //     this.backLeft.add(
        //         this.default, 'backLeftPivotY', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintBL.pivotA.y = val
        //     }).name('Y')
        //     this.backLeft.add(
        //         this.default, 'backLeftPivotZ', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintBL.pivotA.z = val
        //     }).name('Z')

        //     //back Right pivot
        //     this.backRight = this.pivotFolder.addFolder('Back Right')
        //     this.backRight.add(
        //         this.default, 'backRightPivotX', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintBR.pivotA.x = val
        //     }).name('X')
        //     this.backRight.add(
        //         this.default, 'backRightPivotY', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintBR.pivotA.y = val
        //     }).name('Y')
        //     this.backRight.add(
        //         this.default, 'backRightPivotZ', -1.5, 1.5, 0.1
        //     ).onChange(val =>{
        //         this.constraintBR.pivotA.z = val
        //     }).name('Z')
        // }
    }
}