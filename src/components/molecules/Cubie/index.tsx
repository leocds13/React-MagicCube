import { useEffect, useRef } from "react";
import { CubieFace } from "../../atoms/CubieFace";
import { Quaternion, Vector3 } from "three";

type Axies = {
  x: number;
  y: number;
  z: number;
};

type CubieProps = {
  size?: number;
  position?: Vector3;
  rotation?: Quaternion;
  color?: string;
};

export const Cubie = ({
  size = 1,
  position = new Vector3(0, 0, 0),
  rotation = new Quaternion(0, 0, 0),
  color,
}: CubieProps) => {
  const faces = useRef<THREE.Group>(null);
  const cubie = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (cubie.current && faces.current) {
      faces.current.position.set(
        position.x * size,
        position.y * size,
        position.z * size
      );
      faces.current.rotation.setFromQuaternion(rotation);
    }
  }, [position, rotation, size]);

  return (
    <mesh ref={cubie}>
      <group ref={faces}>
        <CubieFace
          size={size}
          color={color || "white"}
          position={{ x: 0, y: 0, z: size / 2 }}
          rotation={{ x: 0, y: 0, z: 0 }}
        />
        <CubieFace
          size={size}
          color={color || "yellow"}
          position={{ x: 0, y: 0, z: size / -2 }}
          rotation={{ x: 0, y: 0, z: 0 }}
        />
        <CubieFace
          size={size}
          color={color || "red"}
          position={{ x: size / -2, y: 0, z: 0 }}
          rotation={{ x: 0, y: Math.PI / 2, z: 0 }}
        />
        <CubieFace
          size={size}
          color={color || "orange"}
          position={{ x: size / 2, y: 0, z: 0 }}
          rotation={{ x: 0, y: Math.PI / 2, z: 0 }}
        />
        <CubieFace
          size={size}
          color={color || "green"}
          position={{ x: 0, y: size / 2, z: 0 }}
          rotation={{ x: Math.PI / 2, y: 0, z: 0 }}
        />
        <CubieFace
          size={size}
          color={color || "blue"}
          position={{ x: 0, y: size / -2, z: 0 }}
          rotation={{ x: Math.PI / 2, y: 0, z: 0 }}
        />
      </group>
    </mesh>
  );
};
