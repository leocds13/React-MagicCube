import { FC, useEffect, useState } from "react";
import { Cubie } from "../../molecules/Cubie";
import { Matrix3, Quaternion, Vector3 } from "three";

export type CubeActions =
  | "F"
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

type Axies = {
  x: number;
  y: number;
  z: number;
};

type CubieTrackProps = {
  trackLoc: Axies;
  rotation: Axies;
};

export const Cube: FC<CubeProps> = ({ cubieSize = 1, action }) => {
  const [cubieTrackProps, setCubieTrackProps] = useState<CubieTrackProps[]>(
    () => {
      var props: CubieTrackProps[] = [];
      for (var z = 1; z >= -1; z--) {
        for (var y = -1; y <= 1; y++) {
          for (var x = -1; x <= 1; x++) {
            props.push({
              trackLoc: {
                x,
                y,
                z,
              },
              rotation: {
                x: 0,
                y: 0,
                z: 0,
              },
            });
          }
        }
      }
      return props;
    }
  );
  const [cubies, setCubies] = useState<JSX.Element[]>([]);

  useEffect(() => {
    var newCubies: JSX.Element[] = [];
    var key = 0;

    for (var z = 1; z >= -1; z--) {
      for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
          newCubies.push(
            <Cubie
              key={key}
              position={
                new Vector3(x * cubieSize, y * cubieSize, z * cubieSize)
              }
              rotation={
                new Quaternion(
                  cubieTrackProps[key].rotation.x,
                  cubieTrackProps[key].rotation.y,
                  cubieTrackProps[key].rotation.z
                )
              }
              size={cubieSize}
            />
          );
          key++;
        }
      }
    }

    setCubies(newCubies);
  }, [cubieSize, cubieTrackProps]);

  useEffect(() => {
    if (action) {
      const rotations: Record<
        Exclude<CubeActions, null>,
        () => CubieTrackProps[]
      > = {
        F: () => {
          return rotateZ(1, 1);
        },
        f: () => {
          return rotateZ(1, -1);
        },
        B: () => {
          return rotateZ(-1, 1);
        },
        b: () => {
          return rotateZ(-1, -1);
        },
        L: () => {
          return rotateX(-1, -1);
        },
        l: () => {
          return rotateX(-1, 1);
        },
        R: () => {
          return rotateX(1, 1);
        },
        r: () => {
          return rotateX(1, -1);
        },
        U: () => {
          return rotateY(1, -1);
        },
        u: () => {
          return rotateY(1, 1);
        },
        D: () => {
          return rotateY(-1, 1);
        },
        d: () => {
          return rotateY(-1, -1);
        },
      };

      if (rotations[action]) {
        let newCubiesProps = rotations[action]();
        setCubieTrackProps(newCubiesProps);
        // setFutureActions([...futureActions, action]);
        // console.log(action, futureActions);
      } else {
        console.warn(`Unknown action: ${action}`);
      }
    }
  }, [action]);

  function rotateX(face: 1 | -1, direction: 1 | -1) {
    let newCubies = cubieTrackProps.map((props) => {
      if (props.trackLoc.x == face) {
        let angle = (Math.PI / 2) * direction;

        let matrix = new Matrix3();
        matrix.translate(props.trackLoc.y, props.trackLoc.z);
        matrix.rotate(angle);

        props.trackLoc.y = Math.round(matrix.elements[6]);
        props.trackLoc.z = Math.round(matrix.elements[7]);
        props.rotation.x += angle;
      }
      return props;
    });

    return newCubies;
  }

  function rotateY(face: 1 | -1, direction: 1 | -1) {
    console.log('Y')
    let newCubies = cubieTrackProps.map((props, i) => {
      if (props.trackLoc.y == face) {
        let angle = (Math.PI / 2) * direction;

        let matrix = new Matrix3();
        matrix.translate(props.trackLoc.x, props.trackLoc.z);
        matrix.rotate(angle);

        console.log(i, props.trackLoc)
        props.trackLoc.x = Math.round(matrix.elements[6]);
        props.trackLoc.z = Math.round(matrix.elements[7]);
        console.log(i, props.trackLoc)
        props.rotation.y -= angle;
      }
      return props;
    });

    return newCubies;
  }

  function rotateZ(face: 1 | -1, direction: 1 | -1) {
    console.log('Z')
    let newCubies = cubieTrackProps.map((props, i) => {
      if (props.trackLoc.z == face) {
        let angle = (Math.PI / 2) * direction;

        let matrix = new Matrix3();
        matrix.translate(props.trackLoc.x, props.trackLoc.y);
        matrix.rotate(angle);

        console.log(i, props.trackLoc)
        props.trackLoc.x = Math.round(matrix.elements[6]);
        props.trackLoc.y = Math.round(matrix.elements[7]);
        console.log(i, props.trackLoc)
        props.rotation.z -= angle;
      }
      return props;
    });

    return newCubies;
  }

  return (
    <mesh>
      {cubies.map((Cubie) => {
        return Cubie;
      })}
    </mesh>
  );
};
