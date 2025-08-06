'use client'
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  scale: number;
}

export function Planet(props: Props) {
  const shapeContainer = useRef<any>(null);
  const shperesContainer = useRef<any>(null);
  const ringContainer = useRef<any>(null);
  const { nodes, materials } = useGLTF("/models/Planet.glb");

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(shapeContainer.current.position, { y: 5, duration: 3, ease: "circ.out" });
    tl.from(shperesContainer.current.rotation, {
      x: 0,
      y: Math.PI,
      z: -Math.PI,
      duration: 10,
      ease: "power1.inOut",
    }, "-=25%"); //当上面那个动画执行完75%，在执行当前动画
    tl.from(ringContainer.current.rotation, {
      x: 0.8,
      y: 0,
      z: 0,
      duration: 10,
      ease: "power1.inOut",
    }, "<");
  }, []);

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={shperesContainer}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Sphere as any).geometry}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Sphere2 as any).geometry}
          material={materials["Material.001"]}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        />
      </group>
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={(nodes.Ring as any).geometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={2}
      />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
