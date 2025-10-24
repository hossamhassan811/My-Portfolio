import { useEffect, useRef } from 'react'
import { useThree, useFrame, useLoader } from '@react-three/fiber'
import {
  Environment,
  PerspectiveCamera,
  Stars,
  Float
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import gsap from 'gsap'
import * as THREE from 'three'
import useStore from '../store/useStore'
import { CAMERA_CONFIGS, SECTION_COLORS } from '../utils/constants'
import InteractiveSphere from './InteractiveSphere'
import ParticleSystem from './ParticleSystem'
import { useAssetLoader } from '../hooks/useAssetLoader'

function Scene() {
  const { scene, gl } = useThree()
  const cameraRef = useRef()
  const currentSection = useStore((state) => state.currentSection)
  const isTransitioning = useStore((state) => state.isTransitioning)
  const setIsTransitioning = useStore((state) => state.setIsTransitioning)
  const { assets } = useAssetLoader()

  const ambientLightRef = useRef()
  const pointLight1Ref = useRef()

  // Initialize scene background and set up loading manager
  useEffect(() => {
    scene.background = new THREE.Color(SECTION_COLORS.home.background)
    scene.fog = new THREE.Fog(SECTION_COLORS.home.background, 8, 20)

    // Set the loading manager on the WebGL renderer
    if (assets.manager && gl) {
      gl.setAnimationLoop(null) // Pause rendering during loading
    }
  }, [scene, assets.manager, gl])

  // Animate camera and scene on section change
  useEffect(() => {
    if (!cameraRef.current) return

    setIsTransitioning(true)

    const config = CAMERA_CONFIGS[currentSection]
    const colors = SECTION_COLORS[currentSection]

    const timeline = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    })

    // Camera animation - optimized for mobile
    timeline.to(
      cameraRef.current.position,
      {
        x: config.position[0],
        y: config.position[1],
        z: config.position[2],
        duration: 1.2, // Faster on mobile
        ease: 'power2.inOut',
      },
      0
    )

    timeline.to(
      cameraRef.current,
      {
        fov: config.fov,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => cameraRef.current.updateProjectionMatrix(),
      },
      0
    )

    // Background color transition
    const startColor = new THREE.Color(scene.background)
    const endColor = new THREE.Color(colors.background)

    timeline.to(
      { t: 0 },
      {
        t: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: function () {
          const t = this.targets()[0].t
          scene.background.lerpColors(startColor, endColor, t)
          scene.fog.color.lerpColors(startColor, endColor, t)
        },
      },
      0
    )

    // Lighting transitions
    if (ambientLightRef.current) {
      timeline.to(
        ambientLightRef.current,
        {
          intensity: currentSection === 'home' ? 0.5 : 0.8,
          duration: 1.2,
        },
        0
      )
    }

  }, [currentSection, scene, setIsTransitioning])

  useFrame((state) => {
    if (!cameraRef.current || isTransitioning) return

    // Subtle camera movement
    const time = state.clock.elapsedTime
    cameraRef.current.position.x += Math.sin(time * 0.2) * 0.0002
    cameraRef.current.position.y += Math.cos(time * 0.3) * 0.0002
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={CAMERA_CONFIGS.home.position}
        fov={CAMERA_CONFIGS.home.fov}
      />

      <ambientLight ref={ambientLightRef} intensity={0.5} />
      
      <pointLight
        ref={pointLight1Ref}
        position={[10, 10, 10]}
        intensity={1}
        color={SECTION_COLORS[currentSection].primary}
      />
      
      {/* Removed second point light for performance */}

      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <InteractiveSphere />
      </Float>

      <ParticleSystem />

      {currentSection === 'home' && (
        <Stars
          radius={100}
          depth={50}
          count={300} // Further reduced for mobile
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      )}

      <Environment preset="night" />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.15} // Reduced
          luminanceThreshold={0.5} // Increased threshold
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        {/* Removed ChromaticAberration for performance */}
      </EffectComposer>
    </>
  )
}

export default Scene