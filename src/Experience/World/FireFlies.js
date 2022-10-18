import Experience from "../Experience";
import * as THREE from 'three'
import fragment from './FireFliesShader/fragment.glsl'
import vertex from './FireFliesShader/vertex.glsl'


export default class FireFlies{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.clock = new THREE.Clock()

        this.initFireflies()
    }

    initFireflies()
    {
        this.firefliesGeometry = new THREE.BufferGeometry()
        this.firefliesCount = 10000
        this.positionArray = new Float32Array(this.firefliesCount * 3)
        this.scaleArray = new Float32Array(this.firefliesCount)
        for(let i = 0; i < this.firefliesCount; i++){
            this.positionArray[i * 3 + 0] = (Math.random() - 0.5) * 1000
            this.positionArray[i * 3 + 1] = (Math.random()) * 50
            this.positionArray[i * 3 + 2] = (Math.random() - 0.5) * 1000

            this.scaleArray[i] = Math.random()
        }
        this.firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(this.positionArray, 3))
        this.firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(this.scaleArray, 1))

        this.firefliesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0},
                u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2)},
                u_size: { value: 2000 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
        this.fireflies = new THREE.Points(this.firefliesGeometry, this.firefliesMaterial)
        this.scene.add(this.fireflies)
        //console.log(this.fireflies)
    }

    update()
    {
        this.firefliesMaterial.uniforms.u_time.value += this.clock.getDelta()
        //console.log(this.firefliesMaterial.uniforms.u_time.value)
    }
}