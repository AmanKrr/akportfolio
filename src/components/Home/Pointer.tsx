import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { memo, useRef } from "react";

import * as THREE from "three";

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef<any>(null);
  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

export default memo(Pointer);
