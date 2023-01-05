import type { NextPage } from "next";
import { useState } from "react";
import { CanvasComponent } from "../components/atoms/Canvas";
import {
	Cube,
	CubeActions,
	CubeActionsKeys,
} from "../components/organisms/Cube";
import { RotateButton } from "../components/RotateButton";

const listOfActions = Object.keys(CubeActions).filter(key => isNaN(Number(key)) && key !== "length") as CubeActionsKeys[];

// l, B L l f UU B l R B u B bbb d L D B d L
const Home: NextPage = () => {
	const [action, setAction] = useState<CubeActionsKeys | null>(null);
	const [actionsHist, setActionsHist] = useState<CubeActionsKeys[]>([]);

	function shuffle() {
		let count = 0;

		const times = Math.floor(Math.random() * 10) + 14;
		const f = () => {
			if (count < times) {
				let act = listOfActions[
					Math.floor(Math.random() * CubeActions.length)
				];

				setAction(act as CubeActionsKeys);
				setActionsHist((actiualActionsHist) => [
					act as CubeActionsKeys,
					...actiualActionsHist,
				]);

				count++;
				setTimeout(f, 100);
			} else {
				// UnCommento lines below to test. It shold shuffle and executes the spets backwords, returning to the origins
				// console.log(actionsHist);
				// b();
			}
		};

		const b = () => {
			let act = actionsHist.pop();
			console.log(act);
			if (act) {
				if (act === act.toUpperCase()) {
					setAction(act!.toLowerCase() as CubeActionsKeys);
				} else {
					setAction(act!.toUpperCase() as CubeActionsKeys);
				}
			}
			count--;
			if (count > 0) {
				setTimeout(b, 100);
			}
		};
		f();
	}

	function HandleClickRotation(newAction: CubeActionsKeys) {
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
					{listOfActions.map((act) => {
						return (
							<div
								className="flex-[50%] flex justify-center items-center"
								key={act}
							>
								<RotateButton
									HandleClickRotation={HandleClickRotation}
									action={act as CubeActionsKeys}
									icon={
										act === act.toUpperCase()
											? "ArrowClockwise"
											: "ArrowCounterClockwise"
									}
									className={
										act.toUpperCase() == "W"
											? "bg-white"
											: act.toUpperCase() == "G"
											? "bg-green-500"
											: act.toUpperCase() == "O"
											? "bg-orange-500"
											: act.toUpperCase() == "Y"
											? "bg-yellow-500"
											: act.toUpperCase() == "B"
											? "bg-blue-700"
											: act.toUpperCase() == "R"
											? "bg-[#f1171d]"
											: ""
									}
								/>
							</div>
						);
					})}
				</div>
			</div>
			<div
				className="h-15 mt-4 m-2 px-2 py-4 bg-slate-200 rounded-lg border border-black flex gap-1 items-center text-lg
        overflow-x-auto
        scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-300"
			>
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
