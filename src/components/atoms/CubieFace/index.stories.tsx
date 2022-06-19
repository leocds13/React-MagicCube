import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CubieFace } from ".";
import { CanvasComponent } from "../Canvas";

export default {
    title: "Cube/CubieFace",
    component: CubieFace,
    argTypes: {
        size: {
            control: {
                type: "range",
                min: 0.0,
                max: 9.5,
                step: 0.1,
            },
        },
        color: {
            control: {
                type: "color",
            },
        },
        position: {
            control: {
                type: "object",
            },
        },
        rotation: {
            control: {
                type: "object",
            },
        },
    },
} as ComponentMeta<typeof CubieFace>;

const Template: ComponentStory<typeof CubieFace> = (args) => (
    <CanvasComponent
        backgroundColor="#fff"
        ambientLightIntensity={1}
    >
        <CubieFace {...args} />
    </CanvasComponent>
);

export const Default = Template.bind({});
Default.args = {
    size: 0.5,
    color: "#000",
    position: {
        x: 0,
        y: 0,
        z: 0,
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0,
    },
};