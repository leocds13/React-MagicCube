import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Cubie } from ".";
import { CanvasComponent } from "../../atoms/Canvas";

export default {
    title: "Cube/Cubie",
    component: Cubie,
} as ComponentMeta<typeof Cubie>;

const Template: ComponentStory<typeof Cubie> = (args) => (
    <CanvasComponent
        backgroundColor="#eee"
    >
        <Cubie {...args} />
    </CanvasComponent>
);

export const Default = Template.bind({});
Default.args = {};