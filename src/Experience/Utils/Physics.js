import * as CANNON from 'cannon-es'
import Time from './Time.js'
import Experience from '../Experience'
let instance = null

export default class Physics
{
    constructor()
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        //this.setup()

        // Global access
        window.physics = this

        this.default = {
            friction: 0.4,
            restitution: 0.5,
            gravity: -9.8
        }

        this.experience = new Experience()
        this.time = new Time()
        this.debug = this.experience.debug
        this.world = new CANNON.World()
        this.world.gravity.set(0, this.default.gravity, 0)
        this.defaultMaterial = new CANNON.Material('default')
        this.defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: this.default.friction,
                restitution: this.default.restitution
            }
        )
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true
        this.world.defaultContactMaterial = this.defaultContactMaterial
        this.world.addContactMaterial(this.defaultContactMaterial)
        //console.log(this.world.gravity)
        //this.update()

        

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('World Physics')
            //friction debug
            this.debugFolder.add(
                this.default, 'friction', 0, 1, 0.01
            ).onChange(val => {
                this.defaultContactMaterial.friction = val
                console.log('friction: ' + this.defaultContactMaterial.friction)
            }).name('Friction')
            //restitution debug
            this.debugFolder.add(
                this.default, 'restitution', 0, 1, 0.01
            ).onChange(val => {
                this.defaultContactMaterial.restitution = val
                console.log('restitution: ' + this.defaultContactMaterial.restitution)
            }).name('Restitution')
            //gravity
            this.debugFolder.add(
                this.default, 'gravity', -50, 5, 1
            ).onChange(val => {
                this.world.gravity.set(0, val, 0)
                console.log('gravity: ' + this.world.gravity)
            }).name('Gravity')
        }
        //this.update()
    }

    setup(){
        this.timeStep = 1/60
        this.lastCallTime = 0
    }

    step()
    {
        this.time = performance.now()/1000
        if(!this.lastCallTime){
            this.world.step(this.timeStep)
        } else {
            const dt = this.time - this.lastCallTime
            this.world.step(this.timeStep, dt)
        }
        this.lastCallTime = this.time
    }

    update()
    {
        //this.step()
        //this.time.update(this.world)
        this.world.step(1/60, this.time.delta, 3)
        //console.log(this.time.delta)
    }
}