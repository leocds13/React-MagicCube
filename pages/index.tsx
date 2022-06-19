import type { NextPage } from "next";
import { useState } from "react";
import { CanvasComponent } from "../src/components/atoms/Canvas";
import { Cube, CubeActions } from "../src/components/organisms/Cube";

const Home: NextPage = () => {
	const [action, setAction] = useState<CubeActions>(null);

	return (
		<div>
			<h1>My Magic Cube</h1>
			<CanvasComponent
				backgroundColor="#eee"
				height={300}
			>
				<Cube cubieSize={1} action={action} />
			</CanvasComponent>
			<input type="text" value={action||''} onChange={(e)=>{ 
				if (e.target.value !== '') {
					setAction(e.target.value[e.target.value.length-1] as CubeActions);
				} else if (e.target.value === '') {
					setAction(null);
				}
			}} />
			<button onClick={() => {
				for(let i = 0; i < 10; i++) {
					setAction(action === 'f' ? 'F' : 'f');
				}
			}}>Run</button>
		</div>
	);
};

export default Home;
