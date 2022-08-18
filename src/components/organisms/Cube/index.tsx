import React, { useEffect, useState } from "react";

import { Cubie, CubieProps } from "../../molecules/Cubie";
import { Matrix3, Quaternion, Vector3 } from 'three';

export type CubeActions = "F"
| "B"
| "L"
| "R"
| "U"
| "D"
| "f"
| "b"
| "l"
| "r"
| "u"
| "d"
| null;

interface CubeProps {
	cubieSize?: number;
	action: CubeActions;
}

export const Cube: React.FC<CubeProps> = ({ cubieSize = 1, action }) => {
	const [cubies, setCubies] = useState<CubieProps[]>([]);
	// const [futureActions, setFutureActions] = useState<Exclude<CubeActions, null>[]>([]);
	// const [acting, setActing] = useState<boolean>(false);

	useEffect(() => {
		const newCubies: CubieProps[] = [];

		for (let x = -1; x <= 1; x++) {
			for (let y = 1; y >= -1; y--) {
				for (let z = 1; z >= -1; z--) {
					newCubies.push({
						size: cubieSize,
						position: new Vector3(x*cubieSize, y*cubieSize, z*cubieSize),
						rotation: new Quaternion(0, 0, 0),
					});
				}
			}
		}

		setCubies(newCubies);
	}, [cubieSize]);

	const rotations: Record<Exclude<CubeActions, null>, () => void> = {
		F: () => {
			rotateZ(1, 1);
		},
		f: () => {
			rotateZ(1, -1);
		},
		B: () => {
			rotateZ(-1, 1);
		},
		b: () => {
			rotateZ(-1, -1);
		},
		L: () => {
			rotateX(-1, -1);
		},
		l: () => {
			rotateX(-1, 1);
		},
		R: () => {
			rotateX(1, 1);
		},
		r: () => {
			rotateX(1, -1);
		},
		U: () => {
			rotateY(1, -1);
		},
		u: () => {
			rotateY(1, 1);
		},
		D: () => {
			rotateY(-1, 1);
		},
		d: () => {
			rotateY(-1, -1);
		},
	};

    useEffect(() => {
		if (action) {
			if (rotations[action]) {
				rotations[action]();
				// setFutureActions([...futureActions, action]);
				// console.log(action, futureActions);
			} else {
				console.warn(`Unknown action: ${action}`);
			}
        }
    }, [action]);

	// useEffect(() => {
	// 	if (!acting) {
	// 		if (futureActions.length > 0) {
	// 			setActing(true);
	// 			let act = futureActions[0];
	// 			rotations[act]().then(() => {
	// 				setActing(false);
	// 				setFutureActions([...futureActions.filter((_, i) => i > 0)]);
	// 			})
	// 		}
	// 	}
	// }, [futureActions]);
    
    function rotateX(face: -1 | 1, direction: -1 | 1) {
        let newCubies = cubies.map(cubie => {
            if (cubie.position!.x == face*cubieSize) {
				let angle = Math.PI / 2 * direction;

                let matrix = new Matrix3();
                matrix.translate(cubie.position!.y, cubie.position!.z);
                matrix.rotate(angle);

                cubie.position = new Vector3(cubie.position!.x, Math.round(matrix.elements[6])*cubieSize, Math.round(matrix.elements[7])*cubieSize);
                cubie.rotation = new Quaternion(cubie.rotation!.x - angle, cubie.rotation!.y, cubie.rotation!.z);
            }

            return cubie;
        });

        setCubies(newCubies);
    }

	function rotateY(face: -1 | 1, direction: -1 | 1) {
        let newCubies = cubies.map(cubie => {
            if (cubie.position!.y == face*cubieSize) {
				let angle = Math.PI / 2 * direction;

                let matrix = new Matrix3();
                matrix.translate(cubie.position!.x, cubie.position!.z);
                matrix.rotate(angle);

                cubie.position = new Vector3(Math.round(matrix.elements[6])*cubieSize, cubie.position!.y, Math.round(matrix.elements[7])*cubieSize);
                cubie.rotation = new Quaternion(cubie.rotation!.x, cubie.rotation!.y + angle, cubie.rotation!.z);
            }

            return cubie;
        });

        setCubies(newCubies);
    }

	function rotateZ(face: -1 | 1, direction: -1 | 1) {
        let newCubies = cubies.map(cubie => {
            if (cubie.position!.z == face*cubieSize) {
				let angle = Math.PI / 2 * direction;

                let matrix = new Matrix3();
                matrix.translate(cubie.position!.x, cubie.position!.y);
                matrix.rotate(angle);

                cubie.position = new Vector3(Math.round(matrix.elements[6])*cubieSize, Math.round(matrix.elements[7])*cubieSize, cubie.position!.z);
				
				console.log('rotateZ', cubie.position, angle);
				console.log('rotateZ - r', cubie.rotation);
                cubie.rotation = new Quaternion(cubie.rotation!.x, cubie.rotation!.y, cubie.rotation!.z - angle);
				console.log('rotateZ - rnew', cubie.rotation);
            }

            return cubie;
        });

        setCubies(newCubies);
    }

	return (
		<group>
			{cubies.map((cubieProps, i) => {
                return (
					<Cubie
					{...cubieProps}
					key={i}
					// color={i == 0 ? "red" : undefined}
					/>
				);
			})}
		</group>
	);
};
