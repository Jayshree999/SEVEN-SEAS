'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Float, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function LuxuryRoom({ roomType }: { roomType: string }) {
  const roomRef = useRef<THREE.Group>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame((state) => {
    if (roomRef.current) {
      roomRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  if (!mounted) return null

  return (
    <group ref={roomRef}>
      {/* Room Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Luxury Bed */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.1}>
        <group position={[0, 0.3, -2]}>
          {/* Bed Base */}
          <mesh castShadow>
            <boxGeometry args={[3, 0.3, 2.5]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Bed Mattress */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[3, 0.6, 2.5]} />
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.8}
            />
          </mesh>
          {/* Gold Bed Frame Accents */}
          <mesh position={[1.5, 0.2, -1.25]}>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[-1.5, 0.2, -1.25]}>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        </group>
      </Float>

      {/* Luxury Chandelier */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <group position={[0, 3, 0]}>
          {/* Main Chandelier */}
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
            <meshStandardMaterial
              color="#D4AF37"
              emissive="#FFD700"
              emissiveIntensity={0.8}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
          {/* Chandelier Crystals */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const radius = 0.5
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * radius, -0.3, Math.sin(angle) * radius]}
              >
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={1}
                  metalness={1}
                  roughness={0.05}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            )
          })}
        </group>
      </Float>

      {/* Window with Gold Frame */}
      <mesh position={[0, 1, 4]}>
        {/* Gold Frame */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[3, 2.5, 0.1]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.1}
          />
        </mesh>
        {/* Window Glass */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[2.5, 2, 0.05]} />
          <meshStandardMaterial
            color="#87CEEB"
            transparent
            opacity={0.7}
            emissive="#87CEEB"
            emissiveIntensity={0.2}
          />
        </mesh>
      </mesh>

      {/* Luxury Furniture */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.15}>
        <mesh position={[2.5, 0.2, 1]} castShadow>
          <boxGeometry args={[1, 0.4, 1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Gold Accent Particles */}
      {[...Array(20)].map((_, i) => (
        <Float
          key={i}
          speed={0.8 + Math.random() * 0.7}
          rotationIntensity={1.5}
          floatIntensity={0.8}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 6,
              Math.random() * 3,
              (Math.random() - 0.5) * 6
            ]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={1.2}
              metalness={1}
              roughness={0.05}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Room3DPreview({ roomType = 'deluxe' }: { roomType?: string }) {
  return (
    <div className="relative h-96 w-full rounded-lg overflow-hidden border-2 border-gold/30 gold-border-animate">
      <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} />

          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            color="#ffffff"
          />
          <pointLight
            position={[0, 4, 0]}
            intensity={0.8}
            color="#FFD700"
          />
          <pointLight
            position={[-5, 2, -5]}
            intensity={0.5}
            color="#D4AF37"
          />

          <LuxuryRoom roomType={roomType} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />

          <Environment preset="sunset" />
        </Suspense>
      </Canvas>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  )
}

