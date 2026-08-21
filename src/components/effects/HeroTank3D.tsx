import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroTankSceneProps {
  level: number;
}

const HeroTankScene: React.FC<HeroTankSceneProps> = ({ level }) => {
  const isReduced = useReducedMotion();
  const { camera, size } = useThree();

  const rigRef = useRef<THREE.Group>(null!);
  const waterMeshRef = useRef<THREE.Mesh>(null!);
  const surfMeshRef = useRef<THREE.Mesh>(null!);
  const surfGeoRef = useRef<THREE.CircleGeometry>(null!);
  const puckRef = useRef<THREE.Group>(null!);
  const ledMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  const compact = size.width < 640;
  const particleCount = compact ? 42 : 90;

  const surfGeo = useMemo(() => new THREE.CircleGeometry(2.34, 56), []);
  const basePos = useMemo(() => surfGeo.attributes.position.array.slice(), [surfGeo]);

  const [particleGeo, particleSpeeds] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const spd: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const rad = 3.2 + Math.random() * 3.4;
      pos[i * 3] = Math.cos(a) * rad;
      pos[i * 3 + 1] = Math.random() * 12 - 5;
      pos[i * 3 + 2] = Math.sin(a) * rad;
      spd.push(0.008 + Math.random() * 0.022);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return [geo, spd];
  }, [particleCount]);

  const mouseRef = useRef({ tx: 0, ty: 0, mx: 0, my: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX / window.innerWidth - 0.5;
      mouseRef.current.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const sy = window.scrollY;
    const heroH = document.getElementById('top')?.offsetHeight || window.innerHeight;
    if (sy > heroH + 340) return;

    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;

    const targetH = 0.5 + (level / 100) * 4.2;
    if (waterMeshRef.current) {
      waterMeshRef.current.scale.y += (targetH - waterMeshRef.current.scale.y) * 0.04;
      waterMeshRef.current.position.y = -2.7 + waterMeshRef.current.scale.y / 2;

      if (surfMeshRef.current) {
        const targetSurfY = waterMeshRef.current.position.y + waterMeshRef.current.scale.y / 2;
        surfMeshRef.current.position.y += (targetSurfY - surfMeshRef.current.position.y) * 0.04;
      }
    }

    if (surfGeoRef.current) {
      const p = surfGeoRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < p.length; i += 3) {
        const x = basePos[i];
        const z = basePos[i + 1];
        p[i + 2] = Math.sin(x * 1.5 + t * 1.7) * 0.07 + Math.cos(z * 1.6 + t * 1.2) * 0.07;
      }
      surfGeoRef.current.attributes.position.needsUpdate = true;
    }

    if (puckRef.current) {
      puckRef.current.position.y = 3.05 + Math.sin(t * 1.5) * 0.06;
    }
    if (ledMatRef.current) {
      ledMatRef.current.emissiveIntensity = 1.4 + Math.sin(t * 3.4) * 1.1;
    }

    ringsRef.current.forEach((r, i) => {
      if (r) {
        r.rotation.z += 0.0022 * (i + 1);
        r.position.y = -0.4 + i * 0.5 + Math.sin(t * 0.7 + i) * 0.12;
      }
    });

    if (particlesRef.current) {
      const a = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        a[i * 3 + 1] -= particleSpeeds[i];
        if (a[i * 3 + 1] < -5) a[i * 3 + 1] = 7;
      }
      particleGeo.attributes.position.needsUpdate = true;
    }

    if (!isReduced && rigRef.current) {
      mouse.mx += (mouse.tx - mouse.mx) * 0.045;
      mouse.my += (mouse.ty - mouse.my) * 0.045;
      rigRef.current.rotation.y = t * 0.13 + mouse.mx * 0.5;
      rigRef.current.rotation.x = 0.13 + mouse.my * 0.18;
      camera.position.x = mouse.mx * 1.1;
      camera.lookAt(0, 0.4, 0);
    }
  });

  return (
    <>
      <ambientLight color={0x8fa8cc} intensity={0.75} />
      <pointLight position={[5, 7, 6]} color={0x3fa9f0} intensity={2.2} distance={40} />
      <pointLight position={[-7, -2, 4]} color={0xffa03c} intensity={1.1} distance={34} />
      <directionalLight position={[-4, 5, -6]} color={0xe4effa} intensity={0.55} />

      <group ref={rigRef} rotation={[0.13, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[2.5, 2.2, 5.4, 64, 1, true]} />
          <meshStandardMaterial
            color={0x9fb4d4}
            metalness={0.1}
            roughness={0.35}
            transparent
            opacity={0.13}
            side={THREE.DoubleSide}
          />
        </mesh>

        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 1.9 - i * 1.25, 0]}>
            <torusGeometry args={[2.42 - i * 0.04, 0.035, 10, 64]} />
            <meshStandardMaterial color={0x7c99ba} roughness={0.6} transparent opacity={0.35} />
          </mesh>
        ))}

        <mesh ref={waterMeshRef} position={[0, -2.7 + 0.5, 0]}>
          <cylinderGeometry args={[2.34, 2.12, 1, 48]} />
          <meshStandardMaterial color={0x3fa9f0} transparent opacity={0.42} roughness={0.1} metalness={0.25} />
        </mesh>

        <mesh ref={surfMeshRef} rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={surfGeo} ref={surfGeoRef} attach="geometry" />
          <meshStandardMaterial
            color={0x8fd3ff}
            transparent
            opacity={0.58}
            roughness={0.05}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        <group ref={puckRef} position={[1.55, 3.05, 0]}>
          <mesh>
            <cylinderGeometry args={[0.46, 0.5, 0.3, 32]} />
            <meshStandardMaterial color={0x3fa9f0} roughness={0.28} metalness={0.45} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              ref={ledMatRef}
              color={0xffffff}
              emissive={0x3fa9f0}
              emissiveIntensity={2}
            />
          </mesh>
        </group>

        <mesh position={[1.55, 1.9, 0]}>
          <coneGeometry args={[0.62, 2.4, 28, 1, true]} />
          <meshBasicMaterial color={0x3fa9f0} transparent opacity={0.07} side={THREE.DoubleSide} />
        </mesh>

        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) ringsRef.current[i] = el;
            }}
            rotation={[Math.PI / 2 + (i - 1) * 0.22, 0, 0]}
            position={[0, -0.4 + i * 0.5, 0]}
          >
            <torusGeometry args={[3.3 + i * 0.5, 0.008, 8, 100]} />
            <meshBasicMaterial
              color={i === 1 ? 0xffa03c : 0x3fa9f0}
              transparent
              opacity={0.3 - i * 0.07}
            />
          </mesh>
        ))}
      </group>

      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial color={0x3fa9f0} size={0.055} transparent opacity={0.55} />
      </points>
    </>
  );
};

export const HeroTank3D: React.FC<{ level: number }> = ({ level }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      id="scene"
      className={`absolute inset-y-0 right-0 w-full lg:w-[56%] transition-opacity duration-1000 ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 1.6, 12], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.6]}
      >
        <HeroTankScene level={level} />
      </Canvas>
    </div>
  );
};
