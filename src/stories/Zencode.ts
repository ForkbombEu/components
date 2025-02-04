import { html } from "lit";
import { ref, createRef } from "lit/directives/ref.js";

import "./zencode.css";

export interface ZencodeProps {
  data?: string;
  keys?: string;
  children?: unknown;
}
/** Primary UI component for user interaction */
export const Zencode = ({ data = "", keys = "" }: ZencodeProps) => {
  const slotRef = createRef();

  const handleSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes();
    console.log("Slotted nodes:", nodes);
  };

  return html`
    <div class=${["storybook-button"].join(" ")}>
      <slot ${ref(slotRef)} @slotchange=${handleSlotChange}></slot>
      ${data} ${keys}
    </div>
  `;
};
