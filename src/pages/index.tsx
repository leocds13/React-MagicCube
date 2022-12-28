import type { NextPage } from "next";
import { useState } from "react";
import { CanvasComponent } from "../components/atoms/Canvas";
import { Cube, CubeActions } from "../components/organisms/Cube";
import { ArrowClockwise, ArrowCounterClockwise } from "phosphor-react";

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
    <div className="p-[5%]">
      <h1 className="text-2xl m-2 font-bold">My Magic Cube</h1>
      <div className="flex gap-2">
        <CanvasComponent backgroundColor="#eee" height={400}>
          <Cube cubieSize={0.75} action={action} setAction={setAction} />
        </CanvasComponent>
        <div className="flex flex-wrap justify-center items-center w-1/3">
          <div className="flex-[100%] flex justify-center items-center">
            <button onClick={shuffle} className="bg-slate-400 p-2 rounded-md">
              Embaralhar
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-white w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("F");
              }}
            >
              <ArrowClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-white w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("f");
              }}
            >
              <ArrowCounterClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-green-500 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("U");
              }}
            >
              <ArrowClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-green-500 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("u");
              }}
            >
              <ArrowCounterClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-orange-500 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("R");
              }}
            >
              <ArrowClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-orange-500 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("r");
              }}
            >
              <ArrowCounterClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-yellow-500 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("B");
              }}
            >
              <ArrowClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-yellow-500 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("b");
              }}
            >
              <ArrowCounterClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-blue-700 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("D");
              }}
            >
              <ArrowClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-blue-700 w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("d");
              }}
            >
              <ArrowCounterClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-[#f1171d] w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("L");
              }}
            >
              <ArrowClockwise size={30} color="#000000" weight="fill" />
            </button>
          </div>
          <div className="flex-[50%] flex justify-center items-center">
            <button
              className="bg-[#f1171d] w-fill p-1 rounded-full m-2 border"
              onClick={() => {
                HandleClickRotation("l");
              }}
            >
              <ArrowCounterClockwise size={30} color="#000000" weight="fill" />
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
