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
        this.time = this.experience.time
        this.deltaTime = this.time.delta
        this.forwardVel = 0
        this.rightVel = 0
        this.thrusting = false
        this.turning = false   
    }

    forward()
    {   
        //console.log(this.deltaTime)
        if (this.keyMap['w'] || this.hoverMap['3']  || this.hoverTouch['3']|| this.keyMap['ArrowUp']){
            this.forwardVel = lerp(this.forwardVel, 64, 0.025)
            this.thrusting = true 
        }
    }

    backward()
    {
        if (this.keyMap['s'] || this.hoverMap['4'] || this.hoverTouch['4'] || this.keyMap['ArrowDown']){
            this.forwardVel = lerp(this.forwardVel, -10, 0.25)
            this.thrusting = true  
        }
    }

    left()
    {
        if (this.keyMap['a'] || this.hoverMap['1'] || this.hoverTouch['1']|| this.keyMap['ArrowLeft']){
            this.rightVel = lerp(this.rightVel, -0.4, 0.02)
            this.turning = true
        }
    }

    right()
    {
       if (this.keyMap['d'] || this.hoverMap['2'] || this.hoverTouch['2']|| this.keyMap['ArrowRight']){
            this.rightVel = lerp(this.rightVel, 0.4, 0.02)
            this.turning = true
        }
    }

    stablize()
    {
        if(!this.thrusting){
            this.forwardVel = lerp(this.forwardVel, 0.0, 0.125)
        }

        if(!this.turning){
            this.rightVel = lerp(this.rightVel, 0.0, 0.25)
        }
    }
}