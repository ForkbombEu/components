import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import type { ZencodeProps } from "./Zencode";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/Zencode",
  tags: ["autodocs"],
  component: "zencode-element",
  argTypes: {
    data: { control: "text" },
    keys: {
      control: { type: "text" },
    },
  },
} satisfies Meta<ZencodeProps>;

export default meta;
type Story = StoryObj<ZencodeProps>;

// Basic story with no props
export const Empty: Story = {
  render: () => html`<zencode-element></zencode-element>`,
};

// Story with data prop
export const WithData: Story = {
  render: (args) => html`<zencode-element data=${args.data}></zencode-element>`,
  args: {
    data: "Hello, Zencode!",
  },
};

// Story with both props
export const WithDataAndKeys: Story = {
  render: (args) =>
    html`<zencode-element
      data=${args.data}
      keys=${args.keys}
    ></zencode-element>`,
  args: {
    data: "Test data",
    keys: "Test keys",
  },
};

// Add a story with children
export const WithChildren: Story = {
  render: (args) => html`
    <zencode-element data=${args.data}>
      <p>This is slotted content</p>
    </zencode-element>
  `,
  args: {
    data: "Hello, Zencode!",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary: Story = {
//   args: {
//     label: "Button",
//   },
// };

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
