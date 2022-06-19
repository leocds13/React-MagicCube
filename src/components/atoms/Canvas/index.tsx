import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface CanvasProps {
    children: React.ReactNode;
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    ambientLightIntensity?: number;
    orbitCamera?: boolean;
}

export const CanvasComponent: React.FC<CanvasProps> = ({
    children,
    width = '100%',
    height = '100%',
    backgroundColor = 'inherit',
    ambientLightIntensity = 0.5,
    orbitCamera = true,
}: CanvasProps) => {
  return <Canvas style={{width, height, backgroundColor}}>
    {orbitCamera && <OrbitControls />}
    <ambientLight intensity={ambientLightIntensity} />
    {children}
  </Canvas>;
}