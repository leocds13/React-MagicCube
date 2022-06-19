import type { NextPage } from "next";
import { useState } from "react";
import { CanvasComponent } from "../src/components/atoms/Canvas";
import { Cube, CubeActions } from "../src/components/organisms/Cube";

const Home: NextPage = () => {
	const [action, setAction] = useState<CubeActions>(null);

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
				<CanvasComponent
					backgroundColor="#eee"
					width={"50%"}
					height={400}
				>
					<Cube cubieSize={0.75} action={action} />
				</CanvasComponent>
				<input
					type="text"
					value={action || ""}
					style={{
						margin: '2em 0',
					}}
					onChange={(e) => {
						if (e.target.value !== "") {
							setAction(
								e.target.value[
									e.target.value.length - 1
								] as CubeActions
							);
						} else if (e.target.value === "") {
							setAction(null);
						}
					}}
				/>

				<ul>
					<li>F ou f: Face</li>
					<li>B ou b: Trás</li>
					<li>L ou l: Esquerda</li>
					<li>R ou r: Direita</li>
					<li>U ou u: Topo</li>
					<li>D ou d: Base</li>
				</ul>
				<p>
					<b>Maiusculo</b> -{">"} Horário<br/>
					<b>Minuscolo</b> -{">"} Anti-horário
				</p>
			</div>
		</div>
	);
};

export default Home;
