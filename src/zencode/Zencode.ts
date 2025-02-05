import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { zencode_exec } from "zenroom";

export interface ZencodeProps {
  data?: string;
  keys?: string;
}

@customElement("zencode-element")
export class Zencode extends LitElement implements ZencodeProps {
  @property({ type: String })
  data?: string;

  @property({ type: String })
  keys?: string;

  @state()
  private contract: string | undefined;

  @state()
  private result: ZenroomResult | undefined;

  //

  getContract(slot: HTMLSlotElement) {
    const childNodes = slot.assignedNodes({ flatten: true });

    const allText = childNodes
      .map((node) => {
        return node.textContent ? node.textContent : "";
      })
      .join("");

    const contract = allText
      .split("\n")
      .map((s) => s.trim())
      .join("\n");

    this.contract = contract;
  }

  runContract() {
    if (!this.contract) return;

    const params: { data?: string; keys?: string } = {};
    if (this.data) params.data = this.data;
    if (this.keys) params.keys = this.keys;

    zencode_exec(this.contract, params).then((r) => {
      this.result = r;
    });
    // .then((r) => {
    //   if (storage === "local") LS(id, r.result);
    //   if (storage === "session") SS(id, r.result);
    // })
    // .catch((e) => {
    //   console.error("Error of " + id, e.logs);
    // });
  }

  handleSlotchange(e: Event) {
    if (!e.target) return;

    const slot = e.target as HTMLSlotElement;
    this.getContract(slot);
    this.runContract();
  }

  inputTemplate() {
    return html`
      <div style="display:none">
        <slot @slotchange=${this.handleSlotchange}>
          Please provide a zencode contract
        </slot>
      </div>
    `;
  }

  contractTemplate() {
    if (this.contract)
      return html`
        <div class="container" style="border: 2px solid blue;">
          <div class="content">${this.contract}</div>
        </div>
      `;
  }

  resultTemplate() {
    if (this.result)
      return html`
        <div class="container" style="border: 2px solid blue;">
          <div class="content">${JSON.stringify(this.result)}</div>
        </div>
      `;
  }

  render() {
    return html`
      <div class="container">
        ${this.inputTemplate()} ${this.contractTemplate()}
        ${this.resultTemplate()}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .container {
      display: block;
      min-width: 200px;
      min-height: 50px;
      background-color: green !important;
      padding: 1rem;
      box-sizing: border-box;
    }

    .content {
      color: white !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    ::slotted(*) {
      color: white !important;
      margin: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "zencode-element": Zencode;
  }
}

//

type ZenroomResult = Awaited<ReturnType<typeof zencode_exec>>;
