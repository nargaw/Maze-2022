import Controls from "../../Utils/Controls"
import Experience from "../../Experience"
import { lerp } from "three/src/math/MathUtils"

export default class CarControls extends Controls 
{
    constructor()
    {
        super()
        this.controls = new Controls()
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.deltaTime = this.time.delta
        this.forwardVel = 0
        this.rightVel = 0
        this.thrusting = false
        this.turning = false
        
        this.setDebugger()
    }

    forward()
    {   
        //console.log(this.deltaTime)
        if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
            this.forwardVel = lerp(this.forwardVel, this.default.maxSpeed * this.time.delta, 0.0125)
            //console.log('speed: ' + this.forwardVel)
            this.thrusting = true 
        }
    }

    backward()
    {
        if (this.keyMap['s'] || this.hoverMap['4'] || this.hoverTouch['4'] || this.keyMap['ArrowDown']){
            this.forwardVel = lerp(this.forwardVel, this.time.delta * -0.5, 0.125)
            this.thrusting = true  
        }
    }

    left()
    {
        if (this.keyMap['a'] || this.hoverMap['1'] || this.hoverTouch['1']|| this.keyMap['ArrowLeft']){
            this.rightVel = lerp(this.rightVel, this.time.delta * -0.015, 0.025)
            this.turning = true
        }
    }

    right()
    {
       if (this.keyMap['d'] || this.hoverMap['2'] || this.hoverTouch['2']|| this.keyMap['ArrowRight']){
        this.rightVel = lerp(this.rightVel, this.time.delta * 0.015, 0.025)
            this.turning = true
        }
    }

    stablize()
    {
        if(!this.thrusting){
            this.forwardVel = lerp(this.forwardVel, 0.0, 0.0125)
        }

        if(!this.turning){
            this.rightVel = lerp(this.rightVel, 0.0, 0.125)
        }
    }

    setDebugger()
    {
        this.default = 
        {
            maxSpeed: 1.75,
            forwardLerpValue: 0.02,

            maxBackingSpeed: -5,
            backingLerpValue: 0.125,

            maxLeftTurningSpeed: -0.15,
            maxRightTurningSpeed: 0.15,
            turningLerpValue: 0.025,

            noThrustingLerpValue: 0.045,
            noTurningLerpValue: 0.125
        }

        if(this.debug.active)
        {
            //debug folder
            this.debugFolder = this.debug.ui.addFolder('Speed and Lerp')
            
            //forward debug
            this.forwardDebug = this.debugFolder.addFolder('Forward')
            this.forwardDebug.add(
                this.default, 'maxSpeed', 1, 5, 0.1
            ).name('Max Speed Factor')
             this.forwardDebug.add(
                this.default, 'forwardLerpValue', 0.001, 0.1, 0.001
            ).name('Speed Lerp Vector')

            //backward debug
            this.backwardDebug = this.debugFolder.addFolder('Backward')
            this.backwardDebug.add(
                this.default, 'maxBackingSpeed', -10, -1, -0.1
            ).name('Max Backing Speed')
            this.backwardDebug.add(
                this.default, 'backingLerpValue', 0.005, 0.25, 0.001
            ).name('Backing Lerp Vector')

            //Turning Debug
            this.turningDebug = this.debugFolder.addFolder('Turning')
            this.turningDebug.add(
                this.default, 'maxLeftTurningSpeed', -0.75, -0.01, -0.01
            ).name('Left Max Turning Speed')
            this.turningDebug.add(
                this.default, 'maxRightTurningSpeed', 0.01, 0.75, 0.01
            ).name('Right Max Turning Speed')
            this.turningDebug.add(
                this.default, 'turningLerpValue', 0.01, 0.05, 0.001
            ).name('Turning Lerp Value')

            //Stopping
            this.stoppingDebug = this.debugFolder.addFolder('Stopping')
            this.stoppingDebug.add(
                this.default, 'noThrustingLerpValue', 0.01, 0.1, 0.001
            ).name('Deceleration Lerp Value')
            this.stoppingDebug.add(
                this.default, 'noTurningLerpValue', 0.01, 0.25, 0.01
            ).name('Stop Turning Lerp Value')
        }
    }
}