import Experience from '../Experience.js'
//import Environment from './Environment.js'
import Ground from './Ground.js'
import Car from './Bronco_v1/Car.js'
import TestBuildings from './TestBuildings.js'
import TestObjects from './TestObjects.js'
import FireFlies from './FireFlies.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.fireFlies = new FireFlies()

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            
            this.testObjects = new TestObjects()
            this.buildings = new TestBuildings()
            this.car = new Car()
            this.ground = new Ground()
            
        })
    }

    update()
    {
        if(this.testObjects){
            this.testObjects.update()
        }
        if(this.car){
            this.car.input()
            this.car.motion()
            this.car.update()
            this.car.handleChaseCam()
        }
        if(this.fireFlies)
        {
            this.fireFlies.update()
        }  
    }
}