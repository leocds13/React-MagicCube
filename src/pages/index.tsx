import type { NextPage } from "next";
import { useState } from "react";
import { CanvasComponent } from "../components/atoms/Canvas";
import { Cube, CubeActions } from "../components/organisms/Cube";
import { ArrowClockwise, ArrowCounterClockwise } from "phosphor-react";

// l, B L l f UU B l R B u B bbb d L D B d L
const Home: NextPage = () => {
	const [action, setAction] = useState<CubeActions>(null);
	const [actionsHist, setActionsHist] = useState<CubeActions[]>([]);

	function shuffle() {
		let count = 0;

		const times = Math.floor(Math.random() * 10) + 14;
		const f = () => {
			if (count < times) {
				let actions: CubeActions[] = [
					"W",
					"Y",
					"R",
					"O",
					"G",
					"B",
					"w",
					"y",
					"r",
					"o",
					"g",
					"b",
				];
				let act = actions[
					Math.floor(Math.random() * actions.length)
				] as CubeActions;

				setAction(act);
				setActionsHist((actiualActionsHist) => [
					act,
					...actiualActionsHist,
				]);

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
		setActionsHist([newAction, ...actionsHist]);
	}

	return (
		<div className="p-[5%]">
			<h1 className="text-2xl m-2 font-bold">Meu Cubo Magico</h1>
			<div className="flex gap-2">
				<CanvasComponent backgroundColor="#eee" height={400}>
					<Cube
						cubieSize={0.75}
						action={action}
						setAction={setAction}
					/>
				</CanvasComponent>
				<div className="flex flex-wrap justify-center items-center w-1/3">
					<div className="flex-[100%] flex justify-center items-center">
						<button
							onClick={shuffle}
							className="bg-slate-400 p-2 rounded-md"
						>
							Embaralhar
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-white w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("W");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">W</span>
							<ArrowClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-white w-fill p-1 rounded-full m-2 border relative relative"
							onClick={() => {
								HandleClickRotation("w");
							}}
						>
							<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">w</span>
							<ArrowCounterClockwise
								size={40}
								color="#000000"
								weight="fill"
								className=""
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-green-500 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("G");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">G</span>
							<ArrowClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-green-500 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("g");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">g</span>
							<ArrowCounterClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-orange-500 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("O");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">O</span>
							<ArrowClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-orange-500 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("o");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">o</span>
							<ArrowCounterClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-yellow-500 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("Y");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">Y</span>
							<ArrowClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-yellow-500 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("y");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">y</span>
							<ArrowCounterClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-blue-700 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("B");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">B</span>
							<ArrowClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-blue-700 w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("b");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">b</span>
							<ArrowCounterClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-[#f1171d] w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("R");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">R</span>
							<ArrowClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
					<div className="flex-[50%] flex justify-center items-center">
						<button
							className="bg-[#f1171d] w-fill p-1 rounded-full m-2 border relative"
							onClick={() => {
								HandleClickRotation("r");
							}}
						>
						<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">r</span>
							<ArrowCounterClockwise
								size={40}
								color="#000000"
								weight="fill"
							/>
						</button>
					</div>
				</div>
			</div>
			<div className="h-15 mt-4 m-2 px-2 py-4 bg-slate-200 rounded-lg border border-black flex gap-1 items-center text-lg
        overflow-x-auto
        scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-300">
				{actionsHist.map((act, i) => (
					<span key={i}>{act}</span>
				))}
			</div>
			<div className="mt-4 m-2 p-2 bg-slate-200 rounded-lg border border-black">
				<h4 className="text-lg font-semibold mb-2">Legenda</h4>

				<ul>
					<li>B ou b: Centro branco (White)</li>
					<li>Y ou y: Centro amarelo (Yellow)</li>
					<li>R ou r: Centro vermelho (Red)</li>
					<li>O ou o: Centro Laranja (Orange)</li>
					<li>G ou g: Centro verde (Green)</li>
					<li>B ou b: Centro azul (Blue)</li>
				</ul>
				<p className="mt-2">
					<b>Maiusculo</b> -{">"} Horário
					<br />
					<b>Minuscolo</b> -{">"} Anti-horário
				</p>
			</div>
		</div>
	);
};

export default Home;
