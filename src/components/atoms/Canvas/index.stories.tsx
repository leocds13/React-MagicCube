import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CanvasComponent } from '.';

export default {
    title: 'Three/Canvas',
    component: CanvasComponent,
    argTypes:{
        backgroundColor: {
            control: {
                type: 'color',
            },
        },
    },
} as ComponentMeta<typeof CanvasComponent>;

const Template: ComponentStory<typeof CanvasComponent> = (args) => <CanvasComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    children: null,
    ambientLightIntensity: 0.5,
};