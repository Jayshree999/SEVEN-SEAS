'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Float, MeshDistortMaterial, useGLTF, Text3D, Center } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BackgroundVideo from './BackgroundVideo'
import * as THREE from 'three'

function LuxuryBuilding() {
  const buildingRef = useRef<THREE.Group>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  if (!mounted) return null

  return (
    <group ref={buildingRef}>
      {/* Main Building Structure - Luxury Black with Gold Accents */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 10, 4]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.2}
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Gold Accent Bands */}
      {[0, 2, 4, 6, 8].map((y, i) => (
        <mesh key={i} position={[0, y - 4, 2.01]}>
          <boxGeometry args={[4.2, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#FFD700"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Luxury Windows with Gold Frames */}
      {[...Array(15)].map((_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const isLit = Math.random() > 0.3
        return (
          <group key={i}>
            {/* Gold Frame */}
            <mesh
              position={[
                (col - 1) * 1.1,
                -4.5 + row * 1.8,
                2.01
              ]}
            >
              <boxGeometry args={[0.5, 0.6, 0.05]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={1}
                roughness={0.1}
              />
            </mesh>
            {/* Window Glass */}
            <mesh
              position={[
                (col - 1) * 1.1,
                -4.5 + row * 1.8,
                2.03
              ]}
            >
              <boxGeometry args={[0.35, 0.45, 0.02]} />
              <meshStandardMaterial
                color={isLit ? '#FFD700' : '#1a1a1a'}
                emissive={isLit ? '#FFD700' : '#000000'}
                emissiveIntensity={isLit ? 0.8 : 0}
                transparent
                opacity={isLit ? 0.9 : 0.3}
              />
            </mesh>
          </group>
        )
      })}

      {/* Luxury Top Crown - Gold */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.3}>
        <mesh position={[0, 5.5, 0]}>
          <coneGeometry args={[2, 2.5, 12]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#FFD700"
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* Gold Spire */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.2}>
        <mesh position={[0, 7, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={1}
            metalness={1}
            roughness={0.05}
          />
        </mesh>
      </Float>

      {/* Floating Gold Particles - Reduced */}
      {[...Array(10)].map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 1.5}
          rotationIntensity={2}
          floatIntensity={1}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 12
            ]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={1.5}
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* Luxury Ground Base - Gold Trim */}
      <mesh position={[0, -5.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[6, 6, 0.2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, -5.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#FFD700"
          emissiveIntensity={0.4}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

function LuxuryText() {
  return (
    <Center position={[0, 3, 0]}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        SEVEN SEAS
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#FFD700"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0.2}
        />
      </Text3D>
    </Center>
  )
}

export default function Scene3D() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative h-screen w-full bg-white"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <BackgroundVideo opacity={0.08} />
      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [0, 3, 12], fov: 50 }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 3, 12]} />

            {/* Luxury Lighting Setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
              color="#ffffff"
            />
            <pointLight
              position={[-10, 5, -10]}
              intensity={0.8}
              color="#D4AF37"
            />
            <pointLight
              position={[10, 5, 10]}
              intensity={0.8}
              color="#FFD700"
            />
            <spotLight
              position={[0, 15, 0]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              color="#FFD700"
              castShadow
            />

            <LuxuryBuilding />

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              minDistance={8}
              maxDistance={20}
            />

            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Text with Gold Gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-black mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            EXPERIENCE LUXURY
          </h2>
          <p className="text-xl text-gray-600">
            Where Modern Elegance Meets Arabian Hospitality
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
