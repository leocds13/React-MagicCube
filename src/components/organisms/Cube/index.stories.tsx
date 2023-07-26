import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cube, CubeActionsKeys } from ".";
import { CanvasComponent } from "../../atoms/Canvas";
import { useState } from "react";
import { useEffect } from "@storybook/addons";

export default {
  title: "Cube/Cube",
  component: Cube,
} as ComponentMeta<typeof Cube>;

const Template: ComponentStory<typeof Cube> = (args) => {
	const [action, setAction] = useState<CubeActionsKeys | null>(null);

  useEffect(() => {
    setAction(args.action);
  }, [args]);

  return (
    <CanvasComponent backgroundColor="#eee">
      <Cube {...{...args, action: action, setAction: setAction}} />
    </CanvasComponent>
  );
};

export const Default = Template.bind({});
Default.args = {};
