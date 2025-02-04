import { fn } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/web-components";

import type { ZencodeProps } from "./Zencode";
import { Zencode } from "./Zencode";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/Zencode",
  tags: ["autodocs"],
  render: (args) => Zencode(args),
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<ZencodeProps>;

export default meta;
type Story = StoryObj<ZencodeProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

// export const Secondary: Story = {
//   args: {
//     label: "Button",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "Button",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "Button",
//   },
// };
