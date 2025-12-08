import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  ContactShadows,
  Text,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

// --- Procedural Assets to avoid external file dependencies ---

const Laptop = (props: any) => {
  return (
    <group {...props}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[10, 0.5, 7]} />
        <meshStandardMaterial color="#333" roughness={0.6} metalness={0.8} />
      </mesh>
      {/* Screen Hinge */}
      <group position={[0, 0.5, -3.5]} rotation={[-0.2, 0, 0]}>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[10, 5, 0.2]} />
          <meshStandardMaterial color="#222" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Screen Display (Glowing) */}
        <mesh position={[0, 2.5, 0.11]}>
          <planeGeometry args={[9.5, 4.5]} />
          <meshBasicMaterial color="#00f3ff" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
};

const AIBot = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  return (
    <group {...props}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Head */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#bc13fe"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
        {/* Eye Ring */}
        <mesh position={[0, 0, 0]} rotation={[1.6, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 100]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[1.6, 0.5, 0]}>
          <torusGeometry args={[1.4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      </Float>
    </group>
  );
};

const HolographicPlatform = (props: any) => {
  return (
    <group {...props}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshBasicMaterial
          color="#00f3ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
        <circleGeometry args={[7.8, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
};

const FloatingCode = () => {
  return (
    <group position={[4, 2, -2]}>
      <Text
        color="#00f3ff"
        fontSize={0.4}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="left"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {`const dev = {\n  name: "Michael",\n  skills: ["React", "ThreeJS", "AI"]\n}`}
      </Text>
    </group>
  );
};

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#bc13fe"
        />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* Environment */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Environment preset="city" />

        {/* Objects */}
        <group position={[0, -1, 0]}>
          {/* The Tech Setup */}
          <Laptop position={[-2, -1, 0]} rotation={[0, 0.5, 0]} scale={0.3} />

          {/* The AI Entity */}
          <AIBot position={[2, 1, 0]} />

          {/* Decor */}
          <HolographicPlatform />
          <FloatingCode />
        </group>

        {/* Shadows */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={20}
          blur={2}
          far={4}
          color="#00f3ff"
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
