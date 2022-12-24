import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cube } from "./old_index";
import { CanvasComponent } from "../../atoms/Canvas";

export default {
    title: "Cube/Cube",
    component: Cube,
} as ComponentMeta<typeof Cube>;

const Template: ComponentStory<typeof Cube> = (args) => (
    <CanvasComponent
        backgroundColor="#eee"
    >
        <Cube {...args} />
    </CanvasComponent>
);

export const Default = Template.bind({});
Default.args = {};