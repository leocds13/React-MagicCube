import { FC, ReactNode, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DirectionalLight } from "three";

interface CanvasProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  ambientLightIntensity?: number;
  orbitCamera?: boolean;
  className?: string;
}

export const CanvasComponent: FC<CanvasProps> = ({
  children,
  width = "100%",
  height = "100%",
  backgroundColor = "inherit",
  ambientLightIntensity = 1,
  orbitCamera = true,
  className
}: CanvasProps) => {
  return (
    <Canvas
      className={className}
      style={{ width, height, backgroundColor }}
      camera={{ position: [2, 3, 7] }}
    >
      {orbitCamera && <OrbitControls />}
      {children}
      <MyLight intensity={ambientLightIntensity} />
    </Canvas>
  );
};

type MyLightProps = {
  intensity?: number;
};

const MyLight: FC<MyLightProps> = ({ intensity = 1 }) => {
  const lightRef1 = useRef<DirectionalLight>(null!);

  useFrame((state) => {
    const camPos = state.camera.position;
    lightRef1.current.position.set(camPos.x + 2, camPos.y + 3, camPos.z);
  });

  return (
    <>
      <directionalLight ref={lightRef1} intensity={intensity} />
      {/* <ambientLight intensity={intensity} /> */}
    </>
  );
};
