import Experience from '../Experience.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import gsap from 'gsap'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.experience = new Experience()
        this.loading = this.experience.loading
        this.overlayMaterial = this.loading.overlayMaterial
        this.loadingElement = document.querySelector('.percent')
        this.buttonsElement = document.querySelector('.buttons')
        this.keyboardElement = document.querySelector('.keyboard')
        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.setDraco()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

     setDraco()
    {
        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('/draco/')
        this.dracoGltfLoader = new GLTFLoader()
        this.dracoGltfLoader.setDRACOLoader(this.dracoLoader)
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'dracoModel')
            {
                this.dracoGltfLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++
        this.loadedPercent = 0
        this.toLoadPercent = 100
        this.num = 0
        this.delay = 3000
        this.setNum = (currentNum, newNum) => {
            // if(currentNum === newNum){
            //     return
            // }
            this.updateSpeed = this.delay / Math.abs(currentNum - newNum)
            this.count = currentNum > newNum ? 0 : 1
            this.timer = setInterval(() => {
                if(currentNum < newNum){
                    currentNum += this.count
                }
                document.querySelector('.percent').innerHTML = "Loading " + currentNum + "%"
                if(currentNum === newNum) clearInterval(this.timer)
            }, this.updateSpeed)
        }
        this.setNum(this.loadedPercent, this.toLoadPercent)
        if(this.loaded === this.toLoad)
        {
            this.trigger('ready') 
            window.setTimeout(() => {
                
                gsap.to(this.overlayMaterial.uniforms.uAlpha, {duration: 5, value: 0})
                //this.loadingElement.innerHTML = "Loading Complete"
                this.loadingElement.classList.add('ended')
                this.buttonsElement.classList.remove('off')
                this.keyboardElement.classList.remove('off')
            }, 5000)
            
        }
    }
}