import * as THREE from 'three'
import Experience from '../../Experience'

export default class ChaseCam
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.deltaTime = this.time.delta
        this.debug = this.experience.debug
        this.camera = this.experience.camera

        //debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }
        this.views()
        this.chasecamera() 
        
             
    }

    views()
    {
        this.v = new THREE.Vector3()
        this.birdeyeView = new THREE.Vector3(0, 5, 25)
        this.closeupView = new THREE.Vector3(0, 5, 30)
        this.cams = [this.birdeyeView, this.closeupView]
        this.currentCam = this.birdeyeView    
    }

    chasecamera()
    {
        this.chaseCam = new THREE.Object3D()
        this.chaseCam.position.set(0, 0, 0)
        this.chaseCamPivot = new THREE.Object3D()
        this.chaseCamPivot.position.copy(this.currentCam)
        this.chaseCam.add(this.chaseCamPivot)
        this.scene.add(this.chaseCam)

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.currentCam, 'x')
                .name('CameraX')
                .min(-15)
                .max(15)
                .step(0.001)
                .onChange(() => 
                {
                    this.chaseCamPivot.position.copy(this.birdeyeView)
                })

            this.debugFolder
                .add(this.birdeyeView, 'y')
                .name('CameraY')
                .min(5)
                .max(25)
                .step(0.001)
                .onChange(() => 
                {
                    this.chaseCamPivot.position.copy(this.birdeyeView)
                })

            this.debugFolder
                .add(this.currentCam, 'z')
                .name('CameraZ')
                .min(5)
                .max(50)
                .step(0.001)
                .onChange(() => 
                {
                    this.chaseCamPivot.position.copy(this.birdeyeView)
                })
        }
    }

    handleChaseCam(body)
    {
        this.camera.instance.lookAt(body.position)
        this.chaseCam.position.copy(body.position)
        this.chaseCam.quaternion.copy(body.quaternion)
        this.chaseCamPivot.getWorldPosition(this.v)
        if(this.v.y < 5)
        {
            this.v.y = 5
        }
        this.camera.instance.position.lerpVectors(this.camera.instance.position, this.v, 0.075)
    }
}