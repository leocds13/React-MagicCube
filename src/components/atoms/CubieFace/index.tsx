import React from 'react';
import * as THREE from 'three';

interface CubieFaceProps {
    size: number;
    color: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
};

export const CubieFace = ({
    size,
    color,
    position,
    rotation,
}: CubieFaceProps) => {
  const geometry = new THREE.BoxGeometry(size, size, 0.01);
  const material = new THREE.MeshStandardMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(position.x, position.y, position.z);
  cube.rotation.set(rotation.x, rotation.y, rotation.z);

  const edge = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({ color: 'black' }));
  cube.add(line);

  return (
      <primitive object={cube} />
  );
  // return (
  //   <mesh
  //     position={[position.x, position.y, position.z]}
  //     rotation={[rotation.x, rotation.y, rotation.z]}
  //   >
  //     <boxBufferGeometry ref={box} args={[size, size, 0.01]} />
  //     <edgesGeometry attach="edges" args={[box.current!]} />
  //     <meshStandardMaterial color={color}  />
  //   </mesh>
  // );
}