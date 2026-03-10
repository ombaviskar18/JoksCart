import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import nikeModelUrl from '../assets/models/nike_tc_7900_sail.glb';

function ShoeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(nikeModelUrl);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={gltf.scene} position={[0, 0.2, 0]} scale={4.5} />
    </group>
  );
}

useGLTF.preload(nikeModelUrl);

export function Shoe3D() {
  return (
    <div className="w-full h-[400px] md:h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.4}
        />
        
        <Suspense fallback={null}>
          <ShoeModel />
        </Suspense>

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
