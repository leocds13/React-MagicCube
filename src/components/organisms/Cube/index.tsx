import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Cubie } from "../../molecules/Cubie";
import { Quaternion, Vector3 } from "three";
import { rotations } from "./rulesForRotations";


export enum CubeActions {
	"W" = "W",
	"w" = "w",
	"Y" = "Y",
	"y" = "y",
	"R" = "R",
	"r" = "r",
	"O" = "O",
	"o" = "o",
	"G" = "G",
	"g" = "g",
	"B" = "B",
	"b" = "b",
	length = 12
};

export type CubeActionsKeys = keyof Omit<typeof CubeActions, 'length'>;

export type CubieTrackProps = {
  position: Vector3;
  rotation: Quaternion;
};

interface CubeProps {
  cubieSize?: number;
  action: CubeActionsKeys | null;
  setAction: Dispatch<SetStateAction<CubeActionsKeys | null>>
}

export const Cube: FC<CubeProps> = ({ cubieSize = 1, action, setAction }) => {
  const [cubieTrackProps, setCubieTrackProps] = useState<CubieTrackProps[][][]>(
    () => {
      let xList: CubieTrackProps[][][] = [];
      for (let x = -1; x <= 1; x++) {
        let yList: CubieTrackProps[][] = [];
        for (let y = -1; y <= 1; y++) {
          let zList: CubieTrackProps[] = [];
          for (let z = -1; z <= 1; z++) {
            zList.push({
              position: new Vector3(
                x,
                y,
                z
              ),
              rotation: new Quaternion(0, 0, 0),
            });
          }
          yList.push(zList);
        }
        xList.push(yList);
      }
      return xList;
    }
  );

  useEffect(() => {
    if (action) {
      if (rotations[action]) {
        let newProps = rotations[action](cubieTrackProps);
        setCubieTrackProps(newProps);
        setAction(null);
      } else {
        console.warn(`Unknown action: ${action}`);
      }
    }
  }, [action, setAction]);

  return (
    <mesh>
      {cubieTrackProps.map((xProps, xi) => 
        xProps.map((yProps, yi) => 
          yProps.map((zProps, zi) => {
            return (
              <Cubie
                key={zi + yi * 3 + xi * 9}
                position={zProps.position}
                rotation={zProps.rotation}
                size={cubieSize}
                // color={xi == 0 && yi == 2 && zi == 2 ? "purple" : undefined}
              />
            );
          })
        )
      )}
    </mesh>
  );
};
