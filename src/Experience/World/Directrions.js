import Experience from "../Experience";
import * as THREE from 'three'

export default class Directions
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.setDirections()
    }

    setDirections()
    {
        this.arrowMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xee9b00,
        })
        this.arrow = this.resources.items.arrow
        this.arrow.scene.scale.set(15, 15, 15)
        this.arrow.scene.position.set(0, 5, 0)
        this.arrow.scene.traverse((child) => {
            if((child).isMesh){
                this.gltfMesh = child
                this.gltfMesh.receiveShadow = true
                this.gltfMesh.castShadow = true
                this.gltfMesh.material = this.arrowMaterial
            }
        
        this.arrowClone = this.arrow.scene.clone()
        this.arrowClone.scale.set(10, 15, 15)
        this.arrowClone.position.set(-75, 0, 403)
        this.scene.add(this.arrowClone)
        

        this.arrow2Clone = this.arrow.scene.clone()
        this.arrow2Clone.scale.set(10, 15, 15)
        this.arrow2Clone.position.set(-371, 30, 150)
        this.arrow2Clone.rotation.z = -Math.PI
        this.arrow2Clone.rotation.y = Math.PI * 0.5
        this.scene.add(this.arrow2Clone)

        this.arrow3Clone = this.arrow.scene.clone()
        this.arrow3Clone.scale.set(10, 15, 15)
        this.arrow3Clone.position.set(-325, 0, -3)
        this.scene.add(this.arrow3Clone)

        this.arrow4Clone = this.arrow.scene.clone()
        this.arrow4Clone.scale.set(10, 15, 15)
        this.arrow4Clone.rotation.y = -Math.PI * 0.5
        this.arrow4Clone.position.set(-358, 0, -210)
        this.scene.add(this.arrow4Clone)

        this.arrow5Clone = this.arrow.scene.clone()
        this.arrow5Clone.scale.set(10, 15, 15)
        this.arrow5Clone.rotation.y = -Math.PI * 0.5
        this.arrow5Clone.position.set(-85, 5, -335)
        this.scene.add(this.arrow5Clone)

        this.arrow6Clone = this.arrow.scene.clone()
        this.arrow6Clone.scale.set(10, 15, 15)
        this.arrow6Clone.position.set(310, 5, -265)
        //this.arrow6Clone.rotation.x = -Math.PI
        this.arrow6Clone.rotation.y = -Math.PI
        this.scene.add(this.arrow6Clone)

        this.arrow7Clone = this.arrow.scene.clone()
        this.arrow7Clone.scale.set(10, 15, 15)
        this.arrow7Clone.position.set(395, 25, -84)
        this.arrow7Clone.rotation.z = Math.PI
        this.arrow7Clone.rotation.y = -Math.PI
        this.scene.add(this.arrow7Clone)

        this.arrow8Clone = this.arrow.scene.clone()
        this.arrow8Clone.scale.set(10, 15, 15)
        this.arrow8Clone.position.set(275, 30, 145)
        this.arrow8Clone.rotation.z = Math.PI
        this.arrow8Clone.rotation.y = -Math.PI
        this.scene.add(this.arrow8Clone)

        this.arrow9Clone = this.arrow.scene.clone()
        this.arrow9Clone.scale.set(10, 15, 15)
        this.arrow9Clone.position.set(325, 25, 325)
        this.arrow9Clone.rotation.z = Math.PI
        this.arrow9Clone.rotation.y = -Math.PI
        this.scene.add(this.arrow9Clone)

            }
        )
    }
}