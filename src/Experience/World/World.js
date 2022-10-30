import Experience from '../Experience.js'
//import Environment from './Environment.js'
import Ground from './Ground.js'
import Car from './Bronco_v1/Car.js'
import TestBuildings from './TestBuildings.js'
import TestObjects from './TestObjects.js'
import FireFlies from './FireFlies.js'
import Maze from './Maze.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.fireFlies = new FireFlies()
            //this.testObjects = new TestObjects()
            //this.buildings = new TestBuildings()
            this.maze = new Maze()
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