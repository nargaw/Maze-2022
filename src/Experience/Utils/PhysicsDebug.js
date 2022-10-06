import CannonDebugger from "cannon-es-debugger";
import Experience from "../Experience";
import Physics from "./Physics"

export default class PhysicsDebugger
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.debugUI = this.experience.debug
        this.debugging = false
        this.debug()
        
        //console.log(this.scene)
    }

    // checkDebugger()
    // {
    //     if(this.debugging){
    //         this.cannonDebugger.update()
    //     }
    // }

    debug()
    { 
        this.cannonDebugger = new CannonDebugger(
            this.scene,
            this.physics.world,
            {
                color: 0xff0000,
                onInit(body, mesh)
                {
                    mesh.visible = false
                    document.addEventListener('keydown', (e) => {
                        if(e.key === 'm')
                        {
                            if(!mesh.visible)
                            {
                                mesh.visible = true
                            } else {
                                mesh.visible = false
                            }
                        }
                    })
                }
            }
        )


        
        this.debugObject = {
            myBoolean: "Press M to toggle"
        }
        if (this.debugUI.active)
        {
            this.debugFolder = this.debugUI.ui.addFolder('Physics Debugger')
            this.debugFolder.add(
                this.debugObject, 'myBoolean'
            ).name('Debugger')        
        }
    }

    update()
    {

        if(this.cannonDebugger){
            
            this.cannonDebugger.update()
        } 
    }
}