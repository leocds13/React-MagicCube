import { FC } from "react";
import * as Icons from "phosphor-react";
import { CubeActionsKeys } from "../organisms/Cube";

type RotateButtonProps = {
	icon: "ArrowCounterClockwise" | "ArrowClockwise", // keyof Omit<typeof Icons, "IconContext">; -> For keys of all Icons
	HandleClickRotation(newAction: CubeActionsKeys): void;
	action: CubeActionsKeys;
	className?: string;
};

export const RotateButton: FC<RotateButtonProps> = ({
	icon,
	HandleClickRotation,
	action,
	className,
}) => {
	const Icon = Icons[icon];

	return (
		<button
			className={`${className} w-fill p-1 rounded-full m-2 border relative`}
			onClick={() => {
				HandleClickRotation(action);
			}}
		>
			<span className="absolute w-6 h-6 left-0 right-0 top-0 bottom-0 m-auto">
				{action}
			</span>
			<Icon size={40} color="#000000" weight="fill" />
		</button>
	);
};
