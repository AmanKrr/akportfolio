"use client";
import "../../styles/Skills/skill.scss";
import { memo, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, OrbitControls, Plane, Box, Reflector } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

function Ground(props) {
  const [floor, normal] = useTexture(["/assets/SurfaceImperfections003_1K_var1.jpg", "/assets/SurfaceImperfections003_1K_Normal.jpg"]);
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {/* @ts-ignore */}
      {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector>
  );
}

function Rig({ children }) {
  const ref = useRef<any>();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    if (ref && ref.current) {
      camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
      ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1);
    }
  });
  return <group ref={ref}>{children}</group>;
}

function Frame({
  photoUrl,
  position,
  ImageArgs,
  borderArgs,
  rotation,
}: {
  photoUrl: string;
  position: any;
  borderArgs: any;
  ImageArgs: any;
  rotation?: any;
}) {
  const texture = useTexture(photoUrl);

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {/* Outer frame box with thickness */}
      <Box args={borderArgs}>
        <meshStandardMaterial color="#404040" />
      </Box>

      {/* Inner image plane, slightly in front of the box frame */}
      <Plane args={ImageArgs} position={[0, 0, 0.06]} onPointerEnter={() => console.log("Cliked")}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </Plane>
    </group>
  );
}

function Gallery() {
  return (
    <Canvas dpr={[1, 1.5]}>
      <color attach="background" args={["black"]} />
      <ambientLight />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      {/* <OrbitControls /> */}
      <Suspense fallback={null}>
        <Rig>
          <Frame photoUrl="/assets/Javascript.jpg" position={[-1, 1, -0.96]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Frame photoUrl="/assets/React.jpg" position={[1.2, 2, -0.96]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Frame photoUrl="/assets/Node.jpg" position={[1, 0.2, -0.3]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Frame photoUrl="/assets/Python.jpg" position={[2.5, 0.2, -2]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Frame photoUrl="/assets/Three.js.jpg" position={[-0.2, 0.2, -2]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />

          <Frame photoUrl="/assets/Typescript.jpg" position={[-2.8, 0, -2.8]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Frame photoUrl="/assets/MongoDB.jpg" position={[-3, 0.7, -0.96]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          {/* <Frame photoUrl="/assets/Next.js.jpg" position={[3, 0.2, 0.5]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} rotation={[0, -0.8, 0]} /> */}
          <Frame photoUrl="/assets/Next.js.jpg" position={[3, 0.2, 0.5]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          {/* <Frame photoUrl="/assets/C++.jpg" position={[-2.8, 0.2, 1]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} rotation={[0, 0.8, 0]} /> */}
          <Frame photoUrl="/assets/C++.jpg" position={[-2.8, 0.2, 1]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Frame photoUrl="/assets/Django.jpg" position={[-2.9, 2.1, -3]} borderArgs={[1, 1, 0.1]} ImageArgs={[0.9, 0.9]} />
          <Ground mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.8} />
        </Rig>
        <EffectComposer multisampling={8}>
          <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.2} />
          <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.3} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

function Skills() {
  return (
    <div className="skillsContainer">
      <Gallery />
    </div>
  );
}

export default memo(Skills);
