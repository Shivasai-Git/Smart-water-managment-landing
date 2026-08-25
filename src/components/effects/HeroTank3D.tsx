import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroTankSceneProps {
  level: number;
  isVisible: boolean;
}

const HeroTankScene: React.FC<HeroTankSceneProps> = ({ level, isVisible }) => {
  const isReduced = useReducedMotion();
  const { size } = useThree();

  const rigRef = useRef<THREE.Group>(null!);
  const waterMeshRef = useRef<THREE.Mesh>(null!);
  const surfMeshRef = useRef<THREE.Mesh>(null!);
  const puckRef = useRef<THREE.Group>(null!);
  const ledMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const compact = size.width < 768;
  const surfGeo = useMemo(() => new THREE.CircleGeometry(2.38, compact ? 24 : 48), [compact]);

  const mouseRef = useRef({ tx: 0, ty: 0, mx: 0, my: 0 });

  useEffect(() => {
    if (compact) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [compact]);

  useFrame((state) => {
    if (!isVisible) return;

    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;

    // Smooth level animation (target height based on percentage 0..100)
    const targetH = 0.6 + (level / 100) * 4.4;
    if (waterMeshRef.current) {
      waterMeshRef.current.scale.y += (targetH - waterMeshRef.current.scale.y) * 0.05;
      waterMeshRef.current.position.y = -2.7 + waterMeshRef.current.scale.y / 2;

      if (surfMeshRef.current) {
        const targetSurfY = waterMeshRef.current.position.y + waterMeshRef.current.scale.y / 2;
        surfMeshRef.current.position.y += (targetSurfY - surfMeshRef.current.position.y) * 0.05;
        if (!isReduced) {
          surfMeshRef.current.rotation.z = Math.sin(t * 1.2) * 0.02;
        }
      }
    }

    // Ultrasonic sensor pulse
    if (ledMatRef.current) {
      ledMatRef.current.emissiveIntensity = 1.6 + Math.sin(t * 3.0) * 0.8;
    }

    // Subtle gentle camera parallax
    if (!isReduced && !compact && rigRef.current) {
      mouse.mx += (mouse.tx - mouse.mx) * 0.04;
      mouse.my += (mouse.ty - mouse.my) * 0.04;
      rigRef.current.rotation.y = 0.15 + mouse.mx * 0.35;
      rigRef.current.rotation.x = 0.12 + mouse.my * 0.15;
      state.camera.position.x = mouse.mx * 0.8;
      state.camera.lookAt(0, 0.2, 0);
    }
  });

  return (
    <>
      {/* Precision Industrial Lighting & Local Backlight */}
      <ambientLight color={0xa0c4e8} intensity={0.9} />
      
      {/* Cyan Key Light */}
      <pointLight position={[6, 8, 7]} color={0x18bff2} intensity={3.2} distance={30} />
      
      {/* Soft Teal Fill Light */}
      <pointLight position={[-6, -1, 5]} color={0x087ea8} intensity={2.0} distance={25} />
      
      {/* Crisp Rim Light behind tank for separation */}
      <pointLight position={[0, 3, -6]} color={0x72e4ff} intensity={3.5} distance={20} />
      
      {/* Overhead Directional Highlight */}
      <directionalLight position={[-2, 6, -3]} color={0xe4effa} intensity={1.2} />

      <group ref={rigRef} rotation={[0.12, 0.15, 0]}>
        {/* Soft Radial Backing Disc for Strong Figure-Ground Separation */}
        <mesh position={[0, 0.2, -3.2]}>
          <planeGeometry args={[11, 11]} />
          <meshBasicMaterial
            color={0x072836}
            transparent
            opacity={0.38}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Cylinder: Crisp Translucent Industrial Polycarbonate */}
        <mesh>
          <cylinderGeometry args={[2.55, 2.35, 5.6, compact ? 28 : 48, 1, true]} />
          <meshStandardMaterial
            color={0x658fae}
            metalness={0.2}
            roughness={0.2}
            transparent
            opacity={0.32}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Structural Reinforcement Bands */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 2.3 - i * 1.15, 0]}>
            <torusGeometry args={[2.53 - i * 0.04, 0.042, 8, compact ? 24 : 48]} />
            <meshStandardMaterial
              color={i === 0 || i === 4 ? 0x3fa9f0 : 0x184763}
              roughness={0.3}
              metalness={0.65}
              emissive={i === 0 ? 0x087ea8 : 0x000000}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}

        {/* Internal Active Water Column (High Visibility 75%+ opacity) */}
        <mesh ref={waterMeshRef} position={[0, -2.7 + 0.5, 0]}>
          <cylinderGeometry args={[2.42, 2.22, 1, compact ? 24 : 40]} />
          <meshStandardMaterial
            color={0x18bff2}
            transparent
            opacity={0.78}
            roughness={0.08}
            metalness={0.35}
          />
        </mesh>

        {/* Internal Water Surface Meniscus */}
        <mesh ref={surfMeshRef} rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={surfGeo} attach="geometry" />
          <meshStandardMaterial
            color={0x72e4ff}
            transparent
            opacity={0.88}
            roughness={0.04}
            metalness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top Ultrasonic Sensor Node */}
        <group ref={puckRef} position={[1.4, 3.15, 0]}>
          {/* Puck Housing */}
          <mesh>
            <cylinderGeometry args={[0.42, 0.48, 0.35, compact ? 16 : 28]} />
            <meshStandardMaterial color={0x0f2b3c} roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Glowing Status LED */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial
              ref={ledMatRef}
              color={0x72e4ff}
              emissive={0x18bff2}
              emissiveIntensity={2.2}
            />
          </mesh>
          {/* Downward Sensing Acoustic Cone */}
          <mesh position={[0, -1.3, 0]}>
            <coneGeometry args={[0.65, 2.5, compact ? 12 : 24, 1, true]} />
            <meshBasicMaterial
              color={0x18bff2}
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Inlet Pipe Entry Spout (Right side) */}
        <group position={[2.4, 2.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 1.0, 16]} />
            <meshStandardMaterial color={0x12364a} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <torusGeometry args={[0.26, 0.05, 8, 16]} />
            <meshStandardMaterial color={0x18bff2} roughness={0.2} metalness={0.5} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export const HeroTank3D: React.FC<{ level: number }> = ({ level }) => {
  const [mounted] = useState(() => typeof window !== 'undefined');
  const [isMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="scene"
      ref={containerRef}
      className={`absolute inset-y-0 right-0 w-full lg:w-[56%] transition-opacity duration-700 pointer-events-none ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 11], fov: 36, near: 0.1, far: 40 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={isMobile ? 1 : [1, 1.25]}
        frameloop={isVisible ? 'always' : 'demand'}
      >
        <HeroTankScene level={level} isVisible={isVisible} />
      </Canvas>
    </div>
  );
};
