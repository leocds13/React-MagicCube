import { useEffect, useRef } from "react";
import { CubieFace } from "../../atoms/CubieFace";
import { Quaternion, Vector3 } from 'three';
import internal from "stream";
import { Console } from "console";

type CubieProps = {
    size?: number;
    position?: THREE.Vector3;
    rotation?: THREE.Quaternion;
    color?: string;
}

export const Cubie = ({
    size = 1,
    position = new Vector3(0 ,0 ,0),
    rotation = new Quaternion(0, 0, 0),
    color,
}: CubieProps) => {
    const faces = useRef<THREE.Group>(null);
    const cubie = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (cubie.current) {
            faces.current!.position.set(position.x, position.y, position.z);
            
            cubie.current!.rotation.set(0,0,0);
            cubie.current!.rotateOnWorldAxis(new Vector3(0,0,1), rotation.z);
            cubie.current!.rotateOnWorldAxis(new Vector3(0,1,0), rotation.y);
            cubie.current!.rotateOnWorldAxis(new Vector3(1,0,0), rotation.x);
            // cubie.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    },[position, rotation]);

    return (
        <mesh ref={cubie}>
            <group ref={faces}>
                <CubieFace size={size} color={color || "white"}  position={{x:0, y:0, z:size/2}}  rotation={{x:0, y:0, z:0}} />
                <CubieFace size={size} color={color || "yellow"} position={{x:0, y:0, z:size/-2}} rotation={{x:0, y:0, z:0}} />
                <CubieFace size={size} color={color || "red"}    position={{x:size/-2, y:0, z:0}} rotation={{x:0, y:(Math.PI/2), z:0}} />
                <CubieFace size={size} color={color || "orange"} position={{x:size/2, y:0, z:0}}  rotation={{x:0, y:(Math.PI/2), z:0}} />
                <CubieFace size={size} color={color || "green"}  position={{x:0, y:size/2, z:0}}  rotation={{x:(Math.PI/2), y:0, z:0}} />
                <CubieFace size={size} color={color || "blue"}   position={{x:0, y:size/-2, z:0}} rotation={{x:(Math.PI/2), y:0, z:0}} />
            </group>
        </mesh>
    );
}