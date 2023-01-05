import { Matrix3, Quaternion, Vector3 } from "three";
import { CubeActions, CubieTrackProps } from ".";

export const rotations: Record<
  Exclude<CubeActions, null>,
  (cubieProps: CubieTrackProps[][][]) => CubieTrackProps[][][]
> = {
  W: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "z", 1, rotateZ, positionZ, 1);
  },
  w: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "z", 1, rotateZ, positionZ, -1);
  },
  Y: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "z", -1, rotateZ, positionZ, -1);
  },
  y: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "z", -1, rotateZ, positionZ, 1);
  },
  R: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "x", -1, rotateX, positionX, -1);
  },
  r: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "x", -1, rotateX, positionX, 1);
  },
  O: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "x", 1, rotateX, positionX, 1);
  },
  o: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "x", 1, rotateX, positionX, -1);
  },
  G: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "y", 1, rotateY, positionY, 1);
  },
  g: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "y", 1, rotateY, positionY, -1);
  },
  B: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "y", -1, rotateY, positionY, -1);
  },
  b: (cubieProps: CubieTrackProps[][][]) => {
    return RotateOnAxies(cubieProps, "y", -1, rotateY, positionY, 1);
  },
};

function RotateOnAxies(
  cubieProps: CubieTrackProps[][][],
  axie: "x" | "y" | "z",
  face: 1 | -1,
  rotateAxieFunc: (rot: Quaternion, direction: 1 | -1) => Quaternion,
  positionAxieFunc: (pos: Vector3, direction: 1 | -1) => Vector3,
  direction: 1 | -1
): CubieTrackProps[][][] {
  let newCubieProps = cubieProps.map((x) =>
    x.map((y) =>
      y.map((z) => {
        if (z.position[axie] === face) {
          z.position = positionAxieFunc(z.position, direction);
          z.rotation = rotateAxieFunc(z.rotation, direction);
        }
        return z;
      })
    )
  );
  return newCubieProps;
}

function rotateX(rot: Quaternion, direction: 1 | -1): Quaternion {
  let xRot = new Quaternion();
  xRot.setFromAxisAngle(new Vector3(1, 0, 0), (Math.PI / 2) * -direction);
  return xRot.multiply(rot);
}

function rotateY(rot: Quaternion, direction: 1 | -1): Quaternion {
  let yRot = new Quaternion();
  yRot.setFromAxisAngle(new Vector3(0, 1, 0), (Math.PI / 2) * -direction);
  return yRot.multiply(rot);
}

function rotateZ(rot: Quaternion, direction: 1 | -1): Quaternion {
  let zRot = new Quaternion();
  zRot.setFromAxisAngle(new Vector3(0, 0, 1), (Math.PI / 2) * -direction);
  return zRot.multiply(rot);
}

function positionX(pos: Vector3, direction: 1 | -1): Vector3 {
  let matrix = new Matrix3();
  matrix.translate(pos.y, pos.z);
  matrix.rotate((Math.PI / 2) * direction);

  let newPos = new Vector3(
    pos.x,
    Math.round(matrix.elements[6]),
    Math.round(matrix.elements[7])
  );

  return newPos;
}

function positionY(pos: Vector3, direction: 1 | -1): Vector3 {
  let matrix = new Matrix3();
  matrix.translate(pos.x, pos.z);
  matrix.rotate((Math.PI / 2) * -direction);

  let newPos = new Vector3(
    Math.round(matrix.elements[6]),
    pos.y,
    Math.round(matrix.elements[7])
  );

  return newPos;
}

function positionZ(pos: Vector3, direction: 1 | -1): Vector3 {
  let matrix = new Matrix3();
  matrix.translate(pos.x, pos.y);
  matrix.rotate((Math.PI / 2) * direction);

  let newPos = new Vector3(
    Math.round(matrix.elements[6]),
    Math.round(matrix.elements[7]),
    pos.z,
  );

  return newPos;
}
