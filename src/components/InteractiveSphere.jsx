import { useRef, useMemo, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store/useStore'
import { SECTION_COLORS } from '../utils/constants'

const InteractiveSphere = memo(function InteractiveSphere() {
  const meshRef = useRef()
  const materialRef = useRef()
  const currentSection = useStore((state) => state.currentSection)

  const colors = SECTION_COLORS[currentSection]

  useFrame((state) => {
    const { clock } = state

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.05
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 
        0.5 + Math.sin(clock.elapsedTime * 1.5) * 0.3
    }
  })

  return (
    <group>
      {/* Main Sphere - optimized for mobile */}
      <Sphere ref={meshRef} args={[1, 24, 24]}>
        <MeshDistortMaterial
          ref={materialRef}
          color={colors.primary}
          emissive={colors.primary}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          distort={0.3} // Reduced from 0.4
          speed={1.5}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Inner Core - reduced segments */}
      <Sphere args={[0.3, 8, 8]}>
        <meshBasicMaterial color={colors.secondary} />
      </Sphere>

      {/* Wireframe Overlay - reduced segments */}
      <Sphere args={[1.05, 12, 12]}>
        <meshBasicMaterial
          color={colors.primary}
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
    </group>
  )
})

InteractiveSphere.displayName = 'InteractiveSphere'

export default InteractiveSphere