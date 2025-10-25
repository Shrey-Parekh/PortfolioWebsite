import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Torus, Box } from '@react-three/drei'
import * as THREE from 'three'

// 3D Scene Component
const Scene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse, viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      // Auto-rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      // Mouse interaction
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2
      
      meshRef.current.position.x = x * 0.1
      meshRef.current.position.y = y * 0.1
    }
  })

  return (
    <group>
      {/* Main geometric shape */}
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial
          color="#007AFF"
          metalness={0.7}
          roughness={0.3}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </group>
  )
}

// Floating particle component
const FloatingParticle: React.FC<{ index: number }> = ({ index }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ]}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color="#007AFF"
        transparent
        opacity={0.6}
        emissive="#001122"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Main Hero 3D Component
const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#007AFF" />
        
        {/* 3D Scene */}
        <Scene />
        
        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

export default Hero3D
