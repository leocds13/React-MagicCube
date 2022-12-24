import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { CanvasComponent } from "../src/components/atoms/Canvas";
import { Cube, CubeActions } from "../src/components/organisms/Cube";
import { Cubie } from "../src/components/molecules/Cubie";
import {
  BoxGeometry,
  Euler,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";

// l, B L l f UU B l R B u B bbb d L D B d L
const Home: NextPage = () => {
  const [action, setAction] = useState<CubeActions>(null);

  function shuffle() {
    let count = 0;

    const times = Math.floor(Math.random() * 10) + 14;

    const f = () => {
      if (count < times) {
        let actions = [
          "F",
          "B",
          "L",
          "R",
          "U",
          "D",
          "f",
          "b",
          "l",
          "r",
          "u",
          "d",
        ];
        let act = actions[
          Math.floor(Math.random() * actions.length)
        ] as CubeActions;
        console.log(act);
        setAction(act);
        count++;
        setTimeout(f, 1000);
      }
    };
    f();
  }

  const geo = new BoxGeometry(1, 1, 1);
  const mat = new MeshBasicMaterial({
    color: 0x666666,
  });
  const cube = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (cube.current) {
      cube.current!.rotation.set(0, 0, 0);
      cube.current!.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2); // Apends to actual rotation
      cube.current!.rotateOnAxis(new Vector3(0, 0, 1), -Math.PI / 2); // Apends to actual rotation
    }
  }, []);

  return (
    <div
      style={{
        padding: "0 5%",
      }}
    >
      <h1>My Magic Cube</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CanvasComponent backgroundColor="#eee" width={"50%"} height={400}>
          <Cube cubieSize={0.75} action={action} />
          {/* <mesh 
						geometry={new BoxGeometry(1, 1, 1)}
						material={new MeshBasicMaterial({
							color: 0x00FFAA
						})}
						rotation={[Math.PI*1.5, Math.PI*0, Math.PI*1]}
					> */}
          <mesh ref={cube}>
            <mesh
              material={mat}
              geometry={geo}
              position={new Vector3(-1, 1, 1)}
            />
          </mesh>
          {/* </mesh> */}
        </CanvasComponent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={action || ""}
            style={{
              margin: "2em 0",
            }}
            onChange={(e) => {
              if (e.target.value !== "") {
                setAction(
                  e.target.value[e.target.value.length - 1] as CubeActions
                );
              } else if (e.target.value === "") {
                setAction(null);
              }
            }}
          />
          <button
            onClick={() => {
              shuffle();
            }}
          >
            Embaralhar
          </button>
        </div>

        <ul>
          <li>F ou f: Face</li>
          <li>B ou b: Trás</li>
          <li>L ou l: Esquerda</li>
          <li>R ou r: Direita</li>
          <li>U ou u: Topo</li>
          <li>D ou d: Base</li>
        </ul>
        <p>
          <b>Maiusculo</b> -{">"} Horário
          <br />
          <b>Minuscolo</b> -{">"} Anti-horário
        </p>
      </div>
    </div>
  );
};

export default Home;
