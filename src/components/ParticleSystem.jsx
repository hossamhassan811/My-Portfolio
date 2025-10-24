import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../store/useStore'
import { SECTION_COLORS } from '../utils/constants'

const ParticleSystem = memo(function ParticleSystem() {
  const particlesRef = useRef()
  const currentSection = useStore((state) => state.currentSection)
  const velocitiesRef = useRef()
  const colorTransitionRef = useRef(0)

  const particleCount = 150 // Further reduced for mobile performance

  const [positions, colors3] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const color = new THREE.Color(SECTION_COLORS.home.primary)

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    velocitiesRef.current = velocities
    return [positions, colors]
  }, [])

  const targetColorRef = useRef(new THREE.Color(SECTION_COLORS.home.primary))

  useFrame((state, delta) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array
    const colors = particlesRef.current.geometry.attributes.color.array
    const velocities = velocitiesRef.current

    // Update target color
    targetColorRef.current.set(SECTION_COLORS[currentSection].primary)

    // Throttle color updates
    colorTransitionRef.current += delta
    const shouldUpdateColor = colorTransitionRef.current > 0.016 // ~60fps

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Update positions
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Keep particles in bounds (optimized distance check)
      const distSq = positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2

      if (distSq > 25 || distSq < 2.25) { // 5^2 and 1.5^2
        velocities[i3] *= -1
        velocities[i3 + 1] *= -1
        velocities[i3 + 2] *= -1
      }

      // Update colors less frequently
      if (shouldUpdateColor) {
        colors[i3] += (targetColorRef.current.r - colors[i3]) * 0.03
        colors[i3 + 1] += (targetColorRef.current.g - colors[i3 + 1]) * 0.03
        colors[i3 + 2] += (targetColorRef.current.b - colors[i3 + 2]) * 0.03
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    
    if (shouldUpdateColor) {
      particlesRef.current.geometry.attributes.color.needsUpdate = true
      colorTransitionRef.current = 0
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
})

ParticleSystem.displayName = 'ParticleSystem'

export default ParticleSystem