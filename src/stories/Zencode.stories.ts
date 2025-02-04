import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { ZencodeProps } from "./Zencode";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/Zencode",
  tags: ["autodocs"],
  render: (args) => html`
    <zencode-element .data=${args.data} .keys=${args.keys}>
      ${args.children}
    </zencode-element>
  `,
  argTypes: {
    data: { control: "text" },
    keys: {
      control: { type: "text" },
    },
  },
} satisfies Meta<ZencodeProps>;

export default meta;
type Story = StoryObj<ZencodeProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    data: "ciao",
    keys: "ciao",
    children: html`
      <div slot="header">Header Content</div>
      <div>Default Slot Content</div>
      <div slot="footer">Footer Content</div>
    `,
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
