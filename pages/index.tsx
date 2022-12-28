import type { NextPage } from "next";
import { useState } from "react";
import { CanvasComponent } from "../src/components/atoms/Canvas";
import { Cube, CubeActions } from "../src/components/organisms/Cube";

// l, B L l f UU B l R B u B bbb d L D B d L
const Home: NextPage = () => {
  const [action, setAction] = useState<CubeActions>(null);

  function shuffle() {
    let count = 0;

    const times = Math.floor(Math.random() * 10) + 14;
    let actionsHist: CubeActions[] = [];
    const f = () => {
      if (count < times) {
        let actions: CubeActions[] = [
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
        
        setAction(act);
        actionsHist.push(act);

        count++;
        setTimeout(f, 100);
      } else {
        // console.log(actionsHist);
        // b();
      }
    };

    const b = () => {
      let act = actionsHist.pop();
      console.log(act);
      if (act) {
        if (act === act.toUpperCase()) {
          setAction(act!.toLowerCase() as CubeActions);
        } else {
          setAction(act!.toUpperCase() as CubeActions);
        }
      }
      count--;
      if (count > 0) {
        setTimeout(b, 100);
      }
    };
    f();
  }

  function HandleClickRotation(newAction: CubeActions) {
      setAction(newAction);
  }

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
          alignItems: "center",
          gap: "2em",
        }}
      >
        <CanvasComponent backgroundColor="#eee" width={"50%"} height={400}>
          <Cube cubieSize={0.75} action={action} setAction={setAction} />
        </CanvasComponent>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "100%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button onClick={shuffle}>Embaralhar</button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "white", width: "50%" }}
              onClick={() => {
                HandleClickRotation("F");
              }}
            >
              O
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "white", width: "50%" }}
              onClick={() => {
                HandleClickRotation("f");
              }}
            >
              A
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "green", width: "50%" }}
              onClick={() => {
                HandleClickRotation("U");
              }}
            >
              O
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "green", width: "50%" }}
              onClick={() => {
                HandleClickRotation("u");
              }}
            >
              A
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "orange", width: "50%" }}
              onClick={() => {
                HandleClickRotation("R");
              }}
            >
              O
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "orange", width: "50%" }}
              onClick={() => {
                HandleClickRotation("r");
              }}
            >
              A
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "yellow", width: "50%" }}
              onClick={() => {
                HandleClickRotation("B");
              }}
            >
              O
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "yellow", width: "50%" }}
              onClick={() => {
                HandleClickRotation("b");
              }}
            >
              A
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "blue", width: "50%" }}
              onClick={() => {
                HandleClickRotation("D");
              }}
            >
              O
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "blue", width: "50%" }}
              onClick={() => {
                HandleClickRotation("d");
              }}
            >
              A
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "red", width: "50%" }}
              onClick={() => {
                HandleClickRotation("L");
              }}
            >
              O
            </button>
          </div>
          <div
            style={{
              flex: "50%",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "red", width: "50%" }}
              onClick={() => {
                HandleClickRotation("l");
              }}
            >
              A
            </button>
          </div>
        </div>
        {/* <div
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
        </p> */}
      </div>
    </div>
  );
};

export default Home;
