"use client";
import "../../styles/Skills/skill.scss";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { easing } from "maath";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Html,
  ScrollControls,
  RoundedBox,
  Scroll,
  useScroll,
} from "@react-three/drei";
import { skillsData } from "./skillsContent";

const GOLDENRATIO = 1.61803398875;

function Frame({ index, position, scale, c = new THREE.Color(), ...props }) {
  const [hover, setHover] = useState(false);
  const { width } = useThree((state) => state.viewport);
  const ref = useRef(null);
  const scroll = useScroll();
  // const click = () => (state.clicked = index === clicked ? null : index)
  const over = () => setHover(true);
  const out = () => setHover(false);
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / skillsData.skills.length - 1.5 / skillsData.skills.length,
      4 / skillsData.skills.length
    );
    // easing.damp3(ref.current.scale, [scale[0], 4 + y, 1], 0.15, delta);
    // ref.current.material.scale[0] = ref.current.scale.x;
    // ref.current.material.scale[1] = ref.current.scale.y;
    // if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
    // if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
    // if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
    // easing.damp(
    //   ref.current.material,
    //   "grayscale",
    //   hover ? 0 : Math.max(0, 1 - y),
    //   0.15,
    //   delta
    // );
    // easing.dampC(
    //   ref.current.material.color,
    //   hover ? "white" : "#aaa",
    //   hover ? 0.3 : 0.15,
    //   delta
    // );
  });

  const _GAP = 0.2;
  const _W = 0.7;
  const xW = _W + _GAP;
  return (
    <group {...props}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial color={"white"} />
      </mesh>
      {/* <Html position={position}>
        <h1>Aman</h1>
      </Html> */}
    </group>
  );
}

function Frames({ previousPosition }) {
  const { width } = useThree((state) => state.viewport);
  const _MIN_GAP = 0.15; // Minimum gap between frames
  const _W = 0.7;

  // const constantGap = (function gapCalculation() {
  //   const gap = [0];
  //   let totalGap = 0;
  //   skillsData &&
  //     skillsData.skills &&
  //     skillsData.skills.map((items) => {
  //       totalGap += items.width + _MIN_GAP;
  //       gap.push(totalGap);
  //     });
  //   console.log(gap);
  //   return gap;
  // })();

  const constantGap = [
    0, 2.15, 4.05, 5.7, 7.1, 8.25, 9.9, 12.05, 14.200000000000001, 16.35, 18.26,
    20,
  ];

  const totalW = skillsData.skills.reduce(
    (totalWidth, skill) => totalWidth + skill.width,
    0
  );

  const numFrames = skillsData.skills.length;
  const totalGap = Math.max((_W - totalW) / (numFrames - 1), _MIN_GAP); // Adjusted gap
  const xW = _W + totalGap;

  return (
    <ScrollControls
      horizontal
      damping={0.1}
      pages={(width - (xW + 1) + numFrames * (xW + 1)) / width}
    >
      <Scroll>
        {skillsData &&
          skillsData.skills.map((items, i) => {
            console.log(i, constantGap[i]);
            return (
              <Frame
                key={items.skillName + i}
                position={[constantGap[i], 0, 0]}
                scale={[items.width, 5, 0]}
                index={i}
              />
            );
          })}
      </Scroll>
    </ScrollControls>
  );
}

function Skills3d() {
  let previousPosition = 0;
  return (
    <div className="skillsContainer">
      {/* <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      > */}
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        {/* <ambientLight intensity={1} />
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
        /> */}
        <color attach="background" args={["#191920"]} />
        {/* <fog attach="fog" args={["#191920", 0, 15]} /> */}
        <Frames previousPosition={previousPosition} />
        {/* <Environment preset="city" /> */}
      </Canvas>
    </div>
  );
}

export default Skills3d;
