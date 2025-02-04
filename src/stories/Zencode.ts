import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";

import "./zencode.css";

export interface ZencodeProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}
/** Primary UI component for user interaction */
export const Zencode = ({
  primary,
  backgroundColor,
  size,
  label,
  onClick,
}: ZencodeProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";

  return html`
    <button
      type="button"
      class=${[
        "storybook-button",
        `storybook-button--${size || "medium"}`,
        mode,
      ].join(" ")}
      style=${styleMap({ backgroundColor })}
      @click=${onClick}
    >
      ${label}
    </button>
  `;
};
