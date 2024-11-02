import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import { BallCollider, CylinderCollider, RigidBody } from "@react-three/rapier";

const baubleMaterial = new THREE.MeshLambertMaterial({
  color: "#c0a0a0",
  emissive: "#ae71d1",
});
const capMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.75,
  roughness: 0.15,
  color: "#8a492f",
  emissive: "#600000",
  envMapIntensity: 20,
});
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

function Bauble({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}: {
  scale?: any;
  vec?: THREE.Vector3;
  r?: any;
}) {
  const api = useRef<any>(null);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    if (api && api.current) {
      api.current.applyImpulse(
        vec
          .copy(api.current.translation())
          .normalize()
          .multiply(
            new THREE.Vector3(
              -50 * delta * scale,
              -150 * delta * scale,
              -50 * delta * scale
            )
          )
      );
    }
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) + 25, r(30) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={baubleMaterial}
      />
    </RigidBody>
  );
}

export default memo(Bauble);
