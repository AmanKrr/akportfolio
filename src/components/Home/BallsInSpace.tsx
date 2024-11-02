import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { memo, useMemo } from "react";
import Pointer from "./Pointer";
import Bauble from "./Bauble";
import Pointer2d from "./Pointer2d";

const baubles = [...Array(45)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
}));

const BallsInSpace = () => {
  const baubles = useMemo(
    () =>
      [...Array(45)].map(() => ({
        scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
      })),
    []
  );

  return (
    <div
      className="can"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight
          position={[0, -15, -0]}
          intensity={4}
          color="#ae71d1"
        />
        <Physics gravity={[0, 0, 0]}>
          {/* <Pointer2d /> */}
          <Pointer />
          {
            baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */
          }
        </Physics>
        <Environment files="/adamsbridge.hdr" />
        <EffectComposer disableNormalPass={true} multisampling={5000}>
          <N8AO color="#ae71d1" aoRadius={2} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default memo(BallsInSpace);
